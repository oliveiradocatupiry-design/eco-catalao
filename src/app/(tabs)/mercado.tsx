import { useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Card,
  Chip,
  EmptyState,
  Heading,
  Notice,
  Screen,
  styles,
} from "../../components/ui";
import { EntryCard } from "../../components/FeatureCards";
import { useApp } from "../../context/AppContext";
import { number } from "../../services/marketService";
import { colors as c } from "../../constants/theme";
export default function Market() {
  const app = useApp();
  const [filter, setFilter] = useState("all");
  const [removing, setRemoving] = useState<string | null>(null);
  const entries = app.entries.filter(
    (e) => filter === "all" || e.status === filter,
  );
  return (
    <Screen>
      <Heading
        eyebrow="SEPARAR • REGISTRAR • ENTREGAR"
        title="Mercado Verde"
        subtitle="Organize seus materiais e acompanhe cada entrega."
      />
      {app.notice !== "" && (
        <>
          <Notice success>{app.notice}</Notice>
          <Button secondary title="Entendi" onPress={() => app.setNotice("")} />
        </>
      )}
      <Card tone={c.primarySoft}>
        <Text style={styles.caption}>POTENCIAL DA PRÓXIMA ENTREGA</Text>
        <Text style={styles.title}>
          {number(app.totals.pending)} CATS estimados
        </Text>
        <Text style={styles.body}>
          O saldo só será confirmado após a verificação da entrega no sistema
          futuro.
        </Text>
        <Button
          secondary
          title="Abrir minha carteira"
          icon="wallet-outline"
          onPress={() => router.push("/carteira")}
        />
      </Card>
      <Button
        title="Adicionar material"
        icon="plus"
        onPress={() => {
          app.setDraft("");
          router.push("/adicionar");
        }}
      />
      <Button
        secondary
        title="Identificar com a câmera"
        icon="camera-outline"
        onPress={() => {
          app.clearFlow();
          router.navigate("/camera");
        }}
      />
      <View style={styles.wrap}>
        {[
          ["all", "Todos"],
          ["pending", "Aguardando"],
          ["confirmed", "Confirmados"],
        ].map(([id, label]) => (
          <Chip
            key={id}
            label={label}
            selected={filter === id}
            onPress={() => setFilter(id)}
          />
        ))}
      </View>
      {entries.length ? (
        entries.map((entry) => (
          <View key={entry.id} style={{ gap: 8 }}>
            <EntryCard entry={entry} onRemove={() => setRemoving(entry.id)} />
            {removing === entry.id && (
              <Card>
                <Text style={styles.body}>
                  Remover este registro e sua estimativa?
                </Text>
                <Button
                  title="Sim, remover registro"
                  onPress={() => {
                    app.remove(entry.id);
                    setRemoving(null);
                  }}
                />
                <Button
                  secondary
                  title="Manter registro"
                  onPress={() => setRemoving(null)}
                />
              </Card>
            )}
          </View>
        ))
      ) : (
        <EmptyState
          title="Nenhum material por aqui"
          text="Os registros dessa situação aparecerão aqui. Comece separando um material."
          action="Adicionar material"
          onPress={() => router.push("/adicionar")}
        />
      )}
      <Notice>
        Taxas e entregas confirmadas são exemplos. Os registros ficam somente
        nesta sessão do aplicativo.
      </Notice>
    </Screen>
  );
}
