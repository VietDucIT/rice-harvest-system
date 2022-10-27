import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";

import color from "../../config/color";

const Map = ({ cordinate, ...props }) => {
  // const x1 = props.x1;
  // const y1 = props.y1;
  // const x2 = props.x2;
  // const y2 = props.y2;
  // const x3 = props.x3;
  // const y3 = props.y3;
  // const x4 = props.x4;
  // const y4 = props.y4;
  const { x1, y1, x2, y2, x3, y3, x4, y4 } = cordinate;

  const pointList = [
    { latitude: x1, longitude: y1 },
    { latitude: x2, longitude: y2 },
    { latitude: x3, longitude: y3 },
    { latitude: x4, longitude: y4 },
    { latitude: x1, longitude: y1 },
    // { latitude: 9.66, longitude: 105.86 },
    // { latitude: 9.66, longitude: 105.87 },
    // { latitude: 9.67, longitude: 105.87 },
    // { latitude: 9.666, longitude: 105.86 },
    // { latitude: 9.66, longitude: 105.86 },
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
