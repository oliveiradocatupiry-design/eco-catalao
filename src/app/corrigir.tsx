import { useState } from "react";
import { router } from "expo-router";
import { Button, EmptyState, Heading, Notice, Screen } from "../components/ui";
import { MaterialPicker } from "../components/MaterialPicker";
import { useApp } from "../context/AppContext";
export default function Correct() {
  const app = useApp();
  const [selected, setSelected] = useState(app.classification?.materialId);
  if (!app.classification)
    return (
      <Screen>
        <EmptyState
          title="Nenhuma identificação para corrigir"
          text="Primeiro faça uma análise demonstrativa."
          action="Abrir câmera"
          onPress={() => router.replace("/camera")}
        />
      </Screen>
    );
  return (
    <Screen>
      <Heading
        title="Qual é o material correto?"
        subtitle="Sua escolha atualiza o resultado e a unidade usada no registro."
      />
      <MaterialPicker selected={selected} onSelect={setSelected} />
      <Button
        title="Confirmar correção"
        icon="check"
        disabled={!selected}
        onPress={() => {
          if (selected) {
            app.correct(selected);
            router.back();
          }
        }}
      />
      <Notice>
        A correção vale apenas nesta sessão. Não criamos um banco de fotos ou
        dados de treinamento.
      </Notice>
    </Screen>
  );
}
