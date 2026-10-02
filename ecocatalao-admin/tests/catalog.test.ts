import { beforeEach, describe, expect, it } from "vitest";
import {
  LocalRepository,
  STORAGE_KEY,
  type StoragePort,
} from "../src/repositories/LocalRepository";
import { CatalogService, toDraft } from "../src/services/CatalogService";
import { createMocks } from "../src/data/mocks";
import { ValidationError, type Draft, type Kind } from "../src/types/catalog";
let service: CatalogService;
const typeDraft: Draft = {
  name: "Orgânicos de teste",
  description: "Exemplo temporário para demonstração.",
  color: "#DFF3E9",
  icon: "recycle",
  status: "active",
};
beforeEach(() => {
  localStorage.clear();
  service = new CatalogService(new LocalRepository(localStorage));
});
describe("Persistência e operações do catálogo", () => {
  it("inicializa a cópia completa do mobile e salva no navegador", async () => {
    expect(await service.getAll()).toEqual(createMocks().records);
    expect(localStorage.getItem(STORAGE_KEY)).not.toBeNull();
  });
  it("cria, recupera em outra instância, edita, desativa e exclui", async () => {
    const item = await service.save("types", typeDraft);
    const reopened = new CatalogService(new LocalRepository(localStorage));
    expect((await reopened.getById("types", item.id))?.name).toBe(
      typeDraft.name,
    );
    await reopened.save(
      "types",
      { ...typeDraft, name: "Nome revisado" },
      item.id,
    );
    await reopened.setActive("types", item.id, "inactive");
    expect(await reopened.getById("types", item.id)).toMatchObject({
      name: "Nome revisado",
      status: "inactive",
    });
    await reopened.delete("types", item.id);
    expect(await reopened.getById("types", item.id)).toBeUndefined();
  });
  it("restaura somente a chave do admin", async () => {
    localStorage.setItem("outro-app", "preservado");
    await service.save("types", typeDraft);
    await service.reset();
    expect(await service.getAll()).toEqual(createMocks().records);
    expect(localStorage.getItem("outro-app")).toBe("preservado");
  });
  it("preserva dados corrompidos e permite restauração explícita", async () => {
    localStorage.setItem(STORAGE_KEY, "inválido");
    await expect(service.getAll()).rejects.toThrow("preservados");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("inválido");
    await service.reset();
    expect((await service.getAll()).length).toBe(28);
  });
  it("recusa dados locais com relações inválidas", async () => {
    const data = createMocks();
    data.records = data.records.filter((r) => r.kind !== "types");
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    await expect(service.getAll()).rejects.toThrow("inválidos");
  });
  it("não relata sucesso se o navegador não consegue salvar", async () => {
    const port: StoragePort = {
      getItem: () => null,
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    };
    await expect(
      new CatalogService(new LocalRepository(port)).save("types", typeDraft),
    ).rejects.toThrow("Não foi possível salvar");
  });
  it("uma falha de escrita preserva os dados anteriores", async () => {
    await service.getAll();
    const initial = localStorage.getItem(STORAGE_KEY);
    const repository = new LocalRepository({
      getItem: (k) => localStorage.getItem(k),
      setItem: () => {
        throw new Error("quota");
      },
    });
    await expect(
      new CatalogService(repository).save("types", typeDraft),
    ).rejects.toThrow();
    expect(localStorage.getItem(STORAGE_KEY)).toBe(initial);
  });
  it.each<Kind>(["types", "subtypes", "ideas", "education", "points"])(
    "edita e alterna status de %s",
    async (kind) => {
      const item = (await service.getAll()).find((r) => r.kind === kind)!;
      await service.save(kind, { ...toDraft(item), name: "Revisado" }, item.id);
      await service.setActive(kind, item.id, "inactive");
      expect(await service.getById(kind, item.id)).toMatchObject({
        name: "Revisado",
        status: "inactive",
      });
    },
  );
});
describe("Relacionamentos e exclusões", () => {
  it("bloqueia exclusão de tipo com subtipos", async () => {
    await expect(service.delete("types", "plastico")).rejects.toThrow(
      "vínculo",
    );
    expect(await service.getById("types", "plastico")).toBeDefined();
  });
  it("bloqueia exclusão de subtipo ligado a ideia ou ponto", async () => {
    await expect(service.delete("subtypes", "pet")).rejects.toThrow("vínculo");
  });
  it("permite exclusão depois de remover todos os vínculos", async () => {
    const records = await service.getAll();
    for (const r of records) {
      if (r.kind === "ideas" && r.subtypeId === "pet")
        await service.delete(r.kind, r.id);
      if (r.kind === "points" && r.materialIds.includes("pet"))
        await service.save(
          r.kind,
          {
            ...toDraft(r),
            materialIds: r.materialIds.filter((id) => id !== "pet"),
          },
          r.id,
        );
    }
    await service.delete("subtypes", "pet");
    expect(await service.getById("subtypes", "pet")).toBeUndefined();
  });
  it("subtipo exige tipo existente", async () => {
    const item = (await service.getAll()).find((r) => r.kind === "subtypes")!;
    await expect(
      service.save("subtypes", { ...toDraft(item), typeId: "inexistente" }),
    ).rejects.toThrow("tipo de resíduo existente");
  });
  it("ideia exige subtipo existente", async () => {
    const item = (await service.getAll()).find((r) => r.kind === "ideas")!;
    await expect(
      service.save("ideas", { ...toDraft(item), subtypeId: "inexistente" }),
    ).rejects.toThrow("subtipo existente");
  });
  it("protege vínculos educativos opcionais", async () => {
    const item = (await service.getAll()).find((r) => r.kind === "education")!;
    await service.save(
      "education",
      { ...toDraft(item), subtypeId: "vidro" },
      item.id,
    );
    await expect(service.delete("subtypes", "vidro")).rejects.toThrow(
      item.name,
    );
  });
  it("não aceita materiais inexistentes em pontos", async () => {
    const item = (await service.getAll()).find((r) => r.kind === "points")!;
    await expect(
      service.save("points", { ...toDraft(item), materialIds: ["nada"] }),
    ).rejects.toThrow("materiais cadastrados");
  });
});
describe("Validações de entrada", () => {
  it.each(["", "   "])("rejeita nome vazio %j", async (name) => {
    await expect(
      service.save("types", { ...typeDraft, name }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
  it("rejeita status arbitrário", async () => {
    await expect(
      service.save("types", { ...typeDraft, status: "publicado" }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
  it.each([
    ["91", "0"],
    ["-91", "0"],
    ["0", "181"],
    ["0", "-181"],
    ["", ""],
    ["texto", "0"],
  ])("recusa coordenadas %s, %s", async (latitude, longitude) => {
    const item = (await service.getAll()).find((r) => r.kind === "points")!;
    await expect(
      service.save("points", { ...toDraft(item), latitude, longitude }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
  it("aceita limites geográficos e vírgula decimal", async () => {
    const item = (await service.getAll()).find((r) => r.kind === "points")!;
    expect(
      await service.save("points", {
        ...toDraft(item),
        latitude: "-3,16144",
        longitude: "-180",
      }),
    ).toMatchObject({ latitude: -3.16144, longitude: -180 });
  });
  it("rejeita lista de passos vazia ou item vazio", async () => {
    const item = (await service.getAll()).find((r) => r.kind === "ideas")!;
    for (const steps of [[], [""]])
      await expect(
        service.save("ideas", { ...toDraft(item), steps }),
      ).rejects.toBeInstanceOf(ValidationError);
  });
});
