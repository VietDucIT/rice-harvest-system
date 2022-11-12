import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Polygon } from "react-native-maps";
import { vn2000_to_wgs84 } from "vn2000-converter";

import Loader from "../core/Loader";

import color from "../../config/color";

import provinceVN2000 from "../../json/provinceVN2000";

import getAllRiceField from "../../services/riceField/getAllRiceField";

const FullMap = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  let fieldArray = [];

  // get all Rice Field
  const getRiceFieldArray = useCallback(async () => {
    try {
      setIsLoading(true);
      fieldArray = await getAllRiceField();
      console.log("FullMap - All Rice Fields: ", fieldArray);
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
          {fieldArray.map(async (item, index) => {
            const point1 = vn2000_to_wgs84(
              item.x1,
              item.y1,
              0,
              "VN2000_SOC_TRANG"
            );
            const point2 = vn2000_to_wgs84(
              item.x2,
              item.y2,
              0,
              "VN2000_SOC_TRANG"
            );
            const point3 = vn2000_to_wgs84(
              item.x3,
              item.y3,
              0,
              "VN2000_SOC_TRANG"
            );
            const point4 = vn2000_to_wgs84(
              item.x4,
              item.y4,
              0,
              "VN2000_SOC_TRANG"
            );

            const pointList = [
              {
                latitude: Number(point1.x) - 4.8,
                longitude: Number(point1.y) + 4.8,
              },
              {
                latitude: Number(point2.x) - 4.8,
                longitude: Number(point2.y) + 4.8,
              },
              {
                latitude: Number(point3.x) - 4.8,
                longitude: Number(point3.y) + 4.8,
              },
              {
                latitude: Number(point4.x) - 4.8,
                longitude: Number(point4.y) + 4.8,
              },
              {
                latitude: Number(point1.x) - 4.8,
                longitude: Number(point1.y) + 4.8,
              },
            ];

            return (
              <Polygon
                key={index}
                coordinates={pointList}
                strokeColor={color.redColor} // ???
                fillColor={color.lightRedTransparent} // ???
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
