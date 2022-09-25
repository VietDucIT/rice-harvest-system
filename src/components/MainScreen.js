import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import { View, Text } from "react-native-ui-lib";

import { nameList } from "../App";

import CustomButton from "./core/CustomButton";
import { StyleInit } from "../config/StyleInit";
import UserOptionModal from "./user/UserOptionModal";

StyleInit();

const MainScreen = ({ navigation }) => {
  const role = "Nông dân";

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionModal />

        <View paddingT-50>
          <View center>
            <Image
              style={styles.logo}
              source={require("../assets/images/Logo.png")}
            />
          </View>
          <View center marginV-20>
            <Text text50 green>
              {role}
            </Text>
          </View>
        </View>

        <View>
          <View marginV-20 center>
            <CustomButton
              label="Thông tin thời tiết"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.currentWeather)}
            />
          </View>

          <View marginV-20 center>
            <CustomButton
              label="Cập nhật giá lúa"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.ricePrice)}
            />
          </View>

          <View marginV-20 center>
            <CustomButton
              label="Quản lý ruộng lúa"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.riceFields)}
            />
          </View>

          <View marginV-20 center>
            <CustomButton
              label="Quản lý vụ mùa"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.riceSeasons)}
            />
          </View>

          <View marginV-20 center>
            <CustomButton
              label="Quản lý khu vực thu mua"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.riceBuyingAreas)}
            />
          </View>

          <View marginV-20 center>
            <CustomButton
              label="Xem bản đồ ruộng đất"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate(nameList.map)}
            />
          </View>

          <View marginV-20 center>
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