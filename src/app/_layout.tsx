import { FlowPrivacy } from "../components/FlowPrivacy";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "../context/AppContext";
import { colors } from "../constants/theme";
export default function RootLayout() {
  return (
    <AppProvider>
      <FlowPrivacy />
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.ink,
          headerShadowVisible: false,
          headerBackTitle: "Voltar",
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="resultado" options={{ title: "Seu material" }} />
        <Stack.Screen
          name="corrigir"
          options={{ title: "Corrigir identificação" }}
        />
        <Stack.Screen
          name="adicionar"
          options={{ title: "Adicionar material" }}
        />
        <Stack.Screen
          name="carteira"
          options={{ title: "Minha carteira CATS" }}
        />
        <Stack.Screen name="conteudo/[id]" options={{ title: "Aprender" }} />
        <Stack.Screen
          name="comunidade"
          options={{ title: "Comunidade do Catalão" }}
        />
      </Stack>
    </AppProvider>
  );
}
