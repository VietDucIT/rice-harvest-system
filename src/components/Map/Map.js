import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { vn2000_to_wgs84 } from "vn2000-converter";

import color from "../../config/color";

import provinceVN2000 from "../../json/provinceVN2000";

const Map = ({ coordinate, ...props }) => {
  const { x: x1, y: y1 } = vn2000_to_wgs84(
    coordinate.x1,
    coordinate.y1,
    0,
    "VN2000_SOC_TRANG"
  );
  const { x: x2, y: y2 } = vn2000_to_wgs84(
    coordinate.x2,
    coordinate.y2,
    0,
    "VN2000_SOC_TRANG"
  );
  const { x: x3, y: y3 } = vn2000_to_wgs84(
    coordinate.x3,
    coordinate.y3,
    0,
    "VN2000_SOC_TRANG"
  );
  const { x: x4, y: y4 } = vn2000_to_wgs84(
    coordinate.x4,
    coordinate.y4,
    0,
    "VN2000_SOC_TRANG"
  );

  const pointList = [
    { latitude: x1, longitude: y1 },
    { latitude: x2, longitude: y2 },
    { latitude: x3, longitude: y3 },
    { latitude: x4, longitude: y4 },
    { latitude: x1, longitude: y1 },
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

// import React from "react";
// import { StyleSheet, View } from "react-native";
// import { LatLng, LeafletView } from "react-native-leaflet-view";

// import color from "../../config/color";
// const coordinate = {
//   lat: 37.78825,
//   lng: -122.4324,
// };
// const Map = () => {
//   return (
//     <View style={styles.container}>
//       <LeafletView
//         mapMarkers={[
//           {
//             position: {
//               lat: 37.78825,
//               lng: -122.4324,
//             },
//             icon: "📍",
//             size: [32, 32],
//           },
//         ]}
//         mapCenterPosition={{
//           lat: 37.78825,
//           lng: -122.4324,
//         }}
//       />
//     </View>
//   );
// };
// export default Map;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "flex-end",
//     alignItems: "center",
//   },
// });
