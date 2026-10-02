import { useState } from "react";
import { Image, Text } from "react-native";
import { styles } from "./ui";
export function RegistrationPhoto({
  uri,
  preview = false,
}: {
  uri: string;
  preview?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Text style={styles.caption}>Foto indisponível</Text>;
  return (
    <Image
      source={{ uri }}
      onError={() => setFailed(true)}
      style={
        preview
          ? { height: 260, width: "100%", borderRadius: 18 }
          : { width: 72, height: 72, borderRadius: 12 }
      }
      resizeMode="contain"
      accessibilityLabel="Foto do resíduo"
    />
  );
}
