import { Text } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Card,
  EmptyState,
  Heading,
  Notice,
  Screen,
  styles,
} from "../../components/ui";
import { MaterialArt } from "../../components/MaterialArt";
import { wasteSubtypes } from "../../data/wasteSubtypes";
import { getMaterial } from "../../data/materials";
import { reuseIdeas } from "../../data/reuseIdeas";
export default function SubtypeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const sub = wasteSubtypes.find((s) => s.id === id);
  const material = getMaterial(id);
  if (!sub || !material)
    return (
      <Screen>
        <EmptyState
          title="Material não encontrado"
          text="Escolha um material na Reciclagem."
          action="Voltar"
          onPress={() => router.replace("/aprender")}
        />
      </Screen>
    );
  const sections = [
    ["Informações gerais", material.conteudoEducativo],
    ["Impacto ambiental", sub.impact],
    ["Como separar", sub.separation],
    ["Como descartar", material.instrucoesDescarte],
  ];
  return (
    <Screen>
      <Heading
        eyebrow={`RECICLAGEM · ${material.categoria.toUpperCase()}`}
        title={material.nome}
        subtitle={material.descricao}
      />
      <MaterialArt material={material} />
      {sections.map(([title, body], i) => (
        <Card key={title}>
          <Text style={styles.eyebrow}>0{i + 1}</Text>
          <Text style={styles.subtitle}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
        </Card>
      ))}
      <Notice>
        Reciclável não significa aceito em todos os pontos. Confirme as
        orientações locais antes da entrega.
      </Notice>
      <Text style={styles.subtitle}>Ideias de reutilização</Text>
      <Button
        title={reuseIdeas.find((idea) => idea.id === sub.reuseId)!.title}
        icon="lightbulb-outline"
        onPress={() =>
          router.push({
            pathname: "/reutilizacao/[id]",
            params: { id: sub.reuseId },
          })
        }
      />
      <Button
        secondary
        title="Registrar resíduo"
        onPress={() => router.navigate("/registro")}
      />
    </Screen>
  );
}
