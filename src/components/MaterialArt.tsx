import { StyleSheet, Text, View } from "react-native";
import type { Material } from "../types";
import { Icon, type IconName } from "./ui";
import { colors, radius } from "../constants/theme";
const icons: Record<Material["icon"], IconName> = {
  can: "cup-outline",
  bottle: "bottle-soda-classic-outline",
  box: "package-variant",
  paper: "file-document-outline",
  glass: "glass-wine",
};
export function MaterialArt({
  material,
  small = false,
}: {
  material: Material;
  small?: boolean;
}) {
  return (
    <View
      accessibilityLabel={`Ilustração de ${material.nome}`}
      style={[
        art.frame,
        { backgroundColor: material.color },
        small && art.small,
      ]}
    >
      <View style={[art.circle, small && { width: 48, height: 48 }]}>
        <Icon
          name={icons[material.icon]}
          size={small ? 32 : 90}
          color={colors.ink}
        />
      </View>
      {!small && (
        <Text style={art.label}>
          ILUSTRAÇÃO · {material.categoria.toUpperCase()}
        </Text>
      )}
    </View>
  );
}
const art = StyleSheet.create({
  frame: {
    height: 220,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    overflow: "hidden",
  },
  small: { height: 64, width: 64, borderRadius: radius.sm },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: "#FFFFFF80",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-8deg" }],
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    color: colors.ink,
  },
});
