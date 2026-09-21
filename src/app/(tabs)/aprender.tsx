import { useState } from "react";
import { TextInput, View } from "react-native";
import { Chip, EmptyState, Heading, Screen, styles } from "../../components/ui";
import { EducationalCard } from "../../components/FeatureCards";
import { educationalContent } from "../../data/educationalContent";
import { colors } from "../../constants/theme";
export default function Learn() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const categories = [
    "Todos",
    ...new Set(educationalContent.map((item) => item.category)),
  ];
  const items = educationalContent.filter(
    (item) =>
      (category === "Todos" || category === item.category) &&
      `${item.title} ${item.summary}`
        .toLocaleLowerCase("pt-BR")
        .includes(search.toLocaleLowerCase("pt-BR")),
  );
  return (
    <Screen>
      <Heading
        eyebrow="CONHECIMENTO QUE CIRCULA"
        title="Aprender"
        subtitle="Ideias simples para cuidar dos materiais e do nosso território."
      />
      <TextInput
        accessibilityLabel="Buscar conteúdo educativo"
        placeholder="O que você quer aprender?"
        placeholderTextColor={colors.muted}
        style={styles.input}
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.wrap}>
        {categories.map((item) => (
          <Chip
            key={item}
            label={item}
            selected={category === item}
            onPress={() => setCategory(item)}
          />
        ))}
      </View>
      {items.length ? (
        items.map((item) => <EducationalCard key={item.id} item={item} />)
      ) : (
        <EmptyState
          title="Não encontramos esse assunto"
          text="Experimente outro termo ou veja todas as categorias."
          action="Limpar busca e filtros"
          onPress={() => {
            setSearch("");
            setCategory("Todos");
          }}
        />
      )}
    </Screen>
  );
}
