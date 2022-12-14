import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { vn2000_to_wgs84 } from "vn2000-converter";

import nameList from "../../json/nameList";

import Loader from "../core/Loader";

import color from "../../config/color";

import getAllRiceField from "../../services/riceField/getAllRiceField";

import seasonState from "../../json/seasonState";

const FullMap = ({ navigation }) => {
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
            let fieldColor = "red";
            for (let state of seasonState) {
              if (state.name === item.currentStatus) {
                fieldColor = state.color;
                // console.log("FullMap - Field's color: ", fieldColor);
                break;
              }
            }

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
              <View key={index}>
                <Marker
                  coordinate={pointList[1]}
                  title={item.name}
                  description={item.currentStatus}
                  onPress={() =>
                    navigation.navigate(nameList.riceFieldInfo, {
                      idRiceField: item._id,
                    })
                  }
                />
                <Polygon
                  coordinates={pointList}
                  strokeColor={color[fieldColor + "Color"]} // color.greenColor
                  fillColor={
                    // color.lightGreenTransparent
                    color[
                      "light" +
                        fieldColor.charAt(0).toUpperCase() +
                        fieldColor.slice(1) +
                        "Transparent"
                    ]
                  }
                  // strokeWidth={6}
                />
              </View>
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
