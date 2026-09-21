import { useRef, useState } from "react";
import { Text, TextInput } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import {
  Button,
  Card,
  Heading,
  Notice,
  Screen,
  styles,
} from "../components/ui";
import { MaterialPicker } from "../components/MaterialPicker";
import { MaterialArt } from "../components/MaterialArt";
import { getMaterial, unitLabel } from "../data/materials";
import { useApp } from "../context/AppContext";
import { estimateCats, number, parseQuantity } from "../services/marketService";
import { colors as c } from "../constants/theme";
import type { MaterialId } from "../types";
export default function Add() {
  const params = useLocalSearchParams<{
    materialId?: string;
    fromCamera?: string;
  }>();
  const app = useApp();
  const [selected, setSelected] = useState<MaterialId | undefined>(
    getMaterial(params.materialId ?? "")?.id,
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const submitted = useRef(false);
  const material = selected ? getMaterial(selected) : undefined;
  const parsed = material
    ? parseQuantity(app.draft, material.unidadeDeMedida)
    : undefined;
  function save() {
    if (!material || submitted.current) return;
    setError("");
    try {
      submitted.current = true;
      setSaving(true);
      app.register(material.id, app.draft);
      router.dismissTo("/mercado");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível registrar. Tente novamente.",
      );
      submitted.current = false;
      setSaving(false);
    }
  }
  return (
    <Screen>
      <Heading
        eyebrow={
          material ? "ETAPA 2 DE 2 · QUANTIDADE" : "ETAPA 1 DE 2 · MATERIAL"
        }
        title={material ? "Quanto você vai entregar?" : "O que vamos separar?"}
        subtitle={
          material
            ? "Informe a quantidade. A estimativa aparece antes de registrar."
            : "Selecione um material ou use a câmera para começar."
        }
      />
      {material ? (
        <>
          <MaterialArt material={material} />
          <Text style={styles.subtitle}>{material.nome}</Text>
          <Button
            secondary
            title="Escolher outro material"
            onPress={() => {
              setSelected(undefined);
              app.setDraft("");
              setError("");
            }}
          />
          <Text style={styles.subtitle}>
            Quantidade em {unitLabel(material.unidadeDeMedida)}
          </Text>
          <TextInput
            accessibilityLabel={`Quantidade em ${unitLabel(material.unidadeDeMedida)}`}
            style={styles.input}
            value={app.draft}
            onChangeText={(value) => {
              app.setDraft(value);
              setError("");
            }}
            keyboardType={
              material.unidadeDeMedida === "kg" ? "decimal-pad" : "number-pad"
            }
            placeholder={
              material.unidadeDeMedida === "kg" ? "Ex.: 4,5" : "Ex.: 50"
            }
            placeholderTextColor={c.muted}
            maxLength={12}
          />
          <Text style={styles.body}>
            {material.unidadeDeMedida === "kg"
              ? "Use o peso em quilogramas. Aceitamos vírgula ou ponto: 4,5 kg."
              : "Conte os objetos inteiros. Exemplo: 50 latas = 50 unidades."}
          </Text>
          {app.draft !== "" && parsed?.error && (
            <Notice error>{parsed.error}</Notice>
          )}
          <Card tone={c.primarySoft}>
            <Text style={styles.caption}>ESTIMATIVA DEMONSTRATIVA</Text>
            <Text style={styles.title}>
              {parsed?.value !== undefined
                ? number(estimateCats(material, parsed.value))
                : "—"}{" "}
              CATS
            </Text>
            <Text style={styles.body}>
              Esse valor ficará aguardando entrega. Ele não será somado aos CATS
              confirmados.
            </Text>
          </Card>
          {error !== "" && <Notice error>{error}</Notice>}
          <Button
            title="Registrar no Mercado Verde"
            icon="check"
            loading={saving}
            disabled={parsed?.value === undefined}
            onPress={save}
          />
          <Notice>
            Valores demonstrativos do protótipo. Taxas e critérios reais serão
            validados posteriormente.
          </Notice>
        </>
      ) : (
        <>
          <Button
            secondary
            title="Usar a câmera"
            icon="camera-outline"
            onPress={() => {
              app.clearFlow();
              router.dismissTo("/camera");
            }}
          />
          <MaterialPicker
            onSelect={(id) => {
              setSelected(id);
              app.setDraft("");
            }}
          />
        </>
      )}
    </Screen>
  );
}
