import { Directory, File, Paths } from "expo-file-system";
import { randomUUID } from "expo-crypto";
import type { PhotoStorage } from "./contracts";
import { isOwnedPhoto } from "./photoOwnership";

const directory = () => new Directory(Paths.document, "ecocatalao-photos");
export const photoStorage: PhotoStorage = {
  async persist(uri) {
    const folder = directory();
    if (isOwnedPhoto(uri, folder.uri)) return uri;
    folder.create({ intermediates: true, idempotent: true });
    const extension =
      /\.(jpg|jpeg|png|webp|heic)(?:\?|$)/i.exec(uri)?.[1] ?? "jpg";
    const target = new File(folder, `${randomUUID()}.${extension}`);
    try {
      new File(uri).copy(target);
      return target.uri;
    } catch (error) {
      if (target.exists) target.delete();
      throw error;
    }
  },
  async remove(uri) {
    if (!isOwnedPhoto(uri, directory().uri)) return;
    const file = new File(uri);
    if (file.exists) file.delete();
  },
};
