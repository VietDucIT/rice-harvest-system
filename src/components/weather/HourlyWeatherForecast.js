import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import UserOptionModal from "../user/UserOptionModal";
import Color from "../../config/color";
import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const HourlyWeatherForecast = ({ navigation }) => {
  const hourItems = ["11:00", "12:00", "13:00"];
  const list = () => {
    return hourItems.map((hourItem, index) => {
      return (
        <View left key={index} paddingB-10>
          <Button flex link paddingL-50 paddingR-80 style={styles.hourItem}>
            <Text text50 green left>
              {hourItem}
            </Text>
            <FontAwesome5 name="chevron-down" size={20} color="green" />
          </Button>
          <View flex center style={styles.weatherContainer}>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="cloud-rain" size={50} color="green" />
              <Text text80>Lượng mưa</Text>
              <Text text60> {50} mm/s</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="temperature-high" size={50} color="green" />
              <Text text80>Nhiệt độ</Text>
              <Text text60> {50} &#8451;</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="wind" size={50} color="green" />
              <Text text80>Sức gió</Text>
              <Text text60> {50} m/s</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="air-freshener" size={50} color="green" />
              <Text text80>Độ ẩm</Text>
              <Text text60> {50} %</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="sun" size={50} color="green" />
              <Text text80>Chỉ số UV</Text>
              <Text text60> {50}</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="cloud" size={50} color="green" />
              <Text text80>Mây che phủ</Text>
              <Text text60> {50} %</Text>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionModal />

        <View paddingT-30>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
          </View>
          <View center marginV-20>
            <Text text50 green>
              Dự báo thời tiết theo giờ
            </Text>
          </View>
        </View>

        <View>{list()}</View>
      </View>
    </ScrollView>
  );
};
export default HourlyWeatherForecast;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  hourItem: {
    // backgroundColor: Color.green,
    // borderWith: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  weatherContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  weatherItem: {
    width: 150,
  },
});
