import MapView, { Marker } from "react-native-maps";
import { collectionPoints, demoRegion } from "../data/collectionPoints";
import SchematicMap, { type MapProps } from "./SchematicMap";
export default function CollectionMap(props: MapProps) {
  if (!props.native) return <SchematicMap {...props} />;
  return (
    <MapView
      accessibilityLabel="Mapa de coordenadas fictícias, não representa a comunidade"
      style={{ height: 250, borderRadius: 24 }}
      initialRegion={demoRegion}
      region={{
        ...demoRegion,
        ...collectionPoints.find((point) => point.id === props.selected)
          ?.coordinate,
      }}
      showsUserLocation={false}
      showsMyLocationButton={false}
      mapType="none"
      toolbarEnabled={false}
    >
      {collectionPoints.map((point) => (
        <Marker
          key={point.id}
          coordinate={point.coordinate}
          title={point.name}
          description="Coordenada fictícia. Não é um local de entrega."
          pinColor={props.selected === point.id ? "#246348" : "#825329"}
          onPress={() => props.onSelect(point.id)}
        />
      ))}
    </MapView>
  );
}
