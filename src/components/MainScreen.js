import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../json/nameList";

import CustomButton from "./core/CustomButton";
import UserOptionButton from "./core/UserOptionButton";

import { StyleInit } from "../config/StyleInit";

import checkNewestRicePrice from "../services/ricePrice/checkNewestRicePrice";
import updateRicePrice from "../services/ricePrice/updateRicePrice";
import getUserIdStored from "../services/user/getUserIdStored";
import getUser from "../services/user/getUser";

StyleInit();

const MainScreen = ({ navigation }) => {
  // get User Info via ID to get ROLE
  const [userData, setUserData] = useState({});
  const getUserData = useCallback(async () => {
    try {
      // setLoading(true);
      const userId = await getUserIdStored();
      console.log("User ID from SecureStore: ", userId);
      const data = await getUser(userId);
      // console.log("User data: ", data);
      setUserData(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting User data.");
    }
  }, []);
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  // call API to update Rice Price
  const updateRicePriceData = useCallback(async () => {
    try {
      // setLoading(true);
      const isNeedToUpdate = await checkNewestRicePrice();
      console.log("IsNeedToUpdate: ", isNeedToUpdate);
      if (isNeedToUpdate) {
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
              {userData.role === 0 ? "Nông dân" : "Thương lái"}
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

          {userData.role === 0 && (
            <View marginV-15 center>
              <CustomButton
                label="Quản lý ruộng lúa"
                text60
                style={styles.btn}
                onPress={() => navigation.navigate(nameList.riceFields)}
              />
            </View>
          )}

          {userData.role === 0 && (
            <View marginV-15 center>
              <CustomButton
                label="Quản lý vụ mùa"
                text60
                style={styles.btn}
                onPress={() => navigation.navigate(nameList.riceSeasons)}
              />
            </View>
          )}

          {userData.role === 1 && (
            <View marginV-15 center>
              <CustomButton
                label="Quản lý khu vực thu mua"
                text60
                style={styles.btn}
                onPress={() => navigation.navigate(nameList.riceBuyingAreas)}
              />
            </View>
          )}

          {userData.role === 1 && (
            <View marginV-15 center>
              <CustomButton
                label="Quản lý đề xuất thu mua"
                text60
                style={styles.btn}
                onPress={() => navigation.navigate(nameList.suggestToBuys)}
              />
            </View>
          )}

          {userData.role === 1 && (
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
