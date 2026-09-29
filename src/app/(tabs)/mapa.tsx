import { useRef, useState } from "react";
import { Linking, Platform, ScrollView, Text, View } from "react-native";
import {
  Button,
  Card,
  Heading,
  Icon,
  Notice,
  Screen,
  Section,
  styles,
} from "../../components/ui";
import CollectionMap from "../../components/CollectionMap";
import { collectionPoints } from "../../data/collectionPoints";
import { useUserLocation } from "../../hooks/useUserLocation";
export default function Points() {
  const [selected, setSelected] = useState("p1");
  const [focus, setFocus] = useState<"community" | "user" | "point">(
    "community",
  );
  const [focusVersion, setVersion] = useState(0);
  const scroll = useRef<ScrollView>(null);
  const [mapY, setMapY] = useState(0);
  const location = useUserLocation();
  const point = collectionPoints.find((p) => p.id === selected)!;
  function select(id: string) {
    setSelected(id);
    setFocus("point");
    setVersion((v) => v + 1);
  }
  return (
    <Screen scrollRef={scroll}>
      <Heading
        eyebrow="CUIDADO QUE CHEGA MAIS LONGE"
        title="Pontos de Coleta"
        subtitle="Conheça o mapa e consulte os detalhes antes de preparar sua entrega."
      />
      <Notice>
        Os pontos são exemplos, sem recebimento real. A referência do Lago do
        Catalão é aproximada; a posição da comunidade, os endereços e os
        contatos precisam de validação local.
      </Notice>
      <View onLayout={(event) => setMapY(event.nativeEvent.layout.y)}>
        <CollectionMap
          selected={selected}
          onSelect={select}
          user={location.coordinate}
          focus={focus}
          focusVersion={focusVersion}
        />
      </View>
      {Platform.OS === "web" && (
        <Notice>
          No navegador, este é um esquema ilustrativo. O mapa geográfico com sua
          posição está disponível no aplicativo pelo Expo Go.
        </Notice>
      )}
      <View style={styles.wrap}>
        <View style={styles.row}>
          <Icon name="account" color="#215EC7" />
          <Text style={styles.caption}>Você</Text>
        </View>
        <View style={styles.row}>
          <Icon name="home-outline" />
          <Text style={styles.caption}>Comunidade</Text>
        </View>
        <View style={styles.row}>
          <Icon name="map-marker" color="#825329" />
          <Text style={styles.caption}>Coleta (exemplo)</Text>
        </View>
      </View>
      <Text style={styles.caption}>
        O mapa geográfico precisa de conexão. A lista de exemplos abaixo está
        disponível mesmo sem o mapa.
      </Text>
      <Notice>{location.message}</Notice>
      {location.coordinate && (
        <Button
          secondary
          title="Ver minha localização"
          onPress={() => {
            setFocus("user");
            setVersion((v) => v + 1);
          }}
        />
      )}
      <Button
        secondary
        title="Ver região do Catalão"
        onPress={() => {
          setFocus("community");
          setVersion((v) => v + 1);
        }}
      />
      <Button
        secondary
        title="Atualizar minha localização"
        loading={location.loading}
        onPress={() => {
          void location.refresh();
        }}
      />
      {!location.canAskAgain && Platform.OS !== "web" && (
        <Button
          secondary
          title="Abrir configurações de localização"
          onPress={() => {
            void Linking.openSettings();
          }}
        />
      )}
      <Section title="Ponto selecionado" />
      <Card>
        <Icon name="map-marker-outline" />
        <Text style={styles.subtitle}>{point.name}</Text>
        <Text style={styles.body}>{point.description}</Text>
        <Text style={styles.body}>Endereço: {point.address}</Text>
        <Text style={styles.body}>{point.phone}</Text>
        <Text style={styles.caption}>{point.hours}</Text>
        <Text style={styles.caption}>
          Materiais do exemplo: {point.materials.join(", ")}
        </Text>
      </Card>
      <Section title="Todos os pontos" />
      {collectionPoints.map((item) => (
        <Card key={item.id}>
          <Text style={styles.subtitle}>{item.name}</Text>
          <Text style={styles.body}>{item.address}</Text>
          <Text style={styles.caption}>{item.phone}</Text>
          <Button
            secondary
            title={`Ver no mapa: ${item.name}`}
            onPress={() => {
              select(item.id);
              scroll.current?.scrollTo({ y: mapY, animated: true });
            }}
          />
        </Card>
      ))}
    </Screen>
  );
}
