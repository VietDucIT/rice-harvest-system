import React, { useState, useEffect, useCallback } from "react";
import { Alert, Image, StyleSheet, Text as TextR } from "react-native";
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

const RiceBuyingAreas = ({ navigation }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("RiceBuyingAreas - User ID from SecureStore: ", userId),
    [userId]
  );

  const [riceBuyingAreaName, setRiceBuyingAreaName] = useState("");
  const [riceBuyingAreaArray, setRiceBuyingAreaArray] = useState([]);

  // get Rice Buying Area list
  const getRiceBuyingAreaArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceBuyingAreaList(userId);
      // console.log("RiceBuyingAreas - Rice Buying Area list: ", data);
      setRiceBuyingAreaArray(data);
      // setLoading(false);
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
  const getRiceBuyingAreaArrayByName = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await findRiceBuyingAreaByName(riceBuyingAreaName, userId);
      // console.log("RiceBuyingAreas - Rice Buying Areas data: ", data);
      setRiceBuyingAreaArray(data);
      // setLoading(false);
    } catch (err) {
      console.log(
        "RiceBuyingAreas - Error while finding Rice BuyingArea by Name."
      );
    }
  }, [riceBuyingAreaName, userId]);

  useEffect(() => {
    getRiceBuyingAreaArrayByName();
  }, [getRiceBuyingAreaArrayByName]);

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
              // setLoading(true);
              let dataAPI = await deleteRiceBuyingArea(item._id);
              // console.log("RiceBuyingAreas - Data API: ", dataAPI);

              Alert.alert("Thông báo", "Đã xóa khu vực thu mua.", [
                {
                  text: "Đóng",
                  style: "cancel",
                },
              ]);
              navigation.goBack();
              // setLoading(false);
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
          placeholder="Nhập tên khu vực"
          handleSearch={(name) => {
            setRiceBuyingAreaName(name);
            console.log("RiceBuyingAreas - Rice Buying Area name: ", name);
          }}
        />

        <View marginT-20>
          {riceBuyingAreaArray.map((item, index) => (
            <View
              style={styles.riceBuyingAreaItem}
              padding-5
              marginV-8
              marginH-16
              key={index}
            >
              <TextR style={styles.riceBuyingAreaName}>{item.name}</TextR>
              <View style={styles.subContainer}>
                <View style={styles.address}>
                  <Text text80>
                    {item.village +
                      ", " +
                      item.commune +
                      ", " +
                      item.town +
                      ", " +
                      item.province}
                  </Text>
                </View>
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
          ))}
        </View>

        <View marginT-30 center>
          <CustomButton
            label="Thêm"
            onPress={() => navigation.navigate(nameList.addRiceBuyingArea)}
          />
        </View>
      </View>
    </View>
  );
};
export default RiceBuyingAreas;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  riceBuyingAreaItem: {
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
  address: {
    paddingRight: 10,
    width: "80%",
  },
  deleteBtn: {
    color: color.redColor,
    opacity: 0.6,
  },
});
