import { Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Card,
  EmptyState,
  Heading,
  Icon,
  Screen,
  styles,
} from "../../components/ui";
import { reuseIdeas } from "../../data/reuseIdeas";
import { colors } from "../../constants/theme";
export default function ReuseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const idea = reuseIdeas.find((i) => i.id === id);
  if (!idea)
    return (
      <Screen>
        <EmptyState
          title="Ideia não encontrada"
          text="Explore as ideias disponíveis na Reciclagem."
          action="Voltar"
          onPress={() => router.replace("/aprender")}
        />
      </Screen>
    );
  return (
    <Screen>
      <Heading
        eyebrow="DAR UMA NOVA UTILIDADE"
        title={idea.title}
        subtitle={idea.description}
      />
      <View
        accessibilityRole="image"
        accessibilityLabel={`Ilustração: ${idea.title}`}
        style={{
          height: 210,
          borderRadius: 24,
          backgroundColor: colors.primarySoft,
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Icon name={idea.icon} size={96} />
        <Text style={styles.caption}>IDEIA DE REUTILIZAÇÃO</Text>
      </View>
      <Card>
        <Text style={styles.subtitle}>Materiais necessários</Text>
        {idea.materials.map((item) => (
          <Text key={item} style={styles.body}>
            • {item}
          </Text>
        ))}
      </Card>
      <Text style={styles.subtitle}>Passo a passo</Text>
      {idea.steps.map((step, i) => (
        <Card key={step}>
          <Text style={styles.eyebrow}>PASSO {i + 1}</Text>
          <Text style={styles.body}>{step}</Text>
        </Card>
      ))}
      <Button
        secondary
        title="Explorar outros materiais"
        onPress={() => router.dismissTo("/aprender")}
      />
    </Screen>
  );
}
