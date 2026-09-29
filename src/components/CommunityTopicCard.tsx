import { Text, View } from "react-native";
import { Card, Icon, styles, type IconName } from "./ui";

export function CommunityTopicCard({
  icon,
  title,
  text,
  tone,
}: {
  icon: IconName;
  title: string;
  text: string;
  tone: string;
}) {
  return (
    <Card tone={tone} style={{ flex: 1, minWidth: 145 }}>
      <View style={styles.row}>
        <Icon name={icon} size={28} />
        <Text style={[styles.subtitle, { flex: 1, fontSize: 17 }]}>
          {title}
        </Text>
      </View>
      <Text style={styles.caption}>{text}</Text>
    </Card>
  );
}
