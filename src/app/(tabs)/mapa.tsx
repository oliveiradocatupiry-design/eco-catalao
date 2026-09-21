import { useState } from "react";
import { Platform, Text, View } from "react-native";
import { router } from "expo-router";
import {
  Button,
  Card,
  Chip,
  Heading,
  Icon,
  Notice,
  Screen,
  styles,
} from "../../components/ui";
import CollectionMap from "../../components/CollectionMap";
import { collectionPoints } from "../../data/collectionPoints";
export default function MapScreen() {
  const [selected, setSelected] = useState(collectionPoints[0].id);
  const [native, setNative] = useState(false);
  const point = collectionPoints.find((item) => item.id === selected)!;
  return (
    <Screen>
      <Heading
        eyebrow="CONECTAR MATERIAIS E DESTINOS"
        title="Pontos de coleta"
        subtitle="Explore como será encontrar um lugar para entregar seus materiais."
      />
      <Notice>
        Locais fictícios. Não use este mapa para se deslocar. A localização real
        da comunidade e dos pontos ainda será validada.
      </Notice>
      <CollectionMap
        selected={selected}
        onSelect={setSelected}
        native={native}
      />
      {Platform.OS !== "web" && (
        <Button
          secondary
          title={
            native
              ? "Usar mapa ilustrativo offline"
              : "Experimentar mapa nativo"
          }
          icon="map-outline"
          onPress={() => setNative(!native)}
        />
      )}
      <View style={styles.wrap}>
        {collectionPoints.map((item, index) => (
          <Chip
            key={item.id}
            label={`Ponto ${index + 1}`}
            selected={selected === item.id}
            onPress={() => setSelected(item.id)}
          />
        ))}
      </View>
      <Card>
        <Icon name="map-marker-radius-outline" size={32} />
        <Text style={styles.subtitle}>{point.name}</Text>
        <Text style={styles.caption}>{point.type}</Text>
        <Text style={styles.body}>{point.address}</Text>
        <Text style={styles.body}>{point.hours}</Text>
        <Text style={styles.subtitle}>Materiais aceitos no exemplo</Text>
        <View style={styles.wrap}>
          {point.materials.map((material) => (
            <Chip key={material} label={material} />
          ))}
        </View>
      </Card>
      <Button
        secondary
        title="Sobre a Comunidade do Catalão"
        icon="home-group"
        onPress={() => router.push("/comunidade")}
      />
    </Screen>
  );
}
