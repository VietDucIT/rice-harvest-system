import React from "react";
import { Image, StyleSheet, FlatList, Text as TextR } from "react-native";
import { View, Text } from "react-native-ui-lib";

import { StyleInit } from "../../config/StyleInit";

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
          text80
          onPress={() => navigation.navigate("RiceSeasonInfo")}
        >
          Xem
        </Text>
      </View>
    </View>
  );

  return (
    <View flex paddingH-25 paddingT-60>
      <View center>
        <Image
          style={styles.logo}
          source={require("../../assets/images/Logo.png")}
        />
      </View>
      <View center marginV-10>
        <Text text50 green>
          Quản lý vụ mùa
        </Text>
      </View>

      <FlatList
        data={riceSeasons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
