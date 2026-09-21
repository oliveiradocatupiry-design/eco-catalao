import { Image, Text } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Card,
  EmptyState,
  Heading,
  Notice,
  Screen,
  styles,
} from "../components/ui";
import { MaterialArt } from "../components/MaterialArt";
import { useApp } from "../context/AppContext";
import { getMaterial } from "../data/materials";
export default function Result() {
  const app = useApp();
  const result = app.classification;
  const material = result && getMaterial(result.materialId);
  if (!result || !material)
    return (
      <Screen>
        <EmptyState
          title="Vamos identificar um material?"
          text="O resultado fica disponível durante esta sessão."
          action="Abrir câmera"
          onPress={() => router.replace("/camera")}
        />
      </Screen>
    );
  return (
    <Screen>
      <Heading
        eyebrow="RESULTADO DEMONSTRATIVO"
        title={material.nome}
        subtitle={material.descricao}
      />
      {app.photo ? (
        <Image
          source={{ uri: app.photo }}
          accessibilityLabel="Foto do material analisado"
          style={{ height: 230, borderRadius: 24 }}
          resizeMode="contain"
        />
      ) : (
        <MaterialArt material={material} />
      )}
      <Notice success>
        {result.corrected
          ? "Identificação corrigida por você. Nenhuma foto ou correção foi enviada."
          : `${Math.round(result.confidence * 100)}% de confiança SIMULADA · ${material.categoria}`}
      </Notice>
      <Card>
        <Text style={styles.subtitle}>
          {material.reciclavel
            ? "✓ Material reciclável"
            : "Exige descarte específico"}
        </Text>
        <Text style={styles.body}>
          A aceitação depende do ponto de coleta. Confirme antes da entrega.
        </Text>
      </Card>
      <Card>
        <Text style={styles.subtitle}>Como descartar</Text>
        <Text style={styles.body}>{material.instrucoesDescarte}</Text>
      </Card>
      <Card>
        <Text style={styles.subtitle}>Uma ideia para reutilizar</Text>
        <Text style={styles.body}>{material.dicasReutilizacao}</Text>
      </Card>
      <Card>
        <Text style={styles.subtitle}>Você sabia?</Text>
        <Text style={styles.body}>{material.conteudoEducativo}</Text>
      </Card>
      {result.accepted ? (
        <Notice success>
          Material revisado. Agora você pode registrar a quantidade.
        </Notice>
      ) : (
        <Button title="Está correto" icon="check" onPress={app.accept} />
      )}
      <Button
        secondary
        title="Corrigir identificação"
        icon="pencil-outline"
        onPress={() => router.push("/corrigir")}
      />
      <Button
        title="Adicionar ao Mercado Verde"
        icon="basket-outline"
        onPress={() => {
          app.accept();
          app.setDraft("");
          router.push({
            pathname: "/adicionar",
            params: { materialId: material.id, fromCamera: "1" },
          });
        }}
      />
      <Button
        secondary
        title="Fotografar novamente"
        icon="camera-retake-outline"
        onPress={() => {
          app.clearFlow();
          router.dismissTo("/camera");
        }}
      />
    </Screen>
  );
}
