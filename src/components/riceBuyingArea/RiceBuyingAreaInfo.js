import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import Map from "../map/Map";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceBuyingArea from "../../services/riceBuyingArea/getRiceBuyingArea";

StyleInit();

const RiceBuyingAreaInfo = ({ navigation, route }) => {
  const { idRiceBuyingArea } = route.params;
  const [buyingAreaData, setBuyingAreaData] = useState({});

  // call API
  const getRiceBuyingAreaData = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceBuyingArea(idRiceBuyingArea);
      // console.log("RiceBuyingAreaInfo - Rice Buying Area data: ", data);
      setBuyingAreaData(data);
      // setLoading(false);
    } catch (err) {
      console.log(
        "RiceBuyingAreaInfo - Error while getting Rice Buying Area data."
      );
    }
  }, [idRiceBuyingArea]);

  useEffect(() => {
    getRiceBuyingAreaData();
  }, [getRiceBuyingAreaData]);

  const fieldData = {
    x1: 1068274.57,
    y1: 539311.12,
    x2: 1068275.16,
    y2: 539859.84,
    x3: 1068828.14,
    y3: 539859.24,
    x4: 1068938.15,
    y4: 539310.42,
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionButton navigation={navigation} />

        <View>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Thông tin khu vực thu mua
              </Text>
            </View>
          </View>

          <View flex marginH-25 marginV-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tên: </TextR>
              <Text style={styles.itemContent}>{buyingAreaData.name}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Địa chỉ: </TextR>
              <Text style={styles.itemContent}>
                {buyingAreaData.village}, {buyingAreaData.commune},{" "}
                {buyingAreaData.town}, {buyingAreaData.province}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Mô tả: </TextR>
              <Text style={styles.itemContent}>
                {buyingAreaData.description}
              </Text>
            </View>

            {/* How to show Address on Map */}
            <View flex style={styles.mapContainer}>
              <Map fieldData={fieldData} />
            </View>
          </View>

          <View flex marginT-20 center>
            <CustomButton
              label="Sửa"
              onPress={() =>
                navigation.navigate(nameList.modifyRiceBuyingArea, {
                  idRiceBuyingArea: buyingAreaData._id,
                })
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceBuyingAreaInfo;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 10,
  },
  itemLabel: {
    fontWeight: "500",
  },
  itemContent: {
    width: "90%",
    paddingRight: 10,
  },
  mapContainer: {
    width: "100%",
    height: 400,
    marginTop: 20,
    borderWidth: 2,
    borderColor: color.greenColor,
  },
});
