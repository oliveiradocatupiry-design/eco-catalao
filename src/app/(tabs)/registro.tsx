import { useCallback, useRef, useState } from "react";
import {
  AppState,
  ActivityIndicator,
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
import { RegistrationPhoto } from "../../components/RegistrationPhoto";
import { filterRegistrations } from "../../services/registrationRepository";
import type {
  WasteRegistration,
  RegistrationDraft,
} from "../../types/registration";
import {
  Button,
  Chip,
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
import { getMaterial, materials } from "../../data/materials";
import type { MaterialId } from "../../types";
import { colors } from "../../constants/theme";
export default function Registration() {
  const {
    entries,
    register,
    edit,
    remove,
    loading,
    loadError,
    reload,
    operation,
  } = useApp();
  const [editing, setEditing] = useState<WasteRegistration>();
  const pendingDraft = useRef<RegistrationDraft | undefined>(undefined);
  const [deleting, setDeleting] = useState<WasteRegistration>();
  const [filter, setFilter] = useState<string>();
  const visibleEntries = filterRegistrations(entries, filter);
  const saving = operation === "save" || operation === "edit";
  const [permission, requestPermission] = useCameraPermissions();
  const camera = useRef<CameraView>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const locked = useRef(false);
  const active = useRef(false);
  const [photo, setPhoto] = useState<string>();

  const [materialId, setMaterial] = useState<MaterialId>();
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [formError, setFormError] = useState("");
  const scroll = useRef<ScrollView>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  function replacePhoto(uri?: string) {
    setPhoto(uri);
  }
  function beginEdit(entry: WasteRegistration) {
    if (locked.current || operation) return;
    if (!editing)
      pendingDraft.current = {
        materialId: materialId ?? "",
        quantity,
        weight,
        photo,
      };
    setEditing(entry);
    setMaterial(entry.materialId);
    setQuantity(entry.quantity?.toString() ?? "");
    setWeight(
      entry.weight?.toLocaleString("pt-BR", {
        useGrouping: false,
        maximumSignificantDigits: 21,
      }) ?? "",
    );
    setPhoto(entry.photo);
    setCameraOpen(false);
    setFormError("");
    setMessage("");
    setError("");
    scroll.current?.scrollTo({ y: 0, animated: true });
  }
  function finishEdit() {
    const draft = pendingDraft.current;
    setMaterial(
      draft?.materialId ? (draft.materialId as MaterialId) : undefined,
    );
    setQuantity(draft?.quantity ?? "");
    setWeight(draft?.weight ?? "");
    setPhoto(draft?.photo);
    pendingDraft.current = undefined;
    setEditing(undefined);
    setCameraOpen(false);
    setFormError("");
    setError("");
  }
  async function confirmDelete() {
    if (!deleting || locked.current) return;
    locked.current = true;
    setBusy(true);
    setMessage("");
    setError("");
    try {
      await remove(deleting);
      setDeleting(undefined);
      setMessage("Registro excluído.");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Não foi possível excluir. Tente novamente.",
      );
      setDeleting(undefined);
    } finally {
      locked.current = false;
      setBusy(false);
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
    locked.current = true;
    setBusy(true);
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
    } finally {
      locked.current = false;
      setBusy(false);
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
  async function save() {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    setError("");
    setMessage("");
    setFormError("");
    try {
      const draft = { materialId: materialId ?? "", quantity, weight, photo };
      if (editing) {
        await edit(editing, draft);
        finishEdit();
        setMessage("Alterações salvas.");
        return;
      }
      await register(draft);
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
    } finally {
      locked.current = false;
      setBusy(false);
    }
  }
  return (
    <Screen scrollRef={scroll}>
      <Heading
        eyebrow="SEPARAR É O PRIMEIRO PASSO"
        title="Registro de Resíduo"
        subtitle="Fotografe e registre os materiais que você pretende entregar."
      />
      {editing && (
        <Notice>Editando registro. A data original será mantida.</Notice>
      )}
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
              <RegistrationPhoto key={photo} uri={photo} preview />
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
        disabled={busy || !!operation}
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
          editable={!busy && !operation}
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Ex.: 5"
        />
        <Text style={styles.caption}>Peso (kg)</Text>
        <TextInput
          accessibilityLabel="Peso em quilogramas"
          style={styles.input}
          keyboardType="decimal-pad"
          editable={!busy && !operation}
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
        title={
          saving
            ? "Salvando…"
            : editing
              ? "Salvar alterações"
              : "Salvar registro"
        }
        loading={saving}
        icon="check"
        onPress={save}
        disabled={busy || cameraOpen || loading || !!loadError || !!operation}
      />
      {editing && (
        <Button
          secondary
          title="Cancelar"
          disabled={busy || !!operation}
          onPress={finishEdit}
        />
      )}
      <Text style={styles.caption}>
        Os registros e fotos ficam salvos neste aparelho ou navegador. Nada é
        enviado. Limpar os dados ou desinstalar pode apagar o histórico. Não há
        backup ou sincronização.
      </Text>
      <Section title="Meus registros" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 8 }}
      >
        <Chip
          label="Todos os materiais"
          selected={!filter}
          onPress={() => setFilter(undefined)}
        />
        {materials.map((material) => (
          <Chip
            key={material.id}
            label={material.nome}
            selected={filter === material.id}
            onPress={() => setFilter(material.id)}
          />
        ))}
      </ScrollView>
      {loading && (
        <View style={styles.row}>
          <ActivityIndicator color={colors.primary} />
          <Text style={styles.body}>Carregando seus registros…</Text>
        </View>
      )}
      {!!loadError && (
        <>
          <Notice error>{loadError}</Notice>
          <Button
            secondary
            title="Tentar novamente"
            onPress={() => {
              void reload();
            }}
          />
        </>
      )}
      {!loading && !loadError && !!entries.length && !visibleEntries.length && (
        <EmptyState
          title="Você ainda não registrou esse material"
          text="Escolha outro material ou crie um registro."
        />
      )}
      {!loading && !loadError && !entries.length && (
        <EmptyState
          title="Seu primeiro registro começa aqui"
          text="Depois de salvar, seus materiais aparecerão nesta lista."
        />
      )}
      {!loading &&
        !loadError &&
        visibleEntries.map((entry) => (
          <Card key={entry.id}>
            <View style={styles.row}>
              {entry.photo && (
                <RegistrationPhoto key={entry.photo} uri={entry.photo} />
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.subtitle}>
                  {getMaterial(entry.materialId)?.nome}
                </Text>
                <Text style={styles.body}>
                  {[
                    entry.quantity !== undefined
                      ? `${entry.quantity} ${entry.quantity === 1 ? "unidade" : "unidades"}`
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
            <Button
              secondary
              title="Editar"
              disabled={busy || !!operation || !!editing}
              onPress={() => beginEdit(entry)}
            />
            <Button
              secondary
              title={operation === entry.id ? "Excluindo…" : "Excluir"}
              disabled={busy || !!operation || !!editing}
              onPress={() => {
                setDeleting(entry);
                setError("");
              }}
            />
          </Card>
        ))}
      <Modal
        visible={!!deleting}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!busy) setDeleting(undefined);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: 24,
            backgroundColor: "rgba(0,0,0,0.35)",
          }}
        >
          <Card>
            <Text accessibilityRole="header" style={styles.subtitle}>
              Excluir registro?
            </Text>
            <Text style={styles.body}>
              Este registro será removido do seu histórico.
            </Text>
            <Button
              secondary
              title="Cancelar"
              disabled={busy}
              onPress={() => setDeleting(undefined)}
            />
            <Button
              title={busy ? "Excluindo…" : "Excluir"}
              loading={busy}
              onPress={confirmDelete}
            />
          </Card>
        </View>
      </Modal>
    </Screen>
  );
}
