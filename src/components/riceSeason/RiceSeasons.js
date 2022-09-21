import React from "react";
import { Image, StyleSheet, FlatList, Text as TextR } from "react-native";
import { View, Text } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import { StyleInit } from "../../config/StyleInit";
import CustomButton from "../core/CustomButton";

StyleInit();

const RiceSeasons = ({ navigation }) => {
  const riceSeasons = [
    {
      id: 1,
      name: "Thu Đông 2022",
      riceField: "Mẫu ruộng số 1",
      rice: "OM18",
      timeStart: "19/9/2022",
      timeEnd: "19/12/2022",
      totalRice: 900,
    },
    {
      id: 2,
      name: "Đông Xuân 2023",
      riceField: "Mẫu ruộng số 1",
      rice: "OM5451",
      timeStart: "19/9/2022",
      timeEnd: "19/12/2022",
      totalRice: 900,
    },
    {
      id: 3,
      name: "Đông Xuân 2023",
      riceField: "Mẫu ruộng số 2",
      rice: "OM18",
      timeStart: "19/9/2022",
      timeEnd: "19/12/2022",
      totalRice: 900,
    },
    {
      id: 4,
      name: "Hè Thu 2023",
      riceField: "Mẫu ruộng số 1",
      rice: "OM18",
      timeStart: "19/9/2022",
      timeEnd: "19/12/2022",
      totalRice: 900,
    },
    {
      id: 5,
      name: "Hè Thu 2023",
      riceField: "Mẫu ruộng số 2",
      rice: "ST25",
      timeStart: "19/9/2022",
      timeEnd: "19/12/2022",
      totalRice: 900,
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.riceSeasonItem} padding-5 marginV-8 marginH-16>
      <TextR style={styles.riceSeasonName}>{item.name}</TextR>
      <View flex style={styles.subContainer}>
        <Text text80>{item.riceField}</Text>
        <Text
          green
          text70
          onPress={() => navigation.navigate("RiceSeasonInfo")}
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
              Quản lý vụ mùa
            </Text>
          </View>
        </View>

        <View marginT-20>
          <FlatList
            data={riceSeasons}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View marginT-30 center>
          <CustomButton
            label="Thêm"
            onPress={() => navigation.navigate("AddRiceSeason")}
          />
        </View>
      </View>
    </View>
  );
};
export default RiceSeasons;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },

  riceSeasonItem: {
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
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
