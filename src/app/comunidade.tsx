import { Text } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Card,
  Heading,
  Icon,
  Notice,
  Screen,
  styles,
} from "../components/ui";
import { RiverArt } from "../components/RiverArt";
import { colors as c } from "../constants/theme";
export default function Community() {
  return (
    <Screen>
      <Heading
        eyebrow="GENTE, RIO E PERTENCIMENTO"
        title="O cuidado nasce na comunidade."
        subtitle="Comunidade Flutuante do Lago do Catalão"
      />
      <RiverArt />
      <Text style={styles.caption}>
        Ilustração conceitual, sem representar casas ou moradores reais.
      </Text>
      <Text style={styles.subtitle}>Um projeto conectado ao lugar</Text>
      <Text style={styles.body}>
        O EcoCatalão é um protótipo pensado para aproximar educação ambiental,
        separação de materiais e participação comunitária no Catalão.
      </Text>
      <Card tone={c.river}>
        <Icon name="waves" size={34} color={c.riverInk} />
        <Text style={styles.subtitle}>O rio faz parte da vida</Text>
        <Text style={styles.body}>
          Cuidar do destino dos resíduos é também cuidar da água e do território
          compartilhado.
        </Text>
      </Card>
      <Card tone={c.primarySoft}>
        <Icon name="account-group-outline" size={34} />
        <Text style={styles.subtitle}>Construir com as pessoas</Text>
        <Text style={styles.body}>
          A linguagem, os pontos de coleta e as regras precisam ser construídos
          e validados com a comunidade.
        </Text>
      </Card>
      <Card tone={c.sand}>
        <Icon name="basket-outline" size={34} color={c.earth} />
        <Text style={styles.subtitle}>Materiais ganham novos caminhos</Text>
        <Text style={styles.body}>
          O Mercado Verde conecta a separação dos materiais ao acompanhamento
          das entregas e dos CATS.
        </Text>
      </Card>
      <Notice>
        As ações, os locais e as regras exibidos são propostas de demonstração.
        Não anunciam eventos ou serviços em funcionamento.
      </Notice>
      <Button
        title="Conhecer o Mercado Verde"
        icon="basket-outline"
        onPress={() => router.dismissTo("/mercado")}
      />
      <Button
        secondary
        title="Aprender a cuidar"
        icon="sprout-outline"
        onPress={() => router.dismissTo("/aprender")}
      />
    </Screen>
  );
}
