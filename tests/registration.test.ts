/// <reference types="node" />
import "fake-indexeddb/auto";
import assert from "node:assert/strict";
import { test } from "node:test";
import { randomUUID } from "node:crypto";
import {
  createRegistrationRepository,
  filterRegistrations,
} from "../src/services/registrationRepository";
import { registrationStorage } from "../src/storage/registrationStorage.web";
import { isOwnedPhoto } from "../src/storage/photoOwnership";
import type {
  RegistrationStorage,
  PhotoStorage,
} from "../src/storage/contracts";
import type { WasteRegistration } from "../src/types/registration";

const draft = { materialId: "pet", quantity: "5", weight: "1,5" };
function fixture() {
  const entries = new Map<string, WasteRegistration>();
  const deleted: string[] = [];
  const storage: RegistrationStorage = {
    async list() {
      return [...entries.values()];
    },
    async insert(entry) {
      if (entries.has(entry.id)) throw new Error();
      entries.set(entry.id, entry);
    },
    async update(entry) {
      if (!entries.has(entry.id)) throw new Error();
      entries.set(entry.id, entry);
    },
    async remove(id) {
      entries.delete(id);
    },
  };
  const photos: PhotoStorage = {
    async persist(uri) {
      return `owned:${uri}`;
    },
    async remove(uri) {
      deleted.push(uri);
    },
  };
  return {
    entries,
    deleted,
    storage,
    photos,
    repository: createRegistrationRepository(storage, photos, randomUUID),
  };
}
test("IndexedDB real adapter: save, recover in another repository, edit without duplication, delete, preserve photo", async () => {
  const photos: PhotoStorage = {
    async persist(uri) {
      return uri;
    },
    async remove() {},
  };
  const repository = createRegistrationRepository(
    registrationStorage,
    photos,
    randomUUID,
  );
  const photo = "data:image/png;base64,aGVsbG8=";
  const saved = await repository.register({ ...draft, photo });
  const reopened = createRegistrationRepository(
    registrationStorage,
    photos,
    randomUUID,
  );
  assert.deepEqual(
    (await reopened.load()).find((entry) => entry.id === saved.id),
    saved,
  );
  const edited = await reopened.edit(saved, { ...draft, quantity: "3", photo });
  assert.equal(edited.id, saved.id);
  assert.equal(edited.date, saved.date);
  assert.equal(edited.cats, null);
  assert.equal(edited.status, "Aguardando entrega");
  assert.equal(
    (await repository.load()).filter((entry) => entry.id === saved.id).length,
    1,
  );
  assert.equal(
    (await repository.load()).find((entry) => entry.id === saved.id)?.quantity,
    3,
  );
  await repository.remove(edited);
  assert.ok(!(await reopened.load()).some((entry) => entry.id === saved.id));
  await assert.rejects(() => reopened.edit(edited, draft));
});
test("filter does not mutate history and keeps descending creation date", () => {
  const entries: WasteRegistration[] = [
    {
      id: "a",
      materialId: "pet",
      quantity: 1,
      date: "2026-09-28",
      status: "Aguardando entrega",
      cats: null,
    },
    {
      id: "b",
      materialId: "aluminio",
      quantity: 1,
      date: "2026-09-30",
      status: "Aguardando entrega",
      cats: null,
    },
  ];
  assert.deepEqual(
    filterRegistrations(entries).map((entry) => entry.id),
    ["b", "a"],
  );
  assert.deepEqual(
    filterRegistrations(entries, "pet").map((entry) => entry.id),
    ["a"],
  );
  assert.equal(filterRegistrations(entries, "vidro").length, 0);
  assert.equal(entries[0].id, "a");
});
test("failed write preserves original entry and photo; retry succeeds", async () => {
  const f = fixture();
  const entry = await f.repository.register({ ...draft, photo: "old" });
  const update = f.storage.update;
  f.storage.update = async () => {
    throw new Error("disk full");
  };
  await assert.rejects(
    () => f.repository.edit(entry, { ...draft, quantity: "3", photo: "new" }),
    /Não foi possível salvar/,
  );
  assert.equal(f.entries.get(entry.id)?.quantity, 5);
  assert.equal(f.entries.get(entry.id)?.photo, "owned:old");
  assert.ok(!f.deleted.includes("owned:old"));
  assert.ok(f.deleted.includes("owned:new"));
  f.storage.update = update;
  await f.repository.edit(entry, { ...draft, quantity: "3", photo: "new" });
  assert.ok(f.deleted.includes("owned:old"));
  assert.equal(f.entries.size, 1);
});
test("copy failure rejects save without creating a record", async () => {
  const f = fixture();
  f.photos.persist = async () => {
    throw new Error();
  };
  await assert.rejects(
    () => f.repository.register({ ...draft, photo: "unavailable" }),
    /guardar a foto/,
  );
  assert.equal(f.entries.size, 0);
});
test("read, insert and delete failures reject; never indicate success or empty history", async () => {
  const f = fixture();
  f.storage.insert = async () => {
    throw new Error();
  };
  await assert.rejects(
    () => f.repository.register(draft),
    /Não foi possível salvar/,
  );
  f.storage.list = async () => {
    throw new Error("read");
  };
  await assert.rejects(() => f.repository.load(), /read/);
  f.storage.remove = async () => {
    throw new Error();
  };
  await assert.rejects(
    () => f.repository.remove({ id: "x" } as WasteRegistration),
    /Não foi possível excluir/,
  );
  assert.equal(f.deleted.length, 0);
});
test("shared photo remains until its final reference is removed; removal during edit works", async () => {
  const f = fixture();
  const first = await f.repository.register({ ...draft, photo: "same" });
  const second = await f.repository.register({ ...draft, photo: "same" });
  await f.repository.remove(first);
  assert.equal(f.deleted.length, 0);
  await f.repository.edit(second, draft);
  assert.deepEqual(f.deleted, ["owned:same"]);
});
test("cleanup failure after commit does not reject a successful edit", async () => {
  const f = fixture();
  const entry = await f.repository.register({ ...draft, photo: "old" });
  f.photos.remove = async () => {
    throw new Error();
  };
  const edited = await f.repository.edit(entry, draft);
  assert.equal(edited.photo, undefined);
  assert.equal(f.entries.get(entry.id)?.photo, undefined);
});
test("concurrent clicks are blocked until storage resolves", async () => {
  const f = fixture();
  const insert = f.storage.insert;
  let release!: () => void;
  f.storage.insert = async (entry) => {
    await new Promise<void>((resolve) => {
      release = resolve;
    });
    await insert(entry);
  };
  const pending = f.repository.register(draft);
  await assert.rejects(() => f.repository.register(draft), /Aguarde/);
  release();
  await pending;
  assert.equal(f.entries.size, 1);
});
test("ownership excludes originals, siblings, traversal and encoded paths", () => {
  const folder = "file:///documents/ecocatalao-photos";
  assert.ok(isOwnedPhoto(`${folder}/abc-123.jpg`, folder));
  for (const uri of [
    "file:///gallery/abc.jpg",
    `${folder}-other/abc.jpg`,
    `${folder}/../abc.jpg`,
    `${folder}/%2e%2e/abc.jpg`,
    `${folder}/nested/abc.jpg`,
  ])
    assert.ok(!isOwnedPhoto(uri, folder));
});
test("invalid stored data rejects loading without silently returning an empty history", async () => {
  const f = fixture();
  const entry = await f.repository.register(draft);
  f.entries.set(entry.id, {
    ...entry,
    cats: 10,
  } as unknown as WasteRegistration);
  await assert.rejects(() => f.repository.load(), /armazenado inválido/);
});
