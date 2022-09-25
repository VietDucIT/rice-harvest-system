import React, { useState, useEffect } from "react";
import { ScrollView, Image, StyleSheet, Text as TextR } from "react-native";
import { View, Text } from "react-native-ui-lib";

import { nameList } from "../../App";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

import Map from "../Map/Map";

StyleInit();

const RiceBuyingAreaInfo = ({ navigation }) => {
  const buyingAreaData = {
    id: 1,
    name: "Khu vực 1",
    address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
    description: "Bờ đông kênh Cầu Tre",
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
                Thông tin khu vực thu mua
              </Text>
            </View>
          </View>

          <View flex style={styles.contentWrapper} marginH-25 marginV-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tên: </TextR>
              <Text>{buyingAreaData.name}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Địa chỉ: </TextR>
              <Text>{buyingAreaData.address}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Mô tả: </TextR>
              <Text>{buyingAreaData.description}</Text>
            </View>

            <View flex style={styles.mapContainer}>
              <Map />
            </View>
          </View>

          <View flex marginT-20 center>
            <CustomButton
              label="Sửa"
              onPress={() => navigation.navigate(nameList.modifyRiceBuyingArea)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceBuyingAreaInfo;

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
