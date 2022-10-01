import React from "react";
import { FlatList, Image, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const SuggestToBuys = ({ navigation }) => {
  const suggestList = [
    {
      id: 1,
      farmerName: "Nguyễn Văn A",
      riceField: "Mẫu ruộng số 1",
    },
    {
      id: 2,
      farmerName: "Nguyễn Văn A",
      riceField: "Mẫu ruộng số 2",
    },
    {
      id: 3,
      farmerName: "Nguyễn Văn A",
      riceField: "Mẫu ruộng số 3",
    },
    {
      id: 4,
      farmerName: "Cao Thanh B",
      riceField: "Mẫu ruộng số 1",
    },
    {
      id: 5,
      farmerName: "Lâm C",
      riceField: "Mẫu ruộng số 2",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.riceSeasonItem} padding-5 marginV-8 marginH-16>
      <TextR style={styles.farmerName}>{item.farmerName}</TextR>
      <View flex style={styles.subContainer}>
        <Text text80>
          {item.riceField.length <= 40
            ? `${item.riceField}`
            : `${item.riceField.substring(0, 39)}...`}
        </Text>
        <Text
          green
          text70
          onPress={() => navigation.navigate(nameList.suggestToBuyInfo)}
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
              Quản lý đề xuất thu mua
            </Text>
          </View>
        </View>

        <SearchBar placeholder="Nhập tên nông dân" />

        <View marginT-20>
          <FlatList
            data={suggestList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View marginT-30 center>
          <CustomButton
            label="Thêm"
            onPress={() => navigation.navigate(nameList.findFarmers)}
          />
        </View>
      </View>
    </View>
  );
};
export default SuggestToBuys;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  riceSeasonItem: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
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
});
