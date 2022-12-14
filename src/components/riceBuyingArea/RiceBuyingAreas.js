import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
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

import findRiceBuyingAreaByName from "../../services/riceBuyingArea/findRiceBuyingAreaByName";
import getRiceBuyingAreaList from "../../services/riceBuyingArea/getRiceBuyingAreaList";
import deleteRiceBuyingArea from "../../services/riceBuyingArea/deleteRiceBuyingArea";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const RiceBuyingAreas = ({ navigation, route }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("RiceBuyingAreas - User ID from SecureStore: ", userId),
    [userId]
  );

  const [riceBuyingAreaArray, setRiceBuyingAreaArray] = useState([]);

  // get Rice Buying Area list
  const getRiceBuyingAreaArray = useCallback(async () => {
    try {
      const data = await getRiceBuyingAreaList(userId);
      // console.log("RiceBuyingAreas - Rice Buying Area list: ", data);
      setRiceBuyingAreaArray(data);
    } catch (err) {
      console.log(
        "RiceBuyingAreas - Error while getting Rice Buying Area list."
      );
    }
  }, [userId]);

  useEffect(() => {
    getRiceBuyingAreaArray();
  }, [getRiceBuyingAreaArray]);

  // get Rice Buying Area list by Name
  const getRiceBuyingAreaArrayByName = async (name) => {
    try {
      const data = await findRiceBuyingAreaByName(name, userId);
      // console.log("RiceBuyingAreas - Rice Buying Areas data: ", data);
      setRiceBuyingAreaArray(data);
    } catch (err) {
      console.log(
        "RiceBuyingAreas - Error while finding Rice BuyingArea by Name."
      );
    }
  };

  // recall API to get list after adding
  useEffect(() => {
    console.log(
      "RiceBuyingAreas - hasNewBuyingArea: ",
      route.params?.hasNewBuyingArea
    );
    if (route.params?.hasNewBuyingArea) {
      getRiceBuyingAreaArray();
    }
  }, [route.params?.hasNewBuyingArea]);

  // delete a Rice Buying Area
  const handleDelete = (item) => {
    Alert.alert(
      "Thông báo",
      `Bạn có chắc chắn muốn xóa khu vực ${item.name}?`,
      [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              let dataAPI = await deleteRiceBuyingArea(item._id);
              // console.log("RiceBuyingAreas - Data API: ", dataAPI);
              if (dataAPI) {
                ToastAndroid.show("Đã xóa khu vực thu mua", ToastAndroid.SHORT);
              }
              getRiceBuyingAreaArray();
            } catch (err) {
              console.log(
                "RiceBuyingAreas - Error while deleting Rice Buying Area."
              );
            }
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
                Quản lý khu vực thu mua
              </Text>
            </View>
          </View>

          <SearchBar
            placeholder="Nhập tên khu vực..."
            handleSearch={(name) => {
              getRiceBuyingAreaArrayByName(name);
              console.log("RiceBuyingAreas - Rice Buying Area name: ", name);
            }}
          />

          <View marginT-20>
            {riceBuyingAreaArray &&
              riceBuyingAreaArray.map((item, index) => {
                const address =
                  item.village +
                  ", " +
                  item.commune +
                  ", " +
                  item.town +
                  ", " +
                  item.province;

                return (
                  <View
                    flex
                    style={styles.riceBuyingAreaItem}
                    padding-5
                    marginV-8
                    marginH-16
                    key={index}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(nameList.riceBuyingAreaInfo, {
                          idRiceBuyingArea: item._id,
                        })
                      }
                    >
                      <TextR style={styles.riceBuyingAreaName}>
                        {item.name}
                      </TextR>
                      <Text text80>
                        {address.length <= 35
                          ? address
                          : `${address.substring(0, 34)}...`}
                      </Text>
                    </TouchableOpacity>

                    <View flex style={styles.subContainer}>
                      <View flex right style={styles.controllContainer}>
                        <Text
                          green
                          text70
                          onPress={() =>
                            navigation.navigate(nameList.riceBuyingAreaInfo, {
                              idRiceBuyingArea: item._id,
                            })
                          }
                        >
                          Xem
                        </Text>

                        <Text
                          text70
                          onPress={() => handleDelete(item)}
                          style={styles.deleteBtn}
                        >
                          Xóa
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
          </View>

          <View marginT-30 center>
            <CustomButton
              label="Thêm"
              onPress={() => navigation.navigate(nameList.addRiceBuyingArea)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceBuyingAreas;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  riceBuyingAreaItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  riceBuyingAreaName: {
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
