import React from "react";
import { Image, StyleSheet, FlatList, StatusBar, Button } from "react-native";
import { View, Text } from "react-native-ui-lib";

import { StyleInit } from "../../config/StyleInit";

StyleInit();

const RiceFields = ({ navigation }) => {
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

  const renderItem = ({ item }) => (
    <View flex style={styles.fieldItem} padding-5 marginV-8 marginH-16>
      <Text text70>{item.name}</Text>
      <Text green text70 onPress={() => navigation.navigate("RiceFieldInfo")}>
        Xem
      </Text>
    </View>
  );
  // onPress={() => navigation.navigate("RiceFieldInfo")}

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
          Quản lý ruộng lúa
        </Text>
      </View>

      <FlatList
        data={riceFields}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default RiceFields;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  label: {},

  fieldItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
