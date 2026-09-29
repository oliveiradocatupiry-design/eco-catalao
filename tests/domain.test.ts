/// <reference types="node" />
import assert from "node:assert/strict";
import { test } from "node:test";
import { createRegistration } from "../src/services/registrationService";
import { wasteTypes } from "../src/data/wasteTypes";
import { wasteSubtypes } from "../src/data/wasteSubtypes";
import { reuseIdeas } from "../src/data/reuseIdeas";
import { getMaterial } from "../src/data/materials";
import {
  collectionPoints,
  communityCoordinate,
} from "../src/data/collectionPoints";
const draft = { materialId: "pet", quantity: "", weight: "" };
test("salva peso decimal brasileiro, foto e CATS indefinido", () => {
  const result = createRegistration(
    { ...draft, weight: "1,5", photo: "file://foto.jpg" },
    "registro-1",
    "2026-09-28T12:00:00Z",
  );
  assert.equal(result.weight, 1.5);
  assert.equal(result.photo, "file://foto.jpg");
  assert.equal(result.cats, null);
  assert.equal(result.status, "Aguardando entrega");
  assert.equal(result.date, "2026-09-28T12:00:00Z");
  assert.equal(result.quantity, undefined);
});
test("aceita quantidade, peso ou ambos sem exigir foto", () => {
  assert.equal(
    createRegistration({ ...draft, quantity: "3" }, "1").quantity,
    3,
  );
  assert.equal(
    createRegistration({ ...draft, quantity: "3", weight: "0.5" }, "2").weight,
    0.5,
  );
});
test("rejeita material livre, valores ausentes, negativos, não finitos e quantidade fracionada", () => {
  assert.throws(() => createRegistration(draft, "1"));
  assert.throws(() =>
    createRegistration(
      { ...draft, materialId: "qualquer", quantity: "1" },
      "1",
    ),
  );
  for (const weight of [
    "-1",
    "0",
    "NaN",
    "Infinity",
    "1e3",
    "2kg",
    "1,2.3",
    "100001",
  ])
    assert.throws(() => createRegistration({ ...draft, weight }, "1"), weight);
  assert.throws(() => createRegistration({ ...draft, quantity: "1,5" }, "1"));
});
test("todas as trilhas educativas chegam a um material e a uma ideia completa", () => {
  for (const type of wasteTypes)
    assert.ok(wasteSubtypes.some((s) => s.typeId === type.id));
  for (const sub of wasteSubtypes) {
    assert.ok(getMaterial(sub.id));
    assert.ok(wasteTypes.some((t) => t.id === sub.typeId));
    const idea = reuseIdeas.find((i) => i.id === sub.reuseId);
    assert.ok(idea);
    assert.ok(idea.steps.length >= 3);
    assert.ok(idea.materials.length);
  }
});
test("mapa usa referência amazônica e pontos explicitamente demonstrativos com contato a validar", () => {
  assert.ok(
    communityCoordinate.latitude < -3 && communityCoordinate.longitude < -59,
  );
  for (const point of collectionPoints) {
    assert.match(point.name, /demonstrativo/);
    assert.ok(point.phone);
    assert.ok(point.address);
    assert.ok(Number.isFinite(point.coordinate.latitude));
  }
});
