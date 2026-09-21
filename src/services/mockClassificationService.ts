import type { Classification, MaterialId } from "../types";
export interface ClassificationService {
  classify: (demoMaterialId: MaterialId) => Promise<Classification>;
  correct: (previous: Classification, materialId: MaterialId) => Classification;
}
// A foto não é recebida nem enviada. O seletor controla o cenário de apresentação.
export const classificationService: ClassificationService = {
  async classify(materialId) {
    await new Promise((resolve) => setTimeout(resolve, 850));
    return { materialId, confidence: 0.94, corrected: false, accepted: false };
  },
  correct(previous, materialId) {
    return { ...previous, materialId, corrected: true, accepted: true };
  },
};
