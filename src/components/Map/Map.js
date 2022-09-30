import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";

import color from "../../config/color";

const Map = () => {
  const pointList = [
    { latitude: 9.66, longitude: 105.86 },
    { latitude: 9.66, longitude: 105.87 },
    { latitude: 9.67, longitude: 105.87 },
    { latitude: 9.666, longitude: 105.86 },
    { latitude: 9.66, longitude: 105.86 },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 9.66,
          longitude: 105.86,
          latitudeDelta: 0.05,
          longitudeDelta: 0.04,
        }}
      >
        <Polygon
          coordinates={pointList}
          strokeColor={color.redColor}
          fillColor={color.lightRedTransparent}
          // strokeWidth={6}
        />
      </MapView>
    </View>
  );
};
export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
