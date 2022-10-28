import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getSuggestToBuy from "../../services/suggestToBuy/getSuggestToBuy";

StyleInit();

const SuggestToBuyInfoForFarmer = ({ navigation, route }) => {
  // const suggestData = {
  //   id: 1,
  //   traderName: "Nguyễn Văn A",
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

  const handleAccept = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn đồng ý với đề xuất thu mua này?",
      [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            setSuggestToBuyData({ ...suggestToBuyData, status: "Đồng ý" });
            Alert.alert(
              "Thông báo",
              "Đã đồng ý với đề xuất thu mua. Thương lái sẽ sớm liên hệ với bạn.",
              [
                {
                  text: "Đóng",
                  style: "cancel",
                },
              ]
            );
            navigation.goBack();
            // navigation.navigate(nameList.riceSeasonInfo, {idRiceSeason: riceSeason._id});
          },
        },
      ]
    );
  };

  const handleReject = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn từ chối đề xuất thu mua này?", [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Từ chối",
        onPress: () => {
          setSuggestToBuyData({ ...suggestToBuyData, status: "Từ chối" });
          Alert.alert("Thông báo", "Đã từ chối đề xuất thu mua.", [
            {
              text: "Đóng",
              style: "cancel",
            },
          ]);
          navigation.goBack();
          // navigation.navigate(nameList.riceSeasonInfo, {idRiceSeason: riceSeason._id});
        },
      },
    ]);
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
              <Text text70>
                <TextR style={styles.important}>
                  {suggestToBuyData.traderName}
                </TextR>
              </Text>
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
              <Text text70>
                <TextR style={styles.important}>
                  {suggestToBuyData.suggestedPrice}
                </TextR>{" "}
                đồng/kg
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày đề xuất thu hoạch: </TextR>
              <Text text70>
                <TextR style={styles.important}>
                  {suggestToBuyData.suggestedTimeEnd}
                </TextR>
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ghi chú từ thương lái: </TextR>
              <Text text70>{suggestToBuyData.description}</Text>
            </View>
          </View>

          <View flex marginT-40 center style={styles.btnContainer}>
            <CustomButton label="Từ chối" onPress={handleReject} />
            <CustomButton label="Chấp nhận" onPress={handleAccept} />
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
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemLabel: {
    fontSize: 17,
    fontWeight: "500",
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
