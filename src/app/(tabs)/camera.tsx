import { useEffect, useRef, useState } from "react";
import { AppState, Image, Linking, Platform, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router, useIsFocused } from "expo-router";
import {
  Button,
  Card,
  Chip,
  Heading,
  Notice,
  Screen,
  styles,
} from "../../components/ui";
import { MaterialArt } from "../../components/MaterialArt";
import { useApp, deletePhoto } from "../../context/AppContext";
import { getMaterial, materials } from "../../data/materials";
import { classificationService } from "../../services/mockClassificationService";
import type { MaterialId } from "../../types";
import { colors } from "../../constants/theme";
export default function CameraScreen() {
  const focused = useIsFocused();
  return focused ? <CameraFlow /> : null;
}
function CameraFlow() {
  const app = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const [active, setActive] = useState(AppState.currentState === "active");
  const [demoId, setDemoId] = useState<MaterialId>("aluminio");
  const [preview, setPreview] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [cameraFailed, setCameraFailed] = useState(false);
  const operation = useRef(0);
  const lock = useRef(false);
  const material = getMaterial(demoId)!;
  useEffect(() => {
    const sub = AppState.addEventListener("change", (state) => {
      setActive(state === "active");
      if (state !== "active") setReady(false);
    });
    return () => sub.remove();
  }, []);
  useEffect(
    () => () => {
      operation.current++;
      lock.current = false;
    },
    [],
  );

  async function capture() {
    if (!camera.current || !ready || lock.current) return;
    lock.current = true;
    const version = ++operation.current;
    setBusy(true);
    setError("");
    try {
      const image = await camera.current.takePictureAsync({ quality: 0.65 });
      if (image && version === operation.current) {
        app.setPhoto(image.uri);
        setPreview(true);
      } else if (image) {
        deletePhoto(image.uri);
      }
    } catch {
      if (version === operation.current)
        setError(
          "Não conseguimos capturar. Tente novamente ou use a demonstração.",
        );
    } finally {
      if (version === operation.current) {
        lock.current = false;
        setBusy(false);
      }
    }
  }
  async function analyze() {
    if (lock.current) return;
    lock.current = true;
    const version = ++operation.current;
    setBusy(true);
    setError("");
    try {
      const result = await classificationService.classify(demoId);
      if (version === operation.current) {
        app.setClassification(result);
        router.push("/resultado");
      }
    } catch {
      if (version === operation.current)
        setError("A análise não foi concluída. Tente novamente.");
    } finally {
      if (version === operation.current) {
        setBusy(false);
        lock.current = false;
      }
    }
  }
  async function permit() {
    try {
      setError("");
      await requestPermission();
    } catch {
      setError("Não foi possível abrir a câmera. Use a demonstração abaixo.");
    }
  }
  return (
    <Screen>
      <Heading
        eyebrow="DESCOBRIR PARA SEPARAR"
        title={preview ? "Tudo pronto para analisar?" : "Um material, uma foto"}
        subtitle={
          preview
            ? "Confira a imagem antes de continuar."
            : "Coloque apenas um objeto no enquadramento, em um lugar iluminado."
        }
      />
      {preview ? (
        app.photo ? (
          <Image
            source={{ uri: app.photo }}
            accessibilityLabel="Foto capturada do material"
            style={{ height: 300, borderRadius: 24 }}
            resizeMode="contain"
          />
        ) : (
          <MaterialArt material={material} />
        )
      ) : permission?.granted && !cameraFailed && Platform.OS !== "web" ? (
        <View
          style={{
            height: 310,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: colors.night,
          }}
        >
          {active && (
            <CameraView
              ref={camera}
              facing="back"
              mode="picture"
              style={{ flex: 1 }}
              onCameraReady={() => setReady(true)}
              onMountError={() => {
                setCameraFailed(true);
                setError(
                  "Câmera indisponível neste aparelho. A demonstração continua disponível.",
                );
              }}
            />
          )}
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              inset: 40,
              borderWidth: 2,
              borderColor: colors.lime,
              borderRadius: 24,
            }}
          />
        </View>
      ) : (
        <Card>
          <MaterialArt material={material} />
          <Text style={styles.subtitle}>
            {Platform.OS === "web"
              ? "Experimente a demonstração"
              : "Vamos usar a câmera?"}
          </Text>
          <Text style={styles.body}>
            A foto serve apenas para este fluxo. Ela não é enviada nem salva na
            galeria.
          </Text>
          {Platform.OS !== "web" &&
            (permission?.canAskAgain === false ? (
              <Button
                title="Abrir ajustes de permissão"
                secondary
                onPress={() => {
                  void Linking.openSettings().catch(() =>
                    setError(
                      "Abra os ajustes do aparelho e permita o acesso à câmera.",
                    ),
                  );
                }}
              />
            ) : (
              <Button
                title="Permitir acesso à câmera"
                icon="camera-outline"
                onPress={() => {
                  void permit();
                }}
              />
            ))}
        </Card>
      )}
      {error !== "" && <Notice error>{error}</Notice>}
      <Text style={styles.subtitle}>Cenário da demonstração</Text>
      <Text style={styles.caption}>
        Escolha o resultado simulado. A foto não é interpretada por IA nesta
        versão.
      </Text>
      <View style={styles.wrap}>
        {materials.slice(0, 5).map((item) => (
          <Chip
            key={item.id}
            label={item.nome}
            selected={demoId === item.id}
            onPress={busy ? undefined : () => setDemoId(item.id)}
          />
        ))}
      </View>
      {preview ? (
        <>
          <Button
            title={busy ? "Analisando material…" : "Analisar material"}
            loading={busy}
            icon="line-scan"
            onPress={() => {
              void analyze();
            }}
          />
          <Button
            secondary
            title="Refazer foto"
            disabled={busy}
            icon="camera-retake-outline"
            onPress={() => {
              app.clearFlow();
              setPreview(false);
              setReady(false);
            }}
          />
        </>
      ) : (
        <>
          {permission?.granted && !cameraFailed && Platform.OS !== "web" && (
            <Button
              title={ready ? "Capturar foto" : "Preparando câmera…"}
              disabled={!ready}
              loading={busy}
              icon="camera-outline"
              onPress={() => {
                void capture();
              }}
            />
          )}
          <Button
            secondary
            title="Usar ilustração de demonstração"
            disabled={busy}
            icon="image-outline"
            onPress={() => {
              app.clearFlow();
              setPreview(true);
              setError("");
            }}
          />
        </>
      )}
      <Notice>
        Protótipo: análise simulada, sem envio de imagem. A orientação de
        descarte precisa considerar a coleta disponível.
      </Notice>
    </Screen>
  );
}
