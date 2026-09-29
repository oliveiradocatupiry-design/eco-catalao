import { Pressable, Text, View } from "react-native";
import { collectionPoints } from "../data/collectionPoints";
import { colors as c } from "../constants/theme";
import { Icon, styles } from "./ui";
export interface MapProps {
  selected: string;
  onSelect: (id: string) => void;
  native?: boolean;
  user?: { latitude: number; longitude: number };
  focus?: "community" | "user" | "point";
  focusVersion?: number;
}
export default function CollectionMap({ selected, onSelect }: MapProps) {
  return (
    <View
      style={{
        height: 250,
        borderRadius: 24,
        overflow: "hidden",
        backgroundColor: "#E8EFDA",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          width: "140%",
          height: 85,
          backgroundColor: c.river,
          transform: [{ rotate: "-28deg" }],
          left: -40,
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {collectionPoints.map((point, index) => (
          <Pressable
            key={point.id}
            accessibilityRole="button"
            accessibilityLabel={`Selecionar ${point.name}`}
            accessibilityState={{ selected: selected === point.id }}
            onPress={() => onSelect(point.id)}
            style={{ alignItems: "center", gap: 6, marginTop: index * 55 }}
          >
            <View
              style={{
                padding: 14,
                borderRadius: 50,
                backgroundColor: selected === point.id ? c.primary : c.white,
              }}
            >
              <Icon
                name="map-marker-outline"
                size={30}
                color={selected === point.id ? c.white : c.primary}
              />
            </View>
            <Text
              style={[
                styles.caption,
                {
                  backgroundColor: c.white,
                  paddingHorizontal: 8,
                  borderRadius: 8,
                },
              ]}
            >
              Ponto {index + 1}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text
        style={[
          styles.caption,
          {
            position: "absolute",
            bottom: 12,
            alignSelf: "center",
            backgroundColor: "#FFFFFFE0",
            paddingHorizontal: 8,
          },
        ]}
      >
        Esquema ilustrativo · sem escala geográfica
      </Text>
    </View>
  );
}
