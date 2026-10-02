import {
  createRegistration,
  validateStoredRegistration,
} from "./registrationService";
import type {
  RegistrationDraft,
  WasteRegistration,
} from "../types/registration";
import type { PhotoStorage, RegistrationStorage } from "../storage/contracts";

export function filterRegistrations(
  entries: WasteRegistration[],
  materialId?: string,
) {
  return entries
    .filter((entry) => !materialId || entry.materialId === materialId)
    .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}
export function createRegistrationRepository(
  storage: RegistrationStorage,
  photos: PhotoStorage,
  newId: () => string,
) {
  let busy = false;
  async function exclusive<T>(action: () => Promise<T>) {
    if (busy) throw new Error("Aguarde a operação em andamento.");
    busy = true;
    try {
      return await action();
    } finally {
      busy = false;
    }
  }
  async function cleanup(uri?: string) {
    if (!uri) return;
    try {
      if (!(await storage.list()).some((entry) => entry.photo === uri))
        await photos.remove(uri);
    } catch {
      /* Keep an orphan rather than risk removing a linked photo. */
    }
  }
  async function save(draft: RegistrationDraft, previous?: WasteRegistration) {
    const entry = createRegistration(
      draft,
      previous?.id ?? newId(),
      previous?.date,
    );
    let copied: string | undefined;
    try {
      if (entry.photo && entry.photo !== previous?.photo) {
        try {
          copied = await photos.persist(entry.photo);
        } catch {
          throw new Error(
            "Não foi possível guardar a foto. Escolha a imagem novamente e tente salvar.",
          );
        }
        entry.photo = copied;
      }
      try {
        if (previous) await storage.update(entry);
        else await storage.insert(entry);
      } catch {
        throw new Error(
          "Não foi possível salvar o registro. Seus campos foram mantidos. Tente novamente.",
        );
      }
    } catch (error) {
      if (copied && copied !== draft.photo) await cleanup(copied);
      throw error;
    }
    if (previous?.photo !== entry.photo) await cleanup(previous?.photo);
    return entry;
  }
  return {
    load: () =>
      exclusive(async () =>
        filterRegistrations(
          (await storage.list()).map(validateStoredRegistration),
        ),
      ),
    register: (draft: RegistrationDraft) => exclusive(() => save(draft)),
    edit: (previous: WasteRegistration, draft: RegistrationDraft) =>
      exclusive(() => save(draft, previous)),
    remove: (entry: WasteRegistration) =>
      exclusive(async () => {
        try {
          await storage.remove(entry.id);
        } catch {
          throw new Error(
            "Não foi possível excluir o registro. Tente novamente.",
          );
        }
        await cleanup(entry.photo);
      }),
  };
}
