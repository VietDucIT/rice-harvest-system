import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { vn2000_to_wgs84 } from "vn2000-converter";

import Loader from "../core/Loader";

import color from "../../config/color";

import getAllRiceField from "../../services/riceField/getAllRiceField";

const FullMap = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldArray, setFieldArray] = useState([]);

  // get all Rice Fields
  const getRiceFieldArray = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getAllRiceField();
      setFieldArray(data);
      // console.log("FullMap - All Rice Fields: ", fieldArray);
      setIsLoading(false);
    } catch (err) {
      console.log("FullMap - Error while getting all Rice Fields.");
    }
  }, []);

  useEffect(() => {
    getRiceFieldArray();
  }, [getRiceFieldArray]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 9.66,
            longitude: 105.86,
            latitudeDelta: 0.05,
            longitudeDelta: 0.04,
          }}
        >
          {fieldArray.map((item, index) => {
            const point1 = vn2000_to_wgs84(
              item.y1,
              item.x1,
              0,
              "VN2000_SOC_TRANG"
            );
            const point2 = vn2000_to_wgs84(
              item.y2,
              item.x2,
              0,
              "VN2000_SOC_TRANG"
            );
            const point3 = vn2000_to_wgs84(
              item.y3,
              item.x3,
              0,
              "VN2000_SOC_TRANG"
            );
            const point4 = vn2000_to_wgs84(
              item.y4,
              item.x4,
              0,
              "VN2000_SOC_TRANG"
            );

            // longitude: kinh độ (W/E), latitude: vĩ độ (N/S)
            const pointList = [
              {
                longitude: Number(point1.x),
                latitude: Number(point1.y),
              },
              {
                longitude: Number(point2.x),
                latitude: Number(point2.y),
              },
              {
                longitude: Number(point3.x),
                latitude: Number(point3.y),
              },
              {
                longitude: Number(point4.x),
                latitude: Number(point4.y),
              },
              {
                longitude: Number(point1.x),
                latitude: Number(point1.y),
              },
            ];
            // console.log("Point List", index, ":", pointList);

            return (
              <Polygon
                key={index}
                coordinates={pointList}
                strokeColor={color.greenColor}
                fillColor={color.lightGreenTransparent}
                // strokeWidth={6}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
};
export default FullMap;

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

//   const fieldArray = [
//     [
//       { latitude: 9.66, longitude: 105.86 },
//       { latitude: 9.661, longitude: 105.86 },
//       { latitude: 9.6612, longitude: 105.861 },
//       { latitude: 9.66, longitude: 105.8612 },
//       { latitude: 9.66, longitude: 105.86 },
//     ],
//     [
//       { latitude: 9.662, longitude: 105.861 },
//       { latitude: 9.6627, longitude: 105.861 },
//       { latitude: 9.6632, longitude: 105.862 },
//       { latitude: 9.662, longitude: 105.8622 },
//       { latitude: 9.662, longitude: 105.861 },
//     ],
//     [
//       { latitude: 9.667, longitude: 105.858 },
//       { latitude: 9.668, longitude: 105.858 },
//       { latitude: 9.668, longitude: 105.859 },
//       { latitude: 9.6674, longitude: 105.86 },
//       { latitude: 9.667, longitude: 105.858 },
//     ],
//     [
//       { latitude: 9.664, longitude: 105.86 },
//       { latitude: 9.6645, longitude: 105.86 },
//       { latitude: 9.6646, longitude: 105.861 },
//       { latitude: 9.6641, longitude: 105.8612 },
//       { latitude: 9.664, longitude: 105.86 },
//     ],
//     [
//       { latitude: 9.665, longitude: 105.865 },
//       { latitude: 9.6655, longitude: 105.865 },
//       { latitude: 9.6656, longitude: 105.8655 },
//       { latitude: 9.6652, longitude: 105.8657 },
//       { latitude: 9.665, longitude: 105.865 },
//     ],
//   ];
