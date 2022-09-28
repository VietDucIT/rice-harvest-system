import React from "react";
import { Image, FlatList, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const RiceBuyingAreas = ({ navigation }) => {
  const riceBuyingAreas = [
    {
      id: 1,
      name: "Khu vực 1",
      address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
      description: "Bờ đông kênh Cầu Tre.",
    },
    {
      id: 2,
      name: "Khu vực 2",
      address: "Mỹ Đức, Mỹ Hương, Mỹ Tú, Sóc Trăng",
      description: "Bờ tây kênh Cầu Tre.",
    },
    {
      id: 3,
      name: "Khu vực 3",
      address: "An Tập, Thiện Mỹ, Châu Thành, Sóc Trăng",
      description: "Khu vực kênh Giao Thông.",
    },
    {
      id: 4,
      name: "Khu vực 4",
      address: "Mỹ Tân, Thiện Mỹ, Châu Thành, Sóc Trăng",
      description: "Khu vực từ nhà thờ Ba Rinh đến cầu 6 Long.",
    },
    {
      id: 5,
      name: "Khu vực 5",
      address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
      description: "Khu vực Ngã 4 Mỹ Đức.",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.riceBuyingAreaItem} padding-5 marginV-8 marginH-16>
      <TextR style={styles.riceBuyingAreaName}>{item.name}</TextR>
      <View flex style={styles.subContainer}>
        <Text text80>{item.address}</Text>
        <Text
          green
          text70
          onPress={() => navigation.navigate(nameList.riceBuyingAreaInfo)}
        >
          Xem
        </Text>
      </View>
    </View>
  );

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

        <SearchBar placeholder="Nhập tên khu vực" />

        <View marginT-20>
          <FlatList
            data={riceBuyingAreas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
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
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
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
});
