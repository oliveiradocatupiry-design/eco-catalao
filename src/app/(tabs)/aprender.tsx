import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import {
  Card,
  Heading,
  Icon,
  Notice,
  Screen,
  Section,
  styles,
} from "../../components/ui";
import { EducationalCard } from "../../components/FeatureCards";
import { wasteTypes } from "../../data/wasteTypes";
import { educationalContent } from "../../data/educationalContent";
export default function Recycling() {
  return (
    <Screen>
      <Heading
        eyebrow="APRENDER PARA CUIDAR"
        title="Reciclagem"
        subtitle="Conheça os materiais, aprenda a separar e descubra novas formas de reutilizar."
      />
      <Notice>
        Conteúdos disponíveis localmente nesta versão. Confirme a aceitação dos
        materiais com a coleta da comunidade.
      </Notice>
      <Section title="Tipos de resíduos" />
      {wasteTypes.map((type) => (
        <Pressable
          key={type.id}
          accessibilityRole="button"
          accessibilityLabel={`Conhecer ${type.name}`}
          onPress={() =>
            router.push({ pathname: "/tipo/[id]", params: { id: type.id } })
          }
        >
          <Card tone={type.color}>
            <View style={styles.row}>
              <Icon name={type.icon} size={36} />
              <Text style={[styles.subtitle, { flex: 1 }]}>{type.name}</Text>
              <Icon name="chevron-right" />
            </View>
            <Text style={styles.body}>{type.description}</Text>
          </Card>
        </Pressable>
      ))}
      <Section title="Cuidados do dia a dia" />
      {educationalContent.map((item) => (
        <EducationalCard key={item.id} item={item} />
      ))}
    </Screen>
  );
}
