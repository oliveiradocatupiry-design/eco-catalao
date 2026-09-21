import { Text } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Card,
  Heading,
  Notice,
  Screen,
  Section,
  styles,
} from "../components/ui";
import { CatsBalance, EntryCard } from "../components/FeatureCards";
import { useApp } from "../context/AppContext";
export default function Wallet() {
  const { totals, entries } = useApp();
  return (
    <Screen>
      <Heading
        eyebrow="CADA ENTREGA CONTA"
        title="Minha carteira CATS"
        subtitle="Veja o que está previsto e o que aparece como confirmado na demonstração."
      />
      <CatsBalance pending={totals.pending} confirmed={totals.confirmed} />
      <Card>
        <Text style={styles.subtitle}>Estimados: uma previsão</Text>
        <Text style={styles.body}>
          Materiais que você registrou, mas ainda não entregou. O valor pode
          mudar após a conferência.
        </Text>
        <Text style={styles.subtitle}>Confirmados: após a conferência</Text>
        <Text style={styles.body}>
          No futuro, uma pessoa autorizada validará a entrega. Os 20 CATS
          confirmados desta sessão são um exemplo inicial.
        </Text>
      </Card>
      <Section title="Histórico demonstrativo" />
      {entries.map((entry) => (
        <EntryCard key={entry.id} entry={entry} />
      ))}
      <Notice>
        CATS neste protótipo não têm valor monetário e não podem ser resgatados.
        Não há confirmação administrativa real.
      </Notice>
      <Button
        secondary
        title="Ver meus materiais"
        icon="basket-outline"
        onPress={() => router.dismissTo("/mercado")}
      />
    </Screen>
  );
}
