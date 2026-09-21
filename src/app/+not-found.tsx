import { router } from "expo-router";
import { EmptyState, Screen } from "../components/ui";
export default function NotFound() {
  return (
    <Screen>
      <EmptyState
        title="Esse caminho não foi encontrado"
        text="Volte ao início para continuar explorando o EcoCatalão."
        action="Voltar ao início"
        onPress={() => router.replace("/")}
      />
    </Screen>
  );
}
