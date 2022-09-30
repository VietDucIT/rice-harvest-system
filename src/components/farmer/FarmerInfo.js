import React from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Text, View } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import nameList from "../../json/nameList";

StyleInit();

const FarmerInfo = ({ navigation }) => {
  const userData = {
    id: 1,
    name: "Nguyễn Văn A",
    nickname: "Hai A",
    gender: 1,
    birthYear: 1960,
    address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
    phone: "0123 456 789",
    role: 0,
  };
  const riceFields = [
    {
      id: "1",
      name: "Mẫu ruộng số 1",
    },
    {
      id: "2",
      name: "Mẫu ruộng số 2",
    },
    {
      id: "3",
      name: "Mẫu ruộng số 3",
    },
    {
      id: "4",
      name: "Mẫu ruộng số 4",
    },
    {
      id: "5",
      name: "Mẫu ruộng số 5",
    },
    {
      id: "6",
      name: "Mẫu ruộng số 6",
    },
  ];
  const riceSeasons = [
    {
      id: 1,
      name: "Thu Đông 2022",
      riceField: "Mẫu ruộng số 1",
      rice: "OM 18",
      timeStart: "19/9/2022",
      timeEnd: "19/12/2022",
      totalRice: 900,
    },
    {
      id: 3,
      name: "Đông Xuân 2023",
      riceField: "Mẫu ruộng số 2",
      rice: "OM 18",
      timeStart: "19/9/2022",
      timeEnd: "19/12/2022",
      totalRice: 900,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.riceFieldItem} padding-5 marginV-8 marginH-16>
      <View flex style={styles.subContainer}>
        <Text text80 style={styles.riceFieldName}>
          {item.riceField.length <= 40
            ? `${item.riceField}`
            : `${item.riceField.substring(0, 39)}...`}
        </Text>
        <Text
          green
          text70
          onPress={() => navigation.navigate(nameList.riceSeasonInfoForTrader)}
        >
          Xem
        </Text>
      </View>
    </View>
  );

  return (
    <View flex marginB-50>
      <UserOptionModal />

      <View>
        <View center>
          <Image
            style={styles.avatar}
            source={
              userData.gender === 0
                ? require("../../assets/images/woman-green.png")
                : require("../../assets/images/man-green.png")
            }
          />
          <View marginV-10 center>
            <Text text50 green>
              {userData.name}
            </Text>
            <Text text60 green>
              ({userData.nickname})
            </Text>
          </View>
        </View>

        <ScrollView style={styles.contentWrapper}>
          <View flex style={styles.itemContainer} marginT-5>
            <TextR style={styles.itemLabel}>Giới tính: </TextR>
            <Text text70>{userData.gender === 0 ? "Nữ" : "Nam"}</Text>
          </View>

          <View flex style={styles.itemContainer} marginT-5>
            <TextR style={styles.itemLabel}>Năm sinh: </TextR>
            <Text text70>{userData.birthYear}</Text>
          </View>

          <View flex style={styles.itemContainer} marginT-5>
            <TextR style={styles.itemLabel}>Địa chỉ: </TextR>
            <Text text70>{userData.address}</Text>
          </View>

          <View flex style={styles.itemContainer} marginT-5>
            <TextR style={styles.itemLabel}>Số điện thoại: </TextR>
            <Text text70>{userData.phone}</Text>
          </View>
        </ScrollView>

        <View marginT-20>
          <TextR style={styles.listLabel}>Danh sách ruộng đất:</TextR>
          <FlatList
            data={riceSeasons}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
};
export default FarmerInfo;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
  },
  contentWrapper: {
    marginHorizontal: 20,
    // flexDirection: "column",
    // flexWrap: "wrap",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemLabel: {
    fontWeight: "500",
    fontSize: 17,
  },
  listLabel: {
    fontSize: 16,
    color: color.greenColor,
    textDecorationLine: "underline",
    marginLeft: 20,
  },
  riceFieldItem: {
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  riceFieldName: {
    fontSize: 16,
    fontWeight: "600",
  },
});
