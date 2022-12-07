import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polygon, Marker } from "react-native-maps";
import { vn2000_to_wgs84 } from "vn2000-converter";

import color from "../../config/color";

const Map = ({ fieldData, ...props }) => {
  // ( 9.66 ; 105.86 ) <=> ( 1068274.57	; 539311.12 )
  // ( 9.66	; 105.865 ) <=> ( 1068275.16 ;	539859.84 )
  // ( 9.665 ;	105.865 ) <=> ( 1068828.14 ;	539859.24 )
  // ( 9.666 ;	105.86 ) <=> ( 1068938.15 ;	539310.42 )

  console.log("Map - Field Data: ", fieldData);
  const point1 = vn2000_to_wgs84(
    fieldData.y1,
    fieldData.x1,
    0,
    "VN2000_SOC_TRANG"
  );
  const point2 = vn2000_to_wgs84(
    fieldData.y2,
    fieldData.x2,
    0,
    "VN2000_SOC_TRANG"
  );
  const point3 = vn2000_to_wgs84(
    fieldData.y3,
    fieldData.x3,
    0,
    "VN2000_SOC_TRANG"
  );
  const point4 = vn2000_to_wgs84(
    fieldData.y4,
    fieldData.x4,
    0,
    "VN2000_SOC_TRANG"
  );
  let pointList;

  if (point1 && point2 && point3 && point4) {
    // console.log("Map - Point 1: ", point1);
    // console.log("Map - Point 2: ", point2);
    // console.log("Map - Point 3: ", point3);
    // console.log("Map - Point 4: ", point4);

    // longitude: kinh độ (W/E), latitude: vĩ độ (N/S)
    pointList = [
      { longitude: Number(point1.x), latitude: Number(point1.y) },
      { longitude: Number(point2.x), latitude: Number(point2.y) },
      { longitude: Number(point3.x), latitude: Number(point3.y) },
      { longitude: Number(point4.x), latitude: Number(point4.y) },
      { longitude: Number(point1.x), latitude: Number(point1.y) },
    ];
    // console.log(pointList);
  } else {
    console.log("Map - Can't convert VN2000 to WGS-84");
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

        {/* <Marker
          coordinate={{ latitude: 9.65, longitude: 105.853 }}
          title={"Kênh Cầu Tre"}
          description={"description"}
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
