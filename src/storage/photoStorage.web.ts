import type { PhotoStorage } from "./contracts";

export const photoStorage: PhotoStorage = {
  async persist(uri) {
    // Only local picker/camera sources; never download a remote photograph.
    if (!/^(blob:|data:image\/)/.test(uri))
      throw new Error("Foto local indisponível");
    const blob = await (await fetch(uri)).blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error);
      reader.onload = () => resolve(String(reader.result));
      reader.readAsDataURL(blob);
    });
  },
  async remove() {
    /* Photo data belongs to the IndexedDB record itself. */
  },
};
