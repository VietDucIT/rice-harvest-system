import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import MapForBuyingArea from "../map/MapForBuyingArea";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceBuyingArea from "../../services/riceBuyingArea/getRiceBuyingArea";

StyleInit();

const RiceBuyingAreaInfo = ({ navigation, route }) => {
  const { idRiceBuyingArea } = route.params;
  const [buyingAreaData, setBuyingAreaData] = useState({});

  // call API to get Rice Buying Area
  const getRiceBuyingAreaData = useCallback(async () => {
    try {
      const data = await getRiceBuyingArea(idRiceBuyingArea);
      // console.log("RiceBuyingAreaInfo - Rice Buying Area data: ", data);
      setBuyingAreaData(data);
    } catch (err) {
      console.log(
        "RiceBuyingAreaInfo - Error while getting Rice Buying Area data."
      );
    }
  }, [idRiceBuyingArea]);

  useEffect(() => {
    getRiceBuyingAreaData();
  }, [getRiceBuyingAreaData]);

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionButton navigation={navigation} />

        <View>
          <View center marginT-30>
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
              <Text text70 style={styles.itemContent}>
                {buyingAreaData.name}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Địa chỉ: </TextR>
              <Text text70 style={styles.itemContent}>
                {buyingAreaData.village}, {buyingAreaData.commune},{" "}
                {buyingAreaData.town}, {buyingAreaData.province}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Mô tả: </TextR>
              <Text text70 style={styles.itemContent}>
                {buyingAreaData.description}
              </Text>
            </View>

            <View flex style={styles.mapContainer}>
              <MapForBuyingArea riceBuyingArea={buyingAreaData} />
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
    fontSize: 17,
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
