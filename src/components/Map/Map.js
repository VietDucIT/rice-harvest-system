import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polyline } from "react-native-maps";

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
        <Polyline
          coordinates={pointList}
          strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={[
            "#7F0000",
            "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
            "#B24112",
            "#E5845C",
            "#238C23",
            "#7F0000",
          ]}
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
