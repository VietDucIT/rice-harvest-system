import React, { useState, useEffect, useCallback } from "react";
import { Image, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceBuyingAreaList from "../../services/riceBuyingArea/getRiceBuyingAreaList";
import deleteRiceBuyingArea from "../../services/riceBuyingArea/deleteRiceBuyingArea";

StyleInit();

const RiceBuyingAreas = ({ navigation }) => {
  // const initArray = [
  //   {
  //     id: 1,
  //     name: "Khu vực 1",
  //     address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
  //     description: "Bờ đông kênh Cầu Tre.",
  //   },
  //   {
  //     id: 2,
  //     name: "Khu vực 2",
  //     address: "Mỹ Đức, Mỹ Hương, Mỹ Tú, Sóc Trăng",
  //     description: "Bờ tây kênh Cầu Tre.",
  //   },
  //   {
  //     id: 3,
  //     name: "Khu vực 3",
  //     address: "An Tập, Thiện Mỹ, Châu Thành, Sóc Trăng",
  //     description: "Khu vực kênh Giao Thông.",
  //   },
  //   {
  //     id: 4,
  //     name: "Khu vực 4",
  //     address: "Mỹ Tân, Thiện Mỹ, Châu Thành, Sóc Trăng",
  //     description: "Khu vực từ nhà thờ Ba Rinh đến cầu 6 Long.",
  //   },
  //   {
  //     id: 5,
  //     name: "Khu vực 5",
  //     address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
  //     description: "Khu vực Ngã 4 Mỹ Đức.",
  //   },
  // ];

  const [riceBuyingAreaName, setRiceBuyingAreaName] = useState("");
  const [riceBuyingAreaArray, setRiceBuyingAreaArray] = useState([]);

  // call API
  const getRiceBuyingAreaArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceBuyingAreaList();
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

  // delete a Rice Field
  const handleDelete = async (id) => {
    try {
      // setLoading(true);
      let dataAPI = await deleteRiceField(id);
      // console.log("Data API: ", dataAPI);
      Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa mẫu ruộng này?", [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            // set status for this suggest
            Alert.alert("Thông báo", "Đã xóa mẫu ruộng này.", [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);
            navigation.navigate(nameList.riceFields);
          },
        },
      ]);
      // setLoading(false);
    } catch (err) {
      console.log("Error while deleting Rice Field.");
    }
  };

  return (
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
              <View flex style={styles.subContainer}>
                <Text text80>
                  {item.address.length <= 40
                    ? `${item.address}`
                    : `${item.address.substring(0, 39)}...`}
                </Text>
                <View flex right style={styles.controllContainer}>
                  <Text
                    green
                    text70
                    onPress={() =>
                      navigation.navigate(nameList.riceBuyingAreaInfo)
                    }
                  >
                    Xem
                  </Text>
                  <Text text70 onPress={handleDelete} style={styles.deleteBtn}>
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
  deleteBtn: {
    color: color.redColor,
    opacity: 0.6,
  },
});
