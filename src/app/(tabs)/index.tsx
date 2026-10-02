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
import { RiverArt } from "../../components/RiverArt";
import { CommunityTopicCard } from "../../components/CommunityTopicCard";
import { HomeStepCard } from "../../components/HomeStepCard";
import { communityTopics } from "../../data/community";
import { useApp } from "../../context/AppContext";
import { colors } from "../../constants/theme";
export default function Home() {
  const { entries } = useApp();
  return (
    <Screen>
      <View style={[styles.row, { paddingBottom: 16 }]}>
        <View
          accessibilityLabel="Símbolo EcoCatalão"
          style={{
            width: 30,
            height: 30,
            borderRadius: 10,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Georgia",
              fontStyle: "italic",
              fontWeight: "800",
              fontSize: 25,
              color: colors.lime,
              lineHeight: 30,
            }}
          >
            e
          </Text>
        </View>
        <Text style={[styles.subtitle, { fontSize: 20 }]}>EcoCatalão</Text>
      </View>
      <Heading
        eyebrow="COMUNIDADE FLUTUANTE LAGO DO CATALÃO"
        title="Cuidar do rio começa em casa."
        subtitle="Registre resíduos, descubra onde entregar e aprenda a reaproveitar."
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Registrar resíduo"
        onPress={() => router.navigate("/registro")}
        style={[
          styles.row,
          {
            padding: 18,
            borderRadius: 22,
            backgroundColor: colors.primary,
            minHeight: 80,
          },
        ]}
      >
        <View
          style={{
            padding: 10,
            borderRadius: 14,
            backgroundColor: colors.lime,
          }}
        >
          <Icon name="camera-outline" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.buttonText, { textAlign: "left" }]}>
            Registrar resíduo
          </Text>
          <Text style={[styles.caption, { color: "#E0EEE8" }]}>
            Use a câmera ou uma foto da galeria
          </Text>
        </View>
        <Icon name="arrow-right" color="white" />
      </Pressable>
      <Section
        title="Por onde começar?"
        action="Ver tudo"
        onPress={() => router.navigate("/aprender")}
      />
      <View style={[styles.row, { alignItems: "stretch", gap: 8 }]}>
        <HomeStepCard
          icon="recycle"
          title="Separe"
          text="Não misture recicláveis com restos de comida."
        />
        <HomeStepCard
          icon="water-outline"
          title="Limpe"
          text="Retire resíduos e evite desperdício de água."
        />
        <HomeStepCard
          icon="restore"
          title="Reaproveite"
          text="Pense em uma nova utilidade antes de descartar."
        />
      </View>
      <Card tone={colors.primarySoft}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.eyebrow}>SEUS REGISTROS</Text>
            <Text style={styles.subtitle}>
              {entries.length}{" "}
              <Text style={styles.body}>
                {entries.length === 1
                  ? "registro no histórico"
                  : "registros no histórico"}
              </Text>
            </Text>
          </View>
          <Icon name="waves" color={colors.riverInk} />
        </View>
      </Card>
      <Section title="Nosso lugar, nosso cuidado" />
      <RiverArt />
      <Text style={styles.caption}>Ilustração do cotidiano ribeirinho.</Text>
      <Text style={styles.body}>
        Entre casas flutuantes e caminhos pelo rio, o Lago do Catalão é lugar de
        vida. O EcoCatalão apoia o morador na separação dos resíduos e no
        cuidado com o território compartilhado.
      </Text>
      <View style={styles.wrap}>
        {communityTopics.map((topic) => (
          <CommunityTopicCard key={topic.title} {...topic} />
        ))}
      </View>
      <Button
        secondary
        title="Ver pontos de coleta"
        icon="map-marker-outline"
        onPress={() => router.navigate("/mapa")}
      />
      <Button
        secondary
        title="Aprender sobre reciclagem"
        icon="recycle"
        onPress={() => router.navigate("/aprender")}
      />
    </Screen>
  );
}
