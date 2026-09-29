import { Text, View } from "react-native";
import { colors as c } from "../constants/theme";
import { Card, Icon, styles, type IconName } from "./ui";

export function HomeStepCard({
  icon,
  title,
  text,
}: {
  icon: IconName;
  title: string;
  text: string;
}) {
  return (
    <Card style={{ flex: 1, minWidth: 0, padding: 12 }}>
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 13,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: c.primarySoft,
        }}
      >
        <Icon name={icon} size={21} />
      </View>
      <Text style={[styles.subtitle, { fontSize: 13, lineHeight: 18 }]}>
        {title}
      </Text>
      <Text style={[styles.caption, { fontSize: 12 }]}>{text}</Text>
    </Card>
  );
}
