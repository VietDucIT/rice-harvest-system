import React, { useState, useEffect, useCallback } from "react";
import { Alert, Image, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceBuyingAreaList from "../../services/riceBuyingArea/getRiceBuyingAreaList";
import deleteRiceBuyingArea from "../../services/riceBuyingArea/deleteRiceBuyingArea";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const RiceBuyingAreas = ({ navigation }) => {
  // get UserID from SecureStore
  let userId = "";
  getUserIdStored().then((value) => {
    userId = value;
    // console.log("User ID from SecureStore: ", value);
  });

  // const initArray = [
  //   {
  //     _id: 1,
  //     name: "Khu vực 1",
  //     province: "Tỉnh Sóc Trăng",
  //     town: "Huyện Châu Thành",
  //     commune: "Xã Thiện Mỹ",
  //     village: "Ấp Mỹ Đức",
  //     address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
  //     description: "Bờ đông kênh Cầu Tre.",
  //   },
  // ];

  const [riceBuyingAreaName, setRiceBuyingAreaName] = useState("");
  const [riceBuyingAreaArray, setRiceBuyingAreaArray] = useState([]);

  // call API
  const getRiceBuyingAreaArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceBuyingAreaList(userId);
      // console.log("Rice Buying Area list: ", data);
      setRiceBuyingAreaArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Buying Area list.");
    }
  }, []);

  useEffect(() => {
    getRiceBuyingAreaArray();
  }, [getRiceBuyingAreaArray]);

  // delete a Rice Buying Area
  const handleDelete = (id) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa khu vực thu mua này?", [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          try {
            // setLoading(true);
            let dataAPI = await deleteRiceBuyingArea(id);
            // console.log("Data API: ", dataAPI);

            Alert.alert("Thông báo", "Đã xóa khu vực thu mua này.", [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);
            navigation.navigate(nameList.riceBuyingAreas);
            // setLoading(false);
          } catch (err) {
            console.log("Error while deleting Rice Buying Area.");
          }
        },
      },
    ]);
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

        {/* ??? */}
        <SearchBar
          placeholder="Nhập tên khu vực"
          handleSearch={(name) => setRiceBuyingAreaName(name)}
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
                    {/* {item.address.length <= 40
                    ? `${item.address}`
                    : `${item.address.substring(0, 39)}...`} */}
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
