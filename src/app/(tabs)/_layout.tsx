import { View } from "react-native";
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
        tabBarActiveTintColor: c.lime,
        tabBarInactiveTintColor: "#C6D6CF",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          bottom: Math.max(insets.bottom, 12),
          marginHorizontal: 12,
          height: 76,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 26,
          backgroundColor: c.night,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <Icon name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="mercado"
        options={{
          title: "Mercado",
          tabBarAccessibilityLabel: "Mercado Verde",
          tabBarIcon: ({ color }) => (
            <Icon name="basket-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "Câmera",
          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: c.lime,
                width: 48,
                height: 48,
                borderRadius: 24,
                justifyContent: "center",
                alignItems: "center",
                marginTop: -14,
              }}
            >
              <Icon name="camera-outline" color={c.night} size={28} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="aprender"
        options={{
          title: "Aprender",
          tabBarIcon: ({ color }) => (
            <Icon name="book-open-page-variant-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mapa"
        options={{
          title: "Mapa",
          tabBarIcon: ({ color }) => (
            <Icon name="map-marker-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
