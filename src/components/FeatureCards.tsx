import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import { Card, Icon, styles, type IconName } from "./ui";
import { colors as c } from "../constants/theme";
import { number } from "../services/marketService";
import type { EducationalContent, MarketEntry } from "../types";
import { getMaterial, unitLabel } from "../data/materials";
import { MaterialArt } from "./MaterialArt";
export function CatsBalance({
  pending,
  confirmed,
}: {
  pending: number;
  confirmed: number;
}) {
  return (
    <Card tone={c.night}>
      <View style={styles.row}>
        <Icon name="wallet-outline" color={c.lime} />
        <Text style={[styles.subtitle, { color: c.white, flexShrink: 1 }]}>
          Minha carteira CATS
        </Text>
      </View>
      <View style={styles.row}>
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={[styles.caption, { color: "#CAD8CE" }]}>Estimados</Text>
          <Text style={{ color: c.lime, fontSize: 32, fontWeight: "800" }}>
            {number(pending)}
          </Text>
          <Text style={[styles.caption, { color: "#CAD8CE" }]}>
            Aguardando entrega
          </Text>
        </View>
        <View style={{ width: 1, height: 65, backgroundColor: "#486358" }} />
        <View style={{ flex: 1, gap: 4 }}>
          <Text style={[styles.caption, { color: "#CAD8CE" }]}>
            Confirmados
          </Text>
          <Text style={{ color: c.white, fontSize: 32, fontWeight: "800" }}>
            {number(confirmed)}
          </Text>
          <Text style={[styles.caption, { color: "#CAD8CE" }]}>
            Saldo de exemplo
          </Text>
        </View>
      </View>
    </Card>
  );
}
export function EducationalCard({ item }: { item: EducationalContent }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ler: ${item.title}`}
      onPress={() =>
        router.push({ pathname: "/conteudo/[id]", params: { id: item.id } })
      }
    >
      <Card>
        <View style={styles.row}>
          <View
            style={{
              backgroundColor: item.color,
              borderRadius: 16,
              padding: 14,
            }}
          >
            <Icon name={item.icon as IconName} size={28} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.caption}>
              {item.category} · {item.minutes} min de leitura
            </Text>
            <Text style={styles.subtitle}>{item.title}</Text>
          </View>
          <Icon name="arrow-top-right" size={20} />
        </View>
        <Text style={styles.body}>{item.summary}</Text>
      </Card>
    </Pressable>
  );
}
export function EntryCard({
  entry,
  onRemove,
}: {
  entry: MarketEntry;
  onRemove?: () => void;
}) {
  const material = getMaterial(entry.materialId);
  if (!material) return null;
  return (
    <Card>
      <View style={styles.row}>
        <MaterialArt material={material} small />
        <View style={{ flex: 1 }}>
          <Text style={styles.subtitle}>{material.nome}</Text>
          <Text style={styles.body}>
            {number(entry.quantity)}{" "}
            {unitLabel(material.unidadeDeMedida, entry.quantity)}
          </Text>
        </View>
      </View>
      <View style={styles.rowBetween}>
        <Text style={{ color: c.primary, fontWeight: "800", fontSize: 18 }}>
          +{number(entry.cats)} CATS
          {entry.status === "pending" ? " estimados" : ""}
        </Text>
      </View>
      <View style={styles.rowBetween}>
        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                entry.status === "pending" ? c.sand : c.primarySoft,
            },
          ]}
        >
          <Text style={[styles.caption, { color: c.ink }]}>
            {entry.status === "pending"
              ? "◷ Aguardando entrega"
              : "✓ Confirmado · exemplo"}
          </Text>
        </View>
        {entry.status === "pending" && onRemove && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Remover registro de ${material.nome}`}
            onPress={onRemove}
            style={{ padding: 12 }}
          >
            <Icon name="trash-can-outline" size={22} color={c.muted} />
          </Pressable>
        )}
      </View>
    </Card>
  );
}
