import React from "react";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { vn2000_to_wgs84 } from "vn2000-converter";

import color from "../../config/color";

import provinceVN2000 from "../../json/provinceVN2000";

const Map = ({ fieldData, ...props }) => {
  console.log("Map - Field Data: ", fieldData);

  // let x = vn2000_to_wgs84(
  //   fieldData.x1,
  //   fieldData.y1,
  //   17.94,
  //   "VN2000_SOC_TRANG"
  // );
  // console.log("Map - Hehe: ", Number(x.y) + 4.8);
  const point1 = vn2000_to_wgs84(
    fieldData.x1,
    fieldData.y1,
    0,
    "VN2000_SOC_TRANG"
  );
  const point2 = vn2000_to_wgs84(
    fieldData.x2,
    fieldData.y2,
    0,
    "VN2000_SOC_TRANG"
  );
  const point3 = vn2000_to_wgs84(
    fieldData.x3,
    fieldData.y3,
    0,
    "VN2000_SOC_TRANG"
  );
  const point4 = vn2000_to_wgs84(
    fieldData.x4,
    fieldData.y4,
    0,
    "VN2000_SOC_TRANG"
  );
  let pointList;

  if (point1 && point2 && point3 && point4) {
    console.log("Map - Point 1: ", point1);
    console.log("Map - Point 2: ", point2);
    console.log("Map - Point 3: ", point3);
    console.log("Map - Point 4: ", point4);
    pointList = [
      { latitude: Number(point1.x) - 4.8, longitude: Number(point1.y) + 4.8 },
      { latitude: Number(point2.x) - 4.8, longitude: Number(point2.y) + 4.8 },
      { latitude: Number(point3.x) - 4.8, longitude: Number(point3.y) + 4.8 },
      { latitude: Number(point4.x) - 4.8, longitude: Number(point4.y) + 4.8 },
      { latitude: Number(point1.x) - 4.8, longitude: Number(point1.y) + 4.8 },
    ];
    console.log(pointList);
  } else {
    console.log("Map - Not found");
  }

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
        {pointList && (
          <Polygon
            coordinates={pointList}
            strokeColor={color.redColor}
            fillColor={color.lightRedTransparent}
            // strokeWidth={6}
          />
        )}
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
