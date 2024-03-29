import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";
import dayjs from "dayjs";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getSuggestToBuy from "../../services/suggestToBuy/getSuggestToBuy";

StyleInit();

const SuggestToBuyInfo = ({ navigation, route }) => {
  const { idSuggestToBuy } = route.params;
  const [suggestToBuyData, setSuggestToBuyData] = useState({});

  // call API to get Suggest To Buy data
  const getSuggestToBuyData = useCallback(async () => {
    try {
      const data = await getSuggestToBuy(idSuggestToBuy);
      // console.log("SuggestToBuyInfo - Suggest To Buy data: ", data);
      setSuggestToBuyData(data);
    } catch (err) {
      console.log(
        "SuggestToBuyInfo - Error while getting Suggest To Buy data."
      );
    }
  }, [idSuggestToBuy]);

  useEffect(() => {
    getSuggestToBuyData();
  }, [getSuggestToBuyData]);

  return (
    <ScrollView>
      <View flex marginB-60>
        <UserOptionButton navigation={navigation} />

        <View>
          <View center marginT-30>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Thông tin đề xuất thu mua
              </Text>
            </View>
          </View>

          <View flex marginH-25 marginT-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Nông dân: </TextR>
              <Text text70 style={styles.itemContent}>
                {suggestToBuyData.seasonFarmerName} (
                {suggestToBuyData.seasonFarmerNickname})
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ruộng lúa: </TextR>
              <Text text70 style={styles.itemContent}>
                {suggestToBuyData.seasonRiceFieldName}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giống lúa: </TextR>
              <Text text70 style={styles.itemContent}>
                {suggestToBuyData.seasonRiceName}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tình trạng: </TextR>
              <Text text70 style={styles.itemContent}>
                {suggestToBuyData.seasonState}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày sạ: </TextR>
              <Text text70 style={styles.itemContent}>
                {dayjs(suggestToBuyData.seasonTimeStart).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày gặt (dự kiến): </TextR>
              <Text text70 style={styles.itemContent}>
                {suggestToBuyData.seasonTimeEnd
                  ? dayjs(suggestToBuyData.seasonTimeEnd).format("DD-MM-YYYY")
                  : ""}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giá lúa đề xuất: </TextR>
              <Text text70 style={styles.itemContent}>
                {suggestToBuyData.suggestedPrice} đồng/kg
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày đề xuất thu hoạch: </TextR>
              <Text text70 style={styles.itemContent}>
                {dayjs(suggestToBuyData.suggestedTimeEnd).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ghi chú: </TextR>
              <Text text70 style={styles.itemContent}>
                {suggestToBuyData.description}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tình trạng: </TextR>
              <Text text70 style={styles.itemContent}>
                {suggestToBuyData.status}
              </Text>
            </View>
          </View>

          <View flex marginT-30 center>
            <CustomButton
              label="Sửa"
              onPress={() =>
                navigation.navigate(nameList.modifySuggestToBuy, {
                  idSuggestToBuy: suggestToBuyData._id,
                })
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SuggestToBuyInfo;

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
