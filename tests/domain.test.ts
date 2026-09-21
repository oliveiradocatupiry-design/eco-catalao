/// <reference types="node" />
import assert from "node:assert/strict";
import { test } from "node:test";
import { materials, getMaterial } from "../src/data/materials";
import { initialEntries, mockCatsRates } from "../src/data/cats";
import {
  balances,
  estimateCats,
  parseQuantity,
} from "../src/services/marketService";
import { classificationService } from "../src/services/mockClassificationService";

test("quantidade aceita vírgula e ponto para kg e rejeita entradas inválidas", () => {
  assert.equal(parseQuantity("4,5", "kg").value, 4.5);
  assert.equal(parseQuantity("4.5", "kg").value, 4.5);
  for (const value of [
    "",
    "-1",
    "0",
    "NaN",
    "Infinity",
    "4abc",
    "1,2.3",
    "1e3",
    "10001",
    "1.234",
  ])
    assert.ok(parseQuantity(value, "kg").error, value);
  assert.ok(parseQuantity("2,5", "unidade").error);
  assert.equal(parseQuantity("50", "unidade").value, 50);
});
test("unidades e taxas são definidas para cada material", () => {
  assert.equal(new Set(materials.map((m) => m.id)).size, materials.length);
  for (const material of materials) {
    assert.ok(mockCatsRates[material.id] > 0);
    assert.ok(material.instrucoesDescarte);
  }
  assert.equal(getMaterial("aluminio")?.unidadeDeMedida, "unidade");
  assert.equal(getMaterial("papelao")?.unidadeDeMedida, "kg");
});
test("registro pendente altera estimados sem alterar confirmados", () => {
  const material = getMaterial("aluminio")!;
  const cats = estimateCats(material, 50);
  assert.equal(cats, 20);
  assert.deepEqual(
    balances([
      ...initialEntries,
      {
        id: "test",
        materialId: material.id,
        quantity: 50,
        cats,
        status: "pending",
        date: "",
      },
    ]),
    { pending: 28, confirmed: 20 },
  );
  assert.deepEqual(balances(initialEntries), { pending: 8, confirmed: 20 });
  assert.deepEqual(balances([]), { pending: 0, confirmed: 0 });
});
test("classificação previsível e correção muda material e unidade sem mutar original", async () => {
  const original = await classificationService.classify("aluminio");
  assert.equal(original.materialId, "aluminio");
  assert.equal(original.confidence, 0.94);
  const corrected = classificationService.correct(original, "papelao");
  assert.equal(corrected.materialId, "papelao");
  assert.equal(corrected.corrected, true);
  assert.equal(getMaterial(corrected.materialId)?.unidadeDeMedida, "kg");
  assert.equal(original.materialId, "aluminio");
  assert.equal(original.corrected, false);
});
