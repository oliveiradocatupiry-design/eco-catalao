import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Card, Icon, styles, type IconName } from "./ui";
import type { EducationalContent } from "../types";
export function EducationalCard({ item }: { item: EducationalContent }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ler: ${item.title}`}
      onPress={() =>
        router.push({ pathname: "/conteudo/[id]", params: { id: item.id } })
      }
    >
      <Card>
        <View style={styles.row}>
          <Icon name={item.icon as IconName} />
          <Text style={[styles.subtitle, { flex: 1 }]}>{item.title}</Text>
          <Icon name="chevron-right" />
        </View>
        <Text style={styles.body}>{item.summary}</Text>
      </Card>
    </Pressable>
  );
}
