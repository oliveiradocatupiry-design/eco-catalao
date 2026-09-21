import { StyleSheet, View } from "react-native";
import { Icon } from "./ui";
import { colors as c } from "../constants/theme";
export function RiverArt() {
  return (
    <View
      accessibilityLabel="Ilustração conceitual de casas junto ao rio, sem representar um local real"
      style={a.frame}
    >
      <View style={a.sun} />
      <View style={a.houses}>
        <Icon name="tree-outline" size={72} color={c.primary} />
        <Icon name="home-variant-outline" size={76} color={c.ink} />
        <Icon name="home-outline" size={58} color={c.earth} />
      </View>
      <View style={a.river}>
        <Icon name="waves" size={60} color="#6B9AA6" />
        <Icon name="sail-boat" size={42} color={c.riverInk} />
        <Icon name="waves" size={60} color="#6B9AA6" />
      </View>
    </View>
  );
}
const a = StyleSheet.create({
  frame: {
    height: 190,
    backgroundColor: "#EBF0DA",
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  sun: {
    width: 52,
    height: 52,
    borderRadius: 30,
    backgroundColor: "#E9C77E",
    position: "absolute",
    top: 20,
    right: 30,
  },
  houses: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  river: {
    backgroundColor: c.river,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 62,
  },
});
