export function isOwnedPhoto(uri: string, folder: string) {
  const prefix = folder.endsWith("/") ? folder : `${folder}/`;
  const name = uri.startsWith(prefix) ? uri.slice(prefix.length) : "";
  return /^[a-f0-9-]+\.(jpg|png|webp|heic|jpeg)$/i.test(name);
}
