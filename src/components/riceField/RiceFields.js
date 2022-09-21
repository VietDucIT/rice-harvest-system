import React from "react";
import { Image, StyleSheet, FlatList } from "react-native";
import { View, Text } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import { StyleInit } from "../../config/StyleInit";
import CustomButton from "../core/CustomButton";

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
              Quản lý ruộng lúa
            </Text>
          </View>
        </View>

        <View marginT-20>
          <FlatList
            data={riceFields}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View marginT-30 center>
          <CustomButton
            label="Thêm"
            onPress={() => navigation.navigate("AddRiceField")}
          />
        </View>
      </View>
    </View>
  );
};
export default RiceFields;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  fieldItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
