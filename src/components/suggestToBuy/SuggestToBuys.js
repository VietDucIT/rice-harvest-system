import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getSuggestToBuyList from "../../services/suggestToBuy/getSuggestToBuyList";
import deleteSuggestToBuy from "../../services/suggestToBuy/deleteSuggestToBuy";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const SuggestToBuys = ({ navigation, route }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("SuggestToBuys - User ID from SecureStore: ", userId),
    [userId]
  );

  // const [suggestArray, setSuggestArray] = useState([
  //   {
  //     _id: "1",
  //     seasonFarmerName: "Nguyễn Việt Đức (Ba Đức)",
  //     seasonRiceFieldName: "Ruộng Kênh Cầu Tre",
  //   },
  //   {
  //     _id: "2",
  //     seasonFarmerName: "Nguyễn Việt Đức (Ba Đức)",
  //     seasonRiceFieldName: "Ruộng Láng Ba Rinh",
  //   },
  //   {
  //     _id: "3",
  //     seasonFarmerName: "Lê Thị C (Năm C)",
  //     seasonRiceFieldName: "Ruộng Bờ Dọc",
  //   },
  // ]);

  // call API
  const getSuggestToBuyArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getSuggestToBuyList(userId);
      // console.log("SuggestToBuys - Suggest To Buy list: ", data);
      setSuggestArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("SuggestToBuys - Error while getting Suggest To Buy list.");
    }
  }, [userId]);

  useEffect(() => {
    getSuggestToBuyArray();
  }, [getSuggestToBuyArray]);

  // recall API to get list after adding
  useEffect(() => {
    if (route.params?.hasNewSuggest) {
      getSuggestToBuyArray();
    }
  }, [route.params?.hasNewSuggest]);

  // delete a Suggest To Buy
  const handleDelete = (id) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa đề xuất thu mua này?", [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          try {
            // setLoading(true);
            let dataAPI = await deleteSuggestToBuy(id);
            // console.log("SuggestToBuys - Data API: ", dataAPI);

            // SET STATUS FOR THIS SUGGEST ???
            Alert.alert("Thông báo", "Đã xóa đề xuất thu mua này.", [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);

            // recall API to get list after deleting
            getSuggestToBuyArray();
            // setLoading(false);
          } catch (err) {
            console.log("SuggestToBuys - Error while deleting Suggest To Buy.");
          }
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
                Quản lý đề xuất thu mua
              </Text>
            </View>
          </View>

          <SearchBar placeholder="Nhập tên nông dân..." />

          <View marginT-20>
            {suggestArray.map((item, index) => (
              <View
                style={styles.suggestToBuyItem}
                padding-5
                marginV-8
                marginH-16
                key={index}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(nameList.suggestToBuyInfo, {
                      idSuggestToBuy: item._id,
                    })
                  }
                >
                  {/* Farmer Name */}
                  <TextR style={styles.farmerName}>{item.seasonFarmerId}</TextR>
                  {/* <TextR style={styles.farmerName}>
                    {item.seasonFarmerName}
                  </TextR> */}
                  <Text text80>
                    {item.seasonRiceFieldName.length <= 35
                      ? `${item.seasonRiceFieldName}`
                      : `${item.seasonRiceFieldName.substring(0, 34)}...`}
                  </Text>
                </TouchableOpacity>
                <View flex style={styles.subContainer}>
                  <View flex right style={styles.controllContainer}>
                    <Text
                      green
                      text70
                      onPress={() =>
                        navigation.navigate(nameList.suggestToBuyInfo, {
                          idSuggestToBuy: item._id,
                        })
                      }
                    >
                      Xem
                    </Text>
                    <Text
                      text70
                      onPress={() => handleDelete(item._id)}
                      style={styles.deleteBtn}
                    >
                      Xóa
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View marginT-30 center>
            <CustomButton
              label="Thêm"
              onPress={() => navigation.navigate(nameList.findFarmers)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SuggestToBuys;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  suggestToBuyItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: "600",
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  deleteBtn: {
    color: color.redColor,
    opacity: 0.6,
  },
});
