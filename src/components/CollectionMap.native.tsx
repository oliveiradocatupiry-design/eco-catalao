import { useEffect, useRef } from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  collectionPoints,
  communityCoordinate,
  demoRegion,
} from "../data/collectionPoints";
import { Icon } from "./ui";
import type { MapProps } from "./SchematicMap";
export default function CollectionMap({
  selected,
  onSelect,
  user,
  focus,
  focusVersion,
}: MapProps) {
  const map = useRef<MapView>(null);
  useEffect(() => {
    const coordinate =
      focus === "user" && user
        ? user
        : focus === "point"
          ? collectionPoints.find((p) => p.id === selected)?.coordinate
          : communityCoordinate;
    if (coordinate)
      map.current?.animateToRegion({ ...demoRegion, ...coordinate }, 450);
  }, [selected, user, focus, focusVersion]);
  return (
    <View style={{ height: 320, borderRadius: 22, overflow: "hidden" }}>
      <MapView
        ref={map}
        accessibilityLabel="Mapa do Lago do Catalão com pontos demonstrativos"
        style={{ flex: 1 }}
        initialRegion={demoRegion}
        mapType="standard"
        toolbarEnabled={false}
      >
        <Marker
          coordinate={communityCoordinate}
          title="Comunidade do Catalão — referência aproximada"
          description="Referência do lago. Posição exata da comunidade a validar."
        >
          <View
            style={{ padding: 8, backgroundColor: "#0C5B4C", borderRadius: 12 }}
          >
            <Icon name="home-outline" color="#FFFFFF" />
          </View>
        </Marker>
        {user && (
          <Marker coordinate={user} title="Você está aqui">
            <View
              style={{
                padding: 8,
                backgroundColor: "#215EC7",
                borderRadius: 30,
                borderWidth: 3,
                borderColor: "white",
              }}
            >
              <Icon name="account" color="#FFFFFF" size={20} />
            </View>
          </Marker>
        )}
        {collectionPoints.map((point) => (
          <Marker
            key={point.id}
            coordinate={point.coordinate}
            title={point.name}
            description="Ponto fictício de demonstração"
            pinColor={selected === point.id ? "#825329" : "#C78B31"}
            onPress={() => onSelect(point.id)}
          />
        ))}
      </MapView>
    </View>
  );
}
