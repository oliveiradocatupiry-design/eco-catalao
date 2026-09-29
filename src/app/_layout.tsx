import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AppProvider } from "../context/AppContext";
import { colors } from "../constants/theme";
export default function RootLayout() {
  return (
    <AppProvider>
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
        <Stack.Screen
          name="tipo/[id]"
          options={{ title: "Tipos de resíduos" }}
        />
        <Stack.Screen
          name="subtipo/[id]"
          options={{ title: "Conheça o material" }}
        />
        <Stack.Screen
          name="reutilizacao/[id]"
          options={{ title: "Ideias de reutilização" }}
        />
        <Stack.Screen name="conteudo/[id]" options={{ title: "Reciclagem" }} />
      </Stack>
    </AppProvider>
  );
}
