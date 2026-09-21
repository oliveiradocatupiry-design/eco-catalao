import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Card,
  EmptyState,
  Heading,
  Icon,
  Notice,
  Screen,
  styles,
  type IconName,
} from "../../components/ui";
import { educationalContent } from "../../data/educationalContent";
export default function Article() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = educationalContent.find((content) => content.id === id);
  if (!item)
    return (
      <Screen>
        <EmptyState
          title="Conteúdo não encontrado"
          text="Veja os conteúdos disponíveis na área Aprender."
          action="Ir para Aprender"
          onPress={() => router.replace("/aprender")}
        />
      </Screen>
    );
  return (
    <Screen>
      <Card tone={item.color}>
        <Icon name={item.icon as IconName} size={60} />
        <Text style={styles.eyebrow}>
          {item.category.toUpperCase()} · {item.minutes} MIN DE LEITURA
        </Text>
        <Heading title={item.title} subtitle={item.summary} />
      </Card>
      {item.sections.map((section, index) => (
        <Card key={section.title}>
          <Text style={styles.eyebrow}>0{index + 1}</Text>
          <Text style={styles.subtitle}>{section.title}</Text>
          <Text style={styles.body}>{section.body}</Text>
        </Card>
      ))}
      <Notice>
        Conteúdo educativo inicial. Confirme as orientações e os materiais
        aceitos com a coleta local.
      </Notice>
      <Button
        title="Colocar em prática"
        icon="camera-outline"
        onPress={() => router.dismissTo("/camera")}
      />
      <Button
        secondary
        title="Explorar outros conteúdos"
        onPress={() => router.dismissTo("/aprender")}
      />
    </Screen>
  );
}
