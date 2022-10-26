import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import Map from "../Map/Map";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getSuggestToBuy from "../../services/suggestToBuy/getSuggestToBuy";

StyleInit();

const SuggestToBuyInfo = ({ navigation, route }) => {
  // const suggestData = {
  //   id: 1,
  //   farmerName: "Nguyễn Văn A",
  //   riceField: "Mẫu ruộng số 1",
  //   rice: "OM 18",
  //   currentState: "Lúa chín",
  //   timeStart: "19/9/2022",
  //   timeEnd: "19/12/2022",
  //   suggestedPrice: 6000,
  //   suggestedTimeEnd: "20/9/2022",
  //   description: "Thu mua bằng giá thị trường",
  // };

  const { idSuggestToBuy } = route.params;
  const [suggestToBuyData, setSuggestToBuyData] = useState({});

  // call API to get Suggest To Buy data
  const getSuggestToBuyData = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getSuggestToBuy(idSuggestToBuy);
      // console.log("Suggest To Buy data: ", data);
      setSuggestToBuyData(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Suggest To Buy data.");
    }
  }, [idSuggestToBuy]);

  useEffect(() => {
    getSuggestToBuyData();
  }, [getSuggestToBuyData]);

  return (
    <ScrollView>
      <View flex marginB-60>
        <UserOptionModal />

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
              <Text text70>{suggestToBuyData.farmerName}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ruộng lúa: </TextR>
              <Text text70>{suggestToBuyData.riceField}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giống lúa: </TextR>
              <Text text70>{suggestToBuyData.rice}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tình trạng: </TextR>
              <Text text70>{suggestToBuyData.currentState}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Thời gian sạ: </TextR>
              <Text text70>{suggestToBuyData.timeStart}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Thời gian gặt (dự kiến): </TextR>
              <Text text70>{suggestToBuyData.timeEnd}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giá lúa đề xuất: </TextR>
              <Text text70>{suggestToBuyData.suggestedPrice} đồng/kg</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày đề xuất thu hoạch: </TextR>
              <Text text70>{suggestToBuyData.suggestedTimeEnd}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ghi chú: </TextR>
              <Text text70>{suggestToBuyData.description}</Text>
            </View>

            <View flex style={styles.mapContainer}>
              <Map />
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
