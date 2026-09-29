import { Pressable, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Card,
  EmptyState,
  Heading,
  Icon,
  Screen,
  styles,
} from "../../components/ui";
import { MaterialArt } from "../../components/MaterialArt";
import { wasteTypes } from "../../data/wasteTypes";
import { wasteSubtypes } from "../../data/wasteSubtypes";
import { getMaterial } from "../../data/materials";
export default function TypeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const type = wasteTypes.find((t) => t.id === id);
  if (!type)
    return (
      <Screen>
        <EmptyState
          title="Tipo não encontrado"
          text="Escolha um dos tipos disponíveis."
          action="Voltar à Reciclagem"
          onPress={() => router.replace("/aprender")}
        />
      </Screen>
    );
  return (
    <Screen>
      <Heading
        eyebrow="RECICLAGEM · TIPOS"
        title={type.name}
        subtitle={type.description}
      />
      <Text style={styles.subtitle}>Escolha um subtipo</Text>
      {wasteSubtypes
        .filter((s) => s.typeId === id)
        .map((sub) => {
          const m = getMaterial(sub.id)!;
          return (
            <Pressable
              key={sub.id}
              accessibilityRole="button"
              onPress={() =>
                router.push({
                  pathname: "/subtipo/[id]",
                  params: { id: sub.id },
                })
              }
            >
              <Card>
                <View style={styles.row}>
                  <MaterialArt material={m} small />
                  <Text style={[styles.subtitle, { flex: 1 }]}>{m.nome}</Text>
                  <Icon name="chevron-right" />
                </View>
                <Text style={styles.body}>{m.descricao}</Text>
              </Card>
            </Pressable>
          );
        })}
    </Screen>
  );
}
