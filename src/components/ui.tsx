import type { ComponentProps, PropsWithChildren } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ColorValue,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  colors as c,
  radius as r,
  space as s,
  type as t,
} from "../constants/theme";
export type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"];
export function Icon({
  name,
  size = 24,
  color = c.primary,
}: {
  name: IconName;
  size?: number;
  color?: ColorValue;
}) {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      accessible={false}
    />
  );
}
export function Screen({
  children,
  scrollRef,
}: PropsWithChildren<{ scrollRef?: React.Ref<ScrollView> }>) {
  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.screen}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export function Heading({
  title,
  subtitle,
  eyebrow,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}) {
  return (
    <View style={styles.heading}>
      {eyebrow && <Text style={styles.eyebrow}>{eyebrow}</Text>}
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      {subtitle && <Text style={styles.body}>{subtitle}</Text>}
    </View>
  );
}
export function Card({
  children,
  tone = c.surface,
  style,
}: PropsWithChildren<{ tone?: string; style?: ViewStyle }>) {
  return (
    <View style={[styles.card, { backgroundColor: tone }, style]}>
      {children}
    </View>
  );
}
export function Button({
  title,
  onPress,
  secondary,
  icon,
  disabled,
  loading,
}: {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        (disabled || loading) && { opacity: 0.55 },
        pressed && { opacity: 0.8 },
      ]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? c.primary : c.white} />
      ) : (
        icon && <Icon name={icon} color={secondary ? c.primary : c.white} />
      )}
      <Text style={[styles.buttonText, secondary && { color: c.primary }]}>
        {title}
      </Text>
    </Pressable>
  );
}
export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole={onPress ? "button" : "text"}
      accessibilityState={{ selected }}
      onPress={onPress}
      disabled={!onPress}
      style={[styles.chip, selected && { backgroundColor: c.primary }]}
    >
      <Text style={[styles.caption, selected && { color: c.white }]}>
        {label}
      </Text>
    </Pressable>
  );
}
export function Notice({
  children,
  error,
  success,
}: PropsWithChildren<{ error?: boolean; success?: boolean }>) {
  return (
    <View
      accessibilityLiveRegion="polite"
      style={[
        styles.notice,
        {
          backgroundColor: error
            ? c.dangerSoft
            : success
              ? c.primarySoft
              : c.sand,
        },
      ]}
    >
      <Icon
        name={
          error
            ? "alert-circle-outline"
            : success
              ? "check-circle-outline"
              : "information-outline"
        }
        color={error ? c.danger : c.ink}
        size={20}
      />
      <Text
        style={[styles.caption, { flex: 1, color: error ? c.danger : c.ink }]}
      >
        {children}
      </Text>
    </View>
  );
}
export function Section({
  title,
  action,
  onPress,
}: {
  title: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <View style={styles.rowBetween}>
      <Text accessibilityRole="header" style={[styles.subtitle, { flex: 1 }]}>
        {title}
      </Text>
      {action && (
        <Pressable
          onPress={onPress}
          accessibilityRole="button"
          style={{ paddingVertical: s.md }}
        >
          <Text style={styles.link}>{action}</Text>
        </Pressable>
      )}
    </View>
  );
}
export function EmptyState({
  title,
  text,
  action,
  onPress,
}: {
  title: string;
  text: string;
  action?: string;
  onPress?: () => void;
}) {
  return (
    <Card>
      <Icon name="sprout-outline" size={40} />
      <Text style={styles.subtitle}>{title}</Text>
      <Text style={styles.body}>{text}</Text>
      {action && onPress && <Button title={action} onPress={onPress} />}
    </Card>
  );
}
export const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: c.background },
  screen: {
    padding: 20,
    paddingBottom: 120,
    gap: s.lg,
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
  },
  heading: { gap: s.sm, paddingVertical: s.sm },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 1,
    fontWeight: "700",
    color: c.primary,
  },
  title: {
    fontSize: t.title,
    lineHeight: 36,
    fontWeight: "700",
    color: c.ink,
    letterSpacing: -0.7,
  },
  subtitle: {
    fontSize: t.subtitle,
    lineHeight: 27,
    fontWeight: "700",
    color: c.ink,
  },
  body: { fontSize: t.body, lineHeight: 25, color: c.muted },
  caption: { fontSize: t.caption, lineHeight: 20, color: c.muted },
  card: {
    borderRadius: r.md,
    padding: s.lg,
    gap: s.md,
    borderWidth: 1,
    borderColor: c.line,
  },
  button: {
    minHeight: 54,
    paddingHorizontal: s.lg,
    paddingVertical: s.md,
    borderRadius: r.sm,
    backgroundColor: c.primary,
    flexDirection: "row",
    gap: s.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  secondary: {
    backgroundColor: c.primarySoft,
    borderWidth: 1,
    borderColor: "#B9D0BA",
  },
  buttonText: {
    fontSize: t.body,
    fontWeight: "700",
    color: c.white,
    flexShrink: 1,
    textAlign: "center",
  },
  row: { flexDirection: "row", alignItems: "center", gap: s.md },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: s.sm,
  },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: s.sm },
  link: { color: c.primary, fontSize: t.caption, fontWeight: "700" },
  chip: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: s.md,
    paddingVertical: s.sm,
    borderRadius: r.pill,
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: c.line,
  },
  notice: {
    padding: s.md,
    borderRadius: r.sm,
    flexDirection: "row",
    gap: s.sm,
    alignItems: "flex-start",
  },
  input: {
    backgroundColor: c.surface,
    borderWidth: 1,
    borderColor: "#A9BCAF",
    borderRadius: r.sm,
    padding: s.lg,
    fontSize: 18,
    color: c.ink,
    minHeight: 56,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: r.pill,
    backgroundColor: c.primarySoft,
    paddingHorizontal: s.md,
    paddingVertical: s.xs,
  },
});
