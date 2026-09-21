import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { materials, unitLabel } from "../data/materials";
import type { MaterialId } from "../types";
import { EmptyState, Icon, styles } from "./ui";
import { MaterialArt } from "./MaterialArt";
import { colors } from "../constants/theme";
export function MaterialPicker({
  selected,
  onSelect,
}: {
  selected?: MaterialId;
  onSelect: (id: MaterialId) => void;
}) {
  const [query, setQuery] = useState("");
  const clean = (text: string) =>
    text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const filtered = materials.filter((item) =>
    clean(item.nome).includes(clean(query)),
  );
  return (
    <>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        accessibilityLabel="Buscar material"
        placeholder="Buscar material…"
        placeholderTextColor={colors.muted}
      />
      {filtered.map((item) => (
        <Pressable
          key={item.id}
          accessibilityRole="radio"
          accessibilityState={{ checked: selected === item.id }}
          accessibilityLabel={`${item.nome}, medido em ${unitLabel(item.unidadeDeMedida)}`}
          onPress={() => onSelect(item.id)}
          style={[
            styles.card,
            styles.row,
            {
              borderColor: selected === item.id ? colors.primary : colors.line,
              backgroundColor:
                selected === item.id ? colors.primarySoft : colors.surface,
            },
          ]}
        >
          <MaterialArt material={item} small />
          <View style={{ flex: 1 }}>
            <Text style={styles.subtitle}>{item.nome}</Text>
            <Text style={styles.caption}>
              {item.categoria} · {unitLabel(item.unidadeDeMedida)}
            </Text>
          </View>
          <Icon
            name={selected === item.id ? "check-circle" : "circle-outline"}
          />
        </Pressable>
      ))}
      {!filtered.length && (
        <EmptyState
          title="Material não encontrado"
          text="Tente outro nome ou limpe a busca."
          action="Limpar busca"
          onPress={() => setQuery("")}
        />
      )}
    </>
  );
}
