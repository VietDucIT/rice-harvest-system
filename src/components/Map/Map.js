import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";

import color from "../../config/color";

const Map = ({ coordinate, ...props }) => {
  // const x1 = props.x1;
  // const y1 = props.y1;
  // const x2 = props.x2;
  // const y2 = props.y2;
  // const x3 = props.x3;
  // const y3 = props.y3;
  // const x4 = props.x4;
  // const y4 = props.y4;
  let x1, y1, x2, y2, x3, y3, x4, y4;
  if (coordinate) {
    x1 = coordinate.x1;
    y1 = coordinate.y1;
    x2 = coordinate.x2;
    y2 = coordinate.y2;
    x3 = coordinate.x3;
    y3 = coordinate.y3;
    x4 = coordinate.x4;
    y4 = coordinate.y4;
  } else {
    x1 = 9.66;
    y1 = 105.86;
    x2 = 9.66;
    y2 = 105.865;
    x3 = 9.665;
    y3 = 105.865;
    x4 = 9.666;
    y4 = 105.86;
  }

  const pointList = [
    { latitude: x1, longitude: y1 },
    { latitude: x2, longitude: y2 },
    { latitude: x3, longitude: y3 },
    { latitude: x4, longitude: y4 },
    { latitude: x1, longitude: y1 },
  ];
  const pointList2 = [
    { latitude: 9.65, longitude: 105.855 },
    { latitude: 9.651, longitude: 105.86 },
    { latitude: 9.655, longitude: 105.862 },
    { latitude: 9.655, longitude: 105.855 },
    { latitude: 9.65, longitude: 105.855 },
  ];
  const pointList3 = [
    { latitude: 9.655, longitude: 105.855 },
    { latitude: 9.6551, longitude: 105.861 },
    { latitude: 9.66, longitude: 105.86 },
    { latitude: 9.66, longitude: 105.855 },
    { latitude: 9.655, longitude: 105.855 },
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
        {/* <Polygon
          coordinates={pointList2}
          strokeColor={color.blueColor}
          fillColor={color.lightBlueTransparent}
          // strokeWidth={6}
        />
        <Polygon
          coordinates={pointList3}
          strokeColor={color.blueColor}
          fillColor={color.lightBlueTransparent}
          // strokeWidth={6}
        /> */}
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
