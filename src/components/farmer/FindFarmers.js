import React from "react";
import { Image, StyleSheet, FlatList, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const FindFarmers = ({ navigation }) => {
  const farmerArray = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      nickname: "Chín A",
      gender: 1,
      birthYear: 1960,
      address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
      phone: "0123 456 789",
      role: 0,
    },
    {
      id: 2,
      name: "Trần Thị B",
      nickname: "6 Bê",
      gender: 0,
      birthYear: 1950,
      address: "Mỹ An, Thiện Mỹ, Châu Thành, Sóc Trăng",
      phone: "0123 456 780",
      role: 0,
    },
    {
      id: 3,
      name: "Lê Trần Minh C",
      nickname: "Hai Xẹo",
      gender: 1,
      birthYear: 1966,
      address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
      phone: "0123 456 781",
      role: 0,
    },
    {
      id: 4,
      name: "Nguyễn Văn A",
      nickname: "Năm A",
      gender: 1,
      birthYear: 1960,
      address: "Mỹ Đức, Mỹ Hương, Mỹ Tú, Sóc Trăng",
      phone: "0123 456 782",
      role: 0,
    },
    {
      id: 5,
      name: "Nguyễn Minh D",
      nickname: "Tư Di",
      gender: 1,
      birthYear: 1960,
      address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
      phone: "0123 456 783",
      role: 0,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.riceSeasonItem} padding-5 marginV-8 marginH-16>
      <TextR style={styles.riceSeasonName}>
        {item.name} ({item.nickname})
      </TextR>
      <View flex style={styles.subContainer}>
        <Text text80>
          {item.address.length <= 40
            ? `${item.address}`
            : `${item.address.substring(0, 39)}...`}
        </Text>
        <Text
          green
          text70
          onPress={() => navigation.navigate(nameList.farmerInfo)}
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
              Tìm kiếm nông dân
            </Text>
          </View>
        </View>

        <SearchBar placeholder="Nhập tên nông dân..." />

        {/* <View>Lọc</View> */}

        <View marginT-20>
          <FlatList
            data={farmerArray}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* <View marginT-30 center>
          <CustomButton
            label="Thêm"
            onPress={() => navigation.navigate(nameList.addRiceSeason)}
          />
        </View> */}
      </View>
    </View>
  );
};
export default FindFarmers;

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
  riceSeasonName: {
    fontSize: 16,
    fontWeight: "600",
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
