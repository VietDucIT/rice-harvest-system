import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../json/nameList";

import CustomButton from "./core/CustomButton";
import UserOptionButton from "./core/UserOptionButton";

import { StyleInit } from "../config/StyleInit";

import checkNewestRicePrice from "../services/ricePrice/checkNewestRicePrice";
import updateRicePrice from "../services/ricePrice/updateRicePrice";

StyleInit();

const MainScreen = ({ navigation }) => {
  // HANDLE TO GET ROLE
  const role = 0;

  // call API to update Rice Price
  const updateRicePriceData = useCallback(async () => {
    try {
      // setLoading(true);
      const hasNewPost = await checkNewestRicePrice();
      // console.log("hasNewPost", hasNewPost);
      if (hasNewPost) {
        await updateRicePrice();
      }
      // setLoading(false);
    } catch (err) {
      console.log("Error while handle Rice Price data.");
    }
  }, []);

  useEffect(() => {
    updateRicePriceData();
  }, [updateRicePriceData]);

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionButton navigation={navigation} />

        <View paddingT-50>
          <View center>
            <Image
              style={styles.logo}
              source={require("../assets/images/Logo.png")}
            />
          </View>
          <View center marginV-15>
            <Text text50 green>
              {role === 0 ? "Nông dân" : "Thương lái"}
            </Text>
          </View>
        </View>

        <View>
          <View marginV-15 center>
            <CustomButton
              label="Thông tin thời tiết"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.currentWeather)}
            />
          </View>

          <View marginV-15 center>
            <CustomButton
              label="Cập nhật giá lúa"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.ricePrice)}
            />
          </View>

          {role === 0 && (
            <View marginV-15 center>
              <CustomButton
                label="Quản lý ruộng lúa"
                text60
                style={styles.btn}
                onPress={() => navigation.navigate(nameList.riceFields)}
              />
            </View>
          )}

          {role === 0 && (
            <View marginV-15 center>
              <CustomButton
                label="Quản lý vụ mùa"
                text60
                style={styles.btn}
                onPress={() => navigation.navigate(nameList.riceSeasons)}
              />
            </View>
          )}

          {role === 1 && (
            <View marginV-15 center>
              <CustomButton
                label="Quản lý khu vực thu mua"
                text60
                style={styles.btn}
                onPress={() => navigation.navigate(nameList.riceBuyingAreas)}
              />
            </View>
          )}

          {role === 1 && (
            <View marginV-15 center>
              <CustomButton
                label="Quản lý đề xuất thu mua"
                text60
                style={styles.btn}
                onPress={() => navigation.navigate(nameList.suggestToBuys)}
              />
            </View>
          )}

          {role === 1 && (
            <View marginV-15 center>
              <CustomButton
                label="Tìm kiếm nông dân"
                text60
                style={styles.btn}
                onPress={() => navigation.navigate(nameList.findUsers)}
              />
            </View>
          )}

          <View marginV-15 center>
            <CustomButton
              label="Xem bản đồ ruộng đất"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.map)}
            />
          </View>

          <View marginV-15 center>
            <CustomButton
              label="Máy tính"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.calculator)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  btn: {
    width: 300,
  },
});
