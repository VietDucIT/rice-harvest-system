import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";
import dayjs from "dayjs";

import nameList from "../../json/nameList";

import Map from "../map/Map";

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
      // setLoading(true);
      const data = await getSuggestToBuy(idSuggestToBuy);
      // console.log("SuggestToBuyInfo - Suggest To Buy data: ", data);
      setSuggestToBuyData(data);
      // setLoading(false);
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
              {/* Farmer Name */}
              <Text text70>{suggestToBuyData.seasonFarmerId}</Text>
              {/* <Text text70>Nguyễn Việt Đức</Text> */}
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ruộng lúa: </TextR>
              <Text text70>{suggestToBuyData.seasonRiceFieldName}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giống lúa: </TextR>
              <Text text70>{suggestToBuyData.seasonRiceName}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tình trạng: </TextR>
              <Text text70>{suggestToBuyData.seasonState}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày sạ: </TextR>
              <Text text70>
                {dayjs(suggestToBuyData.seasonTimeStart).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày gặt (dự kiến): </TextR>
              <Text text70>
                {dayjs(suggestToBuyData.seasonTimeEnd).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giá lúa đề xuất: </TextR>
              <Text text70>{suggestToBuyData.suggestedPrice} đồng/kg</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày đề xuất thu hoạch: </TextR>
              <Text text70>
                {dayjs(suggestToBuyData.suggestedTimeEnd).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ghi chú: </TextR>
              <Text text70>{suggestToBuyData.description}</Text>
              {/* <Text text70>
                Mồng 9 tháng Chạp sẽ cắt trước 2 công, và cắt tiếp 5 công vào
                mồng 10.
              </Text> */}
            </View>

            {/* <View flex style={styles.mapContainer}>
              <Map />
            </View> */}
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
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemLabel: {
    fontSize: 17,
    fontWeight: "500",
  },
  mapContainer: {
    width: "100%",
    height: 400,
    marginTop: 20,
    borderWidth: 2,
    borderColor: color.greenColor,
  },
});
