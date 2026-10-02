import { beforeEach, expect, it } from "vitest";
import { render, screen, within, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { App } from "../src/app/App";
import { CatalogProvider } from "../src/app/CatalogProvider";
import { LocalRepository } from "../src/repositories/LocalRepository";
import { CatalogService } from "../src/services/CatalogService";
const mount = (path = "/admin") => {
  const service = new CatalogService(new LocalRepository(localStorage));
  render(
    <MemoryRouter initialEntries={[path]}>
      <CatalogProvider service={service}>
        <App />
      </CatalogProvider>
    </MemoryRouter>,
  );
  return userEvent.setup();
};
beforeEach(() => localStorage.clear());
it("renderiza dashboard com totais reais e limites do protótipo", async () => {
  mount();
  expect(
    await screen.findByRole("heading", { name: "Dashboard" }),
  ).toBeInTheDocument();
  const metrics = screen.getByRole("region", { name: "Resumo dos cadastros" });
  expect(within(metrics).getAllByText("08")).toHaveLength(2);
  expect(
    screen.getByText(
      "A autenticação administrativa ainda não foi implementada.",
    ),
  ).toBeInTheDocument();
});
it("cria, pesquisa, visualiza, edita e confirma exclusão", async () => {
  const user = mount("/admin/residuos/tipos");
  await user.click(await screen.findByRole("link", { name: "Adicionar tipo" }));
  await user.type(screen.getByLabelText(/^Nome/), "Tipo temporário");
  await user.type(
    screen.getByLabelText(/^Descrição/),
    "Conteúdo para testar o cadastro.",
  );
  await user.click(screen.getByRole("button", { name: "Salvar registro" }));
  expect(
    await screen.findByText("Alterações salvas neste navegador."),
  ).toBeInTheDocument();
  await user.type(await screen.findByRole("searchbox"), "temporario");
  expect(
    screen.queryByRole("link", { name: "Plástico" }),
  ).not.toBeInTheDocument();
  await user.click(
    screen.getByRole("link", { name: "Visualizar Tipo temporário" }),
  );
  expect(
    await screen.findByRole("heading", { name: "Tipo temporário" }),
  ).toBeInTheDocument();
  await user.click(screen.getByRole("link", { name: "Editar cadastro" }));
  const field = screen.getByLabelText(/^Nome/);
  await user.clear(field);
  await user.type(field, "Tipo revisado");
  await user.click(screen.getByRole("button", { name: "Salvar registro" }));
  await user.click(
    await screen.findByRole("button", { name: "Excluir Tipo revisado" }),
  );
  const dialog = screen.getByRole("dialog");
  expect(dialog).toBeInTheDocument();
  await user.click(within(dialog).getByRole("button", { name: "Cancelar" }));
  expect(
    screen.getByRole("link", { name: "Tipo revisado" }),
  ).toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Excluir Tipo revisado" }),
  );
  await user.click(
    within(screen.getByRole("dialog")).getByRole("button", { name: "Excluir" }),
  );
  await waitFor(() =>
    expect(
      screen.queryByRole("link", { name: "Tipo revisado" }),
    ).not.toBeInTheDocument(),
  );
});
it("mostra erros associados e preserva campos após validação", async () => {
  const user = mount("/admin/pontos-coleta/novo");
  await screen.findByRole("heading", { name: "Novo ponto" });
  await user.type(screen.getByLabelText(/^Latitude/), "91");
  await user.click(screen.getByRole("button", { name: "Salvar registro" }));
  expect(
    await screen.findByText("Latitude deve estar entre -90 e 90."),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/^Latitude/)).toHaveValue("91");
  expect(screen.getByLabelText(/^Nome/)).toHaveAttribute(
    "aria-invalid",
    "true",
  );
});
it("filtra subtipos por tipo e status", async () => {
  const user = mount("/admin/residuos/subtipos");
  await screen.findByRole("link", { name: "Garrafa PET" });
  await user.selectOptions(screen.getByLabelText("Tipo"), "plastico");
  expect(
    screen.queryByRole("link", { name: "Papelão" }),
  ).not.toBeInTheDocument();
  await user.click(
    screen.getByRole("button", { name: "Desativar Garrafa PET" }),
  );
  await user.selectOptions(screen.getByLabelText("Status"), "inactive");
  expect(screen.getByRole("link", { name: "Garrafa PET" })).toBeInTheDocument();
  expect(
    screen.queryByRole("link", { name: "Plástico rígido" }),
  ).not.toBeInTheDocument();
});
it("exibe motivo ao impedir exclusão de tipo vinculado", async () => {
  const user = mount("/admin/residuos/tipos");
  await user.click(
    await screen.findByRole("button", { name: "Excluir Plástico" }),
  );
  await user.click(
    within(screen.getByRole("dialog")).getByRole("button", { name: "Excluir" }),
  );
  expect(
    await screen.findByText(/Remova ou altere esses vínculos/),
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Plástico" })).toBeInTheDocument();
});
it("edita individualmente materiais e passos de reutilização", async () => {
  const user = mount("/admin/reutilizacao/nova");
  await screen.findByRole("heading", { name: "Nova ideia" });
  await user.type(screen.getByLabelText(/^Título/), "Ideia de teste");
  await user.selectOptions(screen.getByLabelText(/^Subtipo associado/), "pet");
  await user.type(screen.getByLabelText(/^Descrição/), "Uma ideia segura.");
  await user.type(
    screen.getByLabelText("Materiais necessários 1"),
    "Garrafa limpa",
  );
  await user.type(
    screen.getByLabelText("Passo a passo 1"),
    "Separar a garrafa",
  );
  await user.click(screen.getByRole("button", { name: "Adicionar passo" }));
  await user.type(
    screen.getByLabelText("Passo a passo 2"),
    "Guardar em local seguro",
  );
  await user.click(screen.getByRole("button", { name: "Salvar registro" }));
  await user.click(
    await screen.findByRole("link", { name: "Visualizar Ideia de teste" }),
  );
  expect(
    await screen.findByText("Guardar em local seguro"),
  ).toBeInTheDocument();
});
it("restaura exemplos com confirmação e atualiza dashboard", async () => {
  await new CatalogService(new LocalRepository(localStorage)).delete(
    "education",
    "rio",
  );
  const user = mount("/admin/configuracoes");
  await user.click(
    await screen.findByRole("button", { name: "Restaurar exemplos" }),
  );
  await user.click(
    within(screen.getByRole("dialog")).getByRole("button", {
      name: "Restaurar dados",
    }),
  );
  expect(
    await screen.findByText(
      "Dados demonstrativos restaurados neste navegador.",
    ),
  ).toBeInTheDocument();
  expect(
    (await new LocalRepository(localStorage).getAll()).filter(
      (r) => r.kind === "education",
    ),
  ).toHaveLength(5);
});
