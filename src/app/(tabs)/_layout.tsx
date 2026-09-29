import { Tabs } from "expo-router/js-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Icon } from "../../components/ui";
import { colors as c } from "../../constants/theme";
export default function TabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.muted,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 8),
          backgroundColor: c.surface,
          borderTopWidth: 1,
          borderTopColor: c.line,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Comunidade",
          tabBarAccessibilityLabel: "Comunidade do Catalão",
          tabBarIcon: ({ color }) => <Icon name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="registro"
        options={{
          title: "Registro",
          tabBarAccessibilityLabel: "Registro de Resíduo",
          tabBarIcon: ({ color }) => (
            <Icon name="camera-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: "Pontos de Coleta",
          tabBarIcon: ({ color }) => (
            <Icon name="map-marker-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="aprender"
        options={{
          title: "Reciclagem",
          tabBarIcon: ({ color }) => <Icon name="recycle" color={color} />,
        }}
      />
      <Tabs.Screen name="camera" options={{ href: null }} />
      <Tabs.Screen name="carteira" options={{ href: null }} />
      <Tabs.Screen name="mercado" options={{ href: null }} />
    </Tabs>
  );
}
