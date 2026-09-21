import { Pressable, Text, View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Card,
  Heading,
  Icon,
  Screen,
  Section,
  styles,
} from "../../components/ui";
import { CatsBalance, EducationalCard } from "../../components/FeatureCards";
import { RiverArt } from "../../components/RiverArt";
import { useApp } from "../../context/AppContext";
import { educationalContent } from "../../data/educationalContent";
import { colors as c } from "../../constants/theme";
export default function Home() {
  const { totals, entries, clearFlow } = useApp();
  return (
    <Screen>
      <View style={styles.rowBetween}>
        <View style={styles.row}>
          <View
            style={{
              backgroundColor: c.primarySoft,
              borderRadius: 16,
              padding: 8,
            }}
          >
            <Icon name="sprout" size={24} />
          </View>
          <Text style={[styles.subtitle, { fontSize: 22 }]}>EcoCatalão</Text>
        </View>
        <View style={[styles.badge, { paddingHorizontal: 8 }]}>
          <Text style={[styles.caption, { fontSize: 11 }]}>PROTÓTIPO</Text>
        </View>
      </View>
      <Heading
        eyebrow="CUIDAR COMEÇA PERTO"
        title="Olá! Vamos cuidar do nosso lugar?"
        subtitle="Pequenas atitudes, novos caminhos para os materiais."
      />
      <Card
        tone={c.primarySoft}
        style={{ padding: 24, borderRadius: 26, gap: 18 }}
      >
        <View style={styles.rowBetween}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>UM MATERIAL DE CADA VEZ</Text>
          </View>
          <View
            style={{
              backgroundColor: "#F4F8E9",
              padding: 12,
              borderRadius: 50,
              transform: [{ rotate: "-12deg" }],
            }}
          >
            <Icon name="line-scan" size={36} />
          </View>
        </View>
        <Text style={styles.title}>Que material é esse?</Text>
        <Text style={styles.body}>
          Fotografe, descubra como separar e prepare sua próxima entrega.
        </Text>
        <Button
          title="Tirar uma foto"
          icon="camera-outline"
          onPress={() => {
            clearFlow();
            router.navigate("/camera");
          }}
        />
        <Text style={styles.caption}>
          Identificação simulada para demonstração.
        </Text>
      </Card>
      <Section
        title="Seu cuidado tem valor"
        action="Ver carteira →"
        onPress={() => router.push("/carteira")}
      />
      <CatsBalance pending={totals.pending} confirmed={totals.confirmed} />
      <Pressable
        accessibilityRole="button"
        onPress={() => router.navigate("/mercado")}
      >
        <Card>
          <View style={styles.row}>
            <Icon name="basket-outline" size={34} />
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitle}>Mercado Verde</Text>
              <Text style={styles.body}>
                {entries.filter((e) => e.status === "pending").length}{" "}
                registro(s) aguardando entrega
              </Text>
            </View>
            <Icon name="arrow-right" />
          </View>
        </Card>
      </Pressable>
      <Section
        title="Aprender para transformar"
        action="Ver todos →"
        onPress={() => router.navigate("/aprender")}
      />
      <EducationalCard item={educationalContent[0]} />
      <Pressable
        accessibilityRole="button"
        onPress={() => router.navigate("/mapa")}
      >
        <Card tone={c.river}>
          <View style={styles.row}>
            <Icon
              name="map-marker-radius-outline"
              color={c.riverInk}
              size={34}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.subtitle}>Onde entregar?</Text>
              <Text style={styles.body}>Explore os pontos demonstrativos.</Text>
            </View>
            <Icon name="arrow-right" color={c.riverInk} />
          </View>
        </Card>
      </Pressable>
      <Section title="Feito para o nosso território" />
      <RiverArt />
      <Text style={styles.subtitle}>Comunidade do Catalão</Text>
      <Text style={styles.body}>
        O rio, as pessoas e o cuidado com o lugar onde a vida acontece.
      </Text>
      <Button
        secondary
        title="Conhecer a comunidade"
        icon="home-group"
        onPress={() => router.push("/comunidade")}
      />
    </Screen>
  );
}
