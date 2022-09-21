import React, { useState } from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";

import UserOptionModal from "../user/UserOptionModal";
import Color from "../../config/color";
import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

import initWeatherData from "../../json/initWeatherData";
import getDayTime from "../../services/getDayTime";

StyleInit();

const DailyWeatherForecast = ({ navigation }) => {
  // const dayItems = ["19/9", "20/9", "21/9"];
  const [weatherData, setWeatherData] = useState(initWeatherData);

  const { getDateString } = getDayTime();

  const list = () => {
    return weatherData.daily.map((dayItem, index) => {
      const date = getDateString(
        new Date((dayItem.dt + weatherData.timezone_offset - 7 * 3600) * 1000)
      );
      // console.log("Hehe: ", weatherData.timezone_offset);
      return (
        <View left key={index} paddingB-10>
          <Button flex link paddingL-50 paddingR-80 style={styles.dayItem}>
            <Text text50 green left>
              {date}
            </Text>
            <FontAwesome5 name="chevron-down" size={20} color="green" />
          </Button>
          <View flex center style={styles.weatherContainer}>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="cloud-rain" size={50} color="green" />
              <Text text80>Lượng mưa</Text>
              <Text text60> {dayItem.rain ? dayItem.rain : 0} mm/s</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="infinity" size={50} color="green" />
              <Text text80>Nhiệt độ trung bình</Text>
              <Text text60>
                {" "}
                {Math.round(dayItem.temp.day - 273.15)} &#8451;
              </Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="temperature-high" size={50} color="green" />
              <Text text80>Nhiệt độ cao nhất</Text>
              <Text text60>
                {" "}
                {Math.round(dayItem.temp.max - 273.15)} &#8451;
              </Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="temperature-low" size={50} color="green" />
              <Text text80>Nhiệt độ thấp nhất</Text>
              <Text text60>
                {" "}
                {Math.round(dayItem.temp.min - 273.15)} &#8451;
              </Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="wind" size={50} color="green" />
              <Text text80>Sức gió</Text>
              <Text text60> {dayItem.wind_speed} m/s</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="air-freshener" size={50} color="green" />
              <Text text80>Độ ẩm</Text>
              <Text text60> {dayItem.humidity} %</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="sun" size={50} color="green" />
              <Text text80>Chỉ số UV</Text>
              <Text text60> {dayItem.uvi}</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="cloud" size={50} color="green" />
              <Text text80>Mây che phủ</Text>
              <Text text60> {dayItem.clouds} %</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <Feather name="sunrise" size={50} color="green" />
              <Text text80>Mặt trời mọc</Text>
              <Text text60> {dayItem.sunrise} </Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <Feather name="sunset" size={50} color="green" />
              <Text text80>Mặt trời lặn</Text>
              <Text text60> {dayItem.sunset} </Text>
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
