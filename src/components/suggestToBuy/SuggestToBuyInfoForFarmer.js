import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import Map from "../Map/Map";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const SuggestToBuyInfoForFarmer = ({ navigation }) => {
  const suggestData = {
    id: 1,
    traderName: "Nguyễn Văn A",
    riceField: "Mẫu ruộng số 1",
    rice: "OM 18",
    currentState: "Lúa chín",
    timeStart: "19/9/2022",
    timeEnd: "19/12/2022",
    suggestedPrice: 6000,
    suggestedTimeEnd: "20/9/2022",
    description: "Thu mua bằng giá thị trường",
  };

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
            navigation.navigate(nameList.riceSeasonInfo);
          },
        },
      ]
    );
  };

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

          <View flex style={styles.contentWrapper} marginH-25 marginT-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Thương lái: </TextR>
              <Text text70>{suggestData.traderName}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ruộng lúa: </TextR>
              <Text text70>{suggestData.riceField}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giống lúa: </TextR>
              <Text text70>{suggestData.rice}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tình trạng: </TextR>
              <Text text70>{suggestData.currentState}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Thời gian sạ: </TextR>
              <Text text70>{suggestData.timeStart}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Thời gian gặt (dự kiến): </TextR>
              <Text text70>{suggestData.timeEnd}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giá lúa đề xuất: </TextR>
              <Text text70>{suggestData.suggestedPrice} đồng/kg</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày đề xuất thu hoạch: </TextR>
              <Text text70>{suggestData.suggestedTimeEnd}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ghi chú từ thương lái: </TextR>
              <Text text70>{suggestData.description}</Text>
            </View>
          </View>

          <View flex marginT-30 center style={styles.btnContainer}>
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
  contentWrapper: {
    // flexDirection: "column",
    // flexWrap: "wrap",
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
    borderColor: "green",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
