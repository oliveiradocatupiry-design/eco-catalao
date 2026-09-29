import { useCallback, useRef, useState } from "react";
import {
  AppState,
  Image,
  Linking,
  Modal,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { File } from "expo-file-system";
import {
  Button,
  Card,
  EmptyState,
  Heading,
  Icon,
  Notice,
  Screen,
  Section,
  styles,
} from "../../components/ui";
import { MaterialPicker } from "../../components/MaterialPicker";
import { useApp } from "../../context/AppContext";
import { getMaterial } from "../../data/materials";
import type { MaterialId } from "../../types";
import { colors } from "../../constants/theme";
export default function Registration() {
  const { entries, register } = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const active = useRef(false);
  const [photo, setPhoto] = useState<string>();
  const draftPhoto = useRef<string | undefined>(undefined);
  const [materialId, setMaterial] = useState<MaterialId>();
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const scroll = useRef<ScrollView>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  function replacePhoto(uri?: string) {
    const previous = draftPhoto.current;
    draftPhoto.current = uri;
    setPhoto(uri);
    if (previous?.startsWith("file://") && previous !== uri) {
      try {
        const file = new File(previous);
        if (file.exists) file.delete();
      } catch {
        /* O SO gerencia o cache temporário. */
      }
    }
  }
  useFocusEffect(
    useCallback(() => {
      active.current = true;
      const listener = AppState.addEventListener("change", (state) => {
        if (state !== "active") setCameraOpen(false);
      });
      return () => {
        active.current = false;
        setCameraOpen(false);
        setReady(false);
        listener.remove();
      };
    }, []),
  );
  async function openCamera() {
    if (locked.current) return;
    setError("");
    setReady(false);
    try {
      const result = permission?.granted
        ? permission
        : await requestPermission();
      if (!active.current) return;
      if (result.granted) setCameraOpen(true);
      else
        setError(
          "A câmera não foi autorizada. Você pode escolher uma imagem da galeria ou registrar sem foto.",
        );
    } catch {
      setError(
        "Não foi possível abrir a câmera. Tente novamente ou use a galeria.",
      );
    }
  }
  async function capture() {
    if (!ready || locked.current || !camera.current) return;
    locked.current = true;
    setBusy(true);
    setError("");
    try {
      const result = await camera.current.takePictureAsync({ quality: 0.65 });
      if (result?.uri) {
        replacePhoto(result.uri);
        setCameraOpen(false);
      }
    } catch {
      setError("Não foi possível tirar a foto. Tente novamente.");
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }
  async function pickImage() {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setCameraOpen(false);
    setError("");
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.65,
      });
      if (!result.canceled && result.assets[0])
        replacePhoto(result.assets[0].uri);
    } catch {
      setError(
        "Não foi possível abrir a galeria. Verifique as permissões e tente novamente.",
      );
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }
  function save() {
    if (locked.current) return;
    setError("");
    setMessage("");
    setFormError("");
    try {
      register({ materialId: materialId ?? "", quantity, weight, photo });
      // Transferência da foto ao histórico: não excluir ao limpar o formulário.
      draftPhoto.current = undefined;
      setPhoto(undefined);
      setMaterial(undefined);
      setQuantity("");
      setWeight("");
      setCameraOpen(false);
      setMessage("Registro salvo! Veja o material em Meus registros.");
      requestAnimationFrame(() =>
        scroll.current?.scrollToEnd({ animated: true }),
      );
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "Não foi possível salvar.");
    }
  }
  return (
    <Screen scrollRef={scroll}>
      <Heading
        eyebrow="SEPARAR É O PRIMEIRO PASSO"
        title="Registro de Resíduo"
        subtitle="Fotografe e registre os materiais que você pretende entregar."
      />
      <Card tone={colors.primarySoft}>
        {cameraOpen ? (
          <>
            <CameraView
              ref={camera}
              style={{ height: 300, borderRadius: 18 }}
              facing="back"
              onCameraReady={() => setReady(true)}
              onMountError={() => {
                setCameraOpen(false);
                setError(
                  "Câmera indisponível. Use a galeria ou registre sem foto.",
                );
              }}
            />
            <Button
              title="Tirar foto"
              icon="camera"
              onPress={capture}
              loading={busy}
              disabled={!ready}
            />
            <Button
              secondary
              title="Fechar câmera"
              disabled={busy}
              onPress={() => setCameraOpen(false)}
            />
          </>
        ) : (
          <>
            {photo ? (
              <Image
                source={{ uri: photo }}
                style={{ height: 260, width: "100%", borderRadius: 18 }}
                resizeMode="contain"
                accessibilityLabel="Prévia da foto do resíduo"
              />
            ) : (
              <View style={{ alignItems: "center", padding: 28, gap: 12 }}>
                <Icon name="camera-outline" size={64} />
                <Text style={styles.subtitle}>Comece com uma foto</Text>
                <Text style={[styles.body, { textAlign: "center" }]}>
                  A foto ajuda a lembrar o que você separou.
                </Text>
              </View>
            )}
            <Button
              title={photo ? "Tirar outra foto" : "Abrir câmera"}
              icon="camera-outline"
              onPress={openCamera}
              disabled={busy}
            />
            <Button
              secondary
              title="Escolher imagem da galeria"
              icon="image-outline"
              onPress={pickImage}
              disabled={busy}
            />
            {photo && (
              <Button
                secondary
                title="Remover foto"
                onPress={() => replacePhoto()}
                disabled={busy}
              />
            )}
          </>
        )}
        <Text style={styles.caption}>
          Nesta versão, você escolhe o material manualmente. A classificação
          automática ainda não está disponível. A foto é opcional.
        </Text>
      </Card>
      {!!error && <Notice error>{error}</Notice>}
      {permission && !permission.granted && !permission.canAskAgain && (
        <Button
          secondary
          title="Abrir configurações de permissão"
          onPress={() => {
            void Linking.openSettings().catch(() =>
              setError(
                "Abra as configurações do aparelho para autorizar a câmera.",
              ),
            );
          }}
        />
      )}
      {!!message && <Notice success>{message}</Notice>}
      <Section title="Qual material você separou?" />
      <Text style={styles.caption}>
        Lista provisória de materiais do protótipo.
      </Text>
      <Button
        secondary
        title={
          materialId ? getMaterial(materialId)!.nome : "Selecionar material"
        }
        icon="chevron-down"
        onPress={() => setPickerOpen(true)}
      />
      <Modal
        visible={pickerOpen}
        animationType="slide"
        onRequestClose={() => setPickerOpen(false)}
      >
        <Screen>
          <Heading
            title="Selecione o material"
            subtitle="Escolha um dos materiais da lista provisória."
          />
          <Button
            secondary
            title="Fechar seleção"
            onPress={() => setPickerOpen(false)}
          />
          <MaterialPicker
            selected={materialId}
            onSelect={(id) => {
              setMaterial(id);
              setFormError("");
              setPickerOpen(false);
            }}
          />
        </Screen>
      </Modal>
      <Card>
        <Text style={styles.subtitle}>Quantidade ou peso</Text>
        <Text style={styles.body}>
          Preencha pelo menos um dos campos. Se souber os dois, pode informar
          ambos.
        </Text>
        <Text style={styles.caption}>Quantidade (unidades)</Text>
        <TextInput
          accessibilityLabel="Quantidade em unidades"
          style={styles.input}
          keyboardType="number-pad"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Ex.: 5"
        />
        <Text style={styles.caption}>Peso (kg)</Text>
        <TextInput
          accessibilityLabel="Peso em quilogramas"
          style={styles.input}
          keyboardType="decimal-pad"
          value={weight}
          onChangeText={setWeight}
          placeholder="Ex.: 1,5"
        />
      </Card>
      <Card tone={colors.primarySoft}>
        <Icon name="wallet-outline" />
        <Text style={styles.subtitle}>CATS</Text>
        <Text style={styles.body}>
          Valor ainda não disponível. Os valores em CATS serão definidos
          conforme a tabela do projeto.
        </Text>
      </Card>
      {!!formError && <Notice error>{formError}</Notice>}
      <Button
        title="Salvar registro"
        icon="check"
        onPress={save}
        disabled={busy || cameraOpen}
      />
      <Text style={styles.caption}>
        Os registros e as fotos ficam nesta sessão. Ao recarregar ou encerrar o
        aplicativo, o histórico é reiniciado. Nada é enviado.
      </Text>
      <Section title="Meus registros" />
      {!entries.length && (
        <EmptyState
          title="Seu primeiro registro começa aqui"
          text="Depois de salvar, seus materiais aparecerão nesta lista."
        />
      )}
      {entries.map((entry) => (
        <Card key={entry.id}>
          <View style={styles.row}>
            {entry.photo && (
              <Image
                source={{ uri: entry.photo }}
                style={{ width: 72, height: 72, borderRadius: 12 }}
                accessibilityLabel={`Foto de ${getMaterial(entry.materialId)?.nome}`}
              />
            )}
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitle}>
                {getMaterial(entry.materialId)?.nome}
              </Text>
              <Text style={styles.body}>
                {[
                  entry.quantity !== undefined
                    ? `${entry.quantity} unidades`
                    : null,
                  entry.weight !== undefined
                    ? `${entry.weight.toLocaleString("pt-BR")} kg`
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </Text>
            </View>
          </View>
          <Text style={styles.caption}>
            {new Date(entry.date).toLocaleString("pt-BR")}
          </Text>
          <Text style={styles.link}>{entry.status}</Text>
          <Text style={styles.caption}>CATS: valor ainda não disponível</Text>
        </Card>
      ))}
    </Screen>
  );
}
