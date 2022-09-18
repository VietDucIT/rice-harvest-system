import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";

import Color from "../../config/color";
import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const DailyWeatherForecast = ({ navigation }) => {
  const dayItems = ["19/9", "20/9", "21/9"];
  const list = () => {
    return dayItems.map((dayItem, index) => {
      return (
        <View left key={index} paddingB-10>
          <Button flex link paddingL-50 paddingR-80 style={styles.dayItem}>
            <Text text50 green left>
              {dayItem}
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
              <FontAwesome5 name="infinity" size={50} color="green" />
              <Text text80>Nhiệt độ trung bình</Text>
              <Text text60> {50} &#8451;</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="temperature-high" size={50} color="green" />
              <Text text80>Nhiệt độ cao nhất</Text>
              <Text text60> {50} &#8451;</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="temperature-low" size={50} color="green" />
              <Text text80>Nhiệt độ thấp nhất</Text>
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
            <View centerH padding-20 style={styles.weatherItem}>
              <Feather name="sunrise" size={50} color="green" />
              <Text text80>Mặt trời mọc</Text>
              <Text text60> {50} </Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <Feather name="sunset" size={50} color="green" />
              <Text text80>Mặt trời lặn</Text>
              <Text text60> {50} </Text>
            </View>
          </View>
        </View>
      );
    });
  };

  return (
    <ScrollView>
      {/* <View flex paddingH-25 paddingT-120> */}
      <View flex marginV-50>
        {/* <View left paddingL-10>
          <Button link green>
            <FontAwesome5 name="home" size={30} color="green" />
          </Button>
        </View> */}

        <View paddingT-30>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
          </View>
          <View center marginV-20>
            <Text text50 green>
              Dự báo thời tiết theo ngày
            </Text>
          </View>
        </View>

        <View>{list()}</View>
      </View>
    </ScrollView>
  );
};
export default DailyWeatherForecast;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  dayItem: {
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
