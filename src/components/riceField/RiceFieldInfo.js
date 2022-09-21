import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  StatusBar,
  Text as TextR,
} from "react-native";
import { View, Text } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

import Map from "../Map/Map";

StyleInit();

const RiceFieldInfo = ({ navigation }) => {
  const fieldData = {
    id: 1,
    address: "Ấp Mỹ Đức, xã Thiện Mỹ, huyện Châu Thành, tỉnh Sóc Trăng",
    coord: ["(1,1)", "(2,2)", "(3,3)", "(4,4)"],
    description: "Ruộng sau nhà bác 4",
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionModal />

        <View>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Thông tin ruộng lúa
              </Text>
            </View>
          </View>

          <View flex style={styles.contentWrapper} marginH-25 marginV-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Mẫu ruộng số: </TextR>
              <Text>{fieldData.id}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Địa chỉ: </TextR>
              <Text> {fieldData.address}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tọa độ các điểm: </TextR>
              <Text>{fieldData.coord}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Mô tả: </TextR>
              <Text>{fieldData.description}</Text>
            </View>

            <View flex style={styles.mapContainer}>
              <Map />
            </View>
          </View>

          <View flex marginT-20 center>
            <CustomButton
              label="Sửa"
              onPress={() => navigation.navigate("ModifyRiceField")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceFieldInfo;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  contentWrapper: {
    // flexDirection: "column",
    // flexWrap: "wrap",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemLabel: {
    fontWeight: "500",
  },
  mapContainer: {
    width: "100%",
    height: 400,
    marginTop: 20,
    borderWidth: 2,
    borderColor: "green",
  },
});
