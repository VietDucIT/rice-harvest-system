import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
  ToastAndroid,
} from "react-native";
import { Text, View } from "react-native-ui-lib";
import dayjs from "dayjs";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getSuggestToBuy from "../../services/suggestToBuy/getSuggestToBuy";
import modifySuggestToBuy from "../../services/suggestToBuy/modifySuggestToBuy";

StyleInit();

const SuggestToBuyInfoForFarmer = ({ navigation, route }) => {
  const { idSuggestToBuy } = route.params;
  const [suggestToBuyData, setSuggestToBuyData] = useState({});

  // call API to get Suggest To Buy data
  const getSuggestToBuyData = useCallback(async () => {
    try {
      const data = await getSuggestToBuy(idSuggestToBuy);
      // console.log("SuggestToBuyInfoForFarmer - Suggest To Buy data: ", data);
      setSuggestToBuyData(data);
    } catch (err) {
      console.log(
        "SuggestToBuyInfoForFarmer - Error while getting Suggest To Buy data."
      );
    }
  }, [idSuggestToBuy]);

  useEffect(() => {
    getSuggestToBuyData();
  }, [getSuggestToBuyData]);

  const handleAccept = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn chấp nhận đề xuất thu mua này?", [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Chấp nhận",
        onPress: async () => {
          try {
            let dataAPI = await modifySuggestToBuy({
              ...suggestToBuyData,
              status: "Chấp nhận",
            });

            Alert.alert(
              "Thông báo",
              "Đã chấp nhận đề xuất thu mua. Thương lái sẽ sớm liên hệ với bạn.",
              [
                {
                  text: "Đóng",
                  style: "cancel",
                },
              ]
            );

            navigation.navigate(nameList.riceSeasonInfo, {
              idRiceSeason: suggestToBuyData.seasonId,
              hasUpdated: true,
            });
          } catch (err) {
            console.log(
              "SuggestToBuyInfoForFarmer - Error while accepting Suggust To Buy."
            );
          }
        },
      },
    ]);
  };

  const handleReject = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn từ chối đề xuất thu mua này?",
      [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Từ chối",
          onPress: async () => {
            let dataAPI = await modifySuggestToBuy({
              ...suggestToBuyData,
              status: "Từ chối",
            });

            if (dataAPI) {
              ToastAndroid.show(
                "Đã từ chối đề xuất thu mua",
                ToastAndroid.SHORT
              );
            }
            navigation.navigate(nameList.riceSeasonInfo, {
              idRiceSeason: suggestToBuyData.seasonId,
              hasUpdated: true,
            });
          },
        },
      ]
    );
  };

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
              <TextR style={styles.itemLabel}>Thương lái: </TextR>
              <Text text70 style={styles.itemContent}>
                <TextR style={styles.important}>
                  {suggestToBuyData.traderName} (
                  {suggestToBuyData.traderNickname})
                </TextR>
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
                <TextR style={styles.important}>
                  {suggestToBuyData.suggestedPrice}
                </TextR>{" "}
                đồng/kg
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày đề xuất thu hoạch: </TextR>
              <Text text70 style={styles.itemContent}>
                <TextR style={styles.important}>
                  {dayjs(suggestToBuyData.suggestedTimeEnd).format(
                    "DD-MM-YYYY"
                  )}
                </TextR>
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={[styles.itemLabel, { width: 150 }]}>
                {/* Ghi chú từ thương lái:{" "} */}
                Thương lái ghi chú:{" "}
              </TextR>
              <Text text70 style={{ width: 200 }}>
                {suggestToBuyData.description}
              </Text>
            </View>
          </View>

          <View flex marginT-40 center style={styles.btnContainer}>
            {suggestToBuyData.status === "Từ chối" ? (
              <CustomButton
                label="Đã từ chối"
                style={{ marginLeft: 30, width: 130 }}
                disabled
              />
            ) : (
              <CustomButton
                label="Từ chối"
                onPress={handleReject}
                style={{ marginLeft: 30, width: 130 }}
              />
            )}

            {suggestToBuyData.status === "Chấp nhận" ? (
              <CustomButton
                label="Đã chấp nhận"
                style={{ marginRight: 30, width: 170 }}
                disabled
              />
            ) : (
              <CustomButton
                label="Chấp nhận"
                onPress={handleAccept}
                style={{ marginRight: 30, width: 130 }}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SuggestToBuyInfoForFarmer;

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
  important: {
    color: color.redColor,
    fontWeight: "600",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
