import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";

import Loader from "../core/Loader";
import UserOptionModal from "../user/UserOptionModal";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getDayTime from "../../services/getDayTime";

import initWeatherData from "../../json/initWeatherData";

StyleInit();

const DailyWeatherForecast = ({ navigation, route }) => {
  const { dailyWeatherData, timezone_offset } = route.params;
  // const [isLoading, setLoading] = useState(false);

  const { getDateString, getShortTime } = getDayTime();

  const list = () => {
    return dailyWeatherData.map((dayItem, index) => {
      const [isShow, setIsShow] = useState(false);

      const date = getDateString(
        new Date((dayItem.dt + timezone_offset - 7 * 3600) * 1000)
      );
      const sunriseTime = getShortTime(
        new Date((dayItem.sunrise + timezone_offset - 7 * 3600) * 1000)
      );
      const sunsetTime = getShortTime(
        new Date((dayItem.sunset + timezone_offset - 7 * 3600) * 1000)
      );

      return (
        <View left key={index} marginB-20>
          <Button
            flex
            link
            paddingL-50
            paddingR-80
            style={styles.dayItem}
            onPress={() => setIsShow(!isShow)}
          >
            <Text text50 green left>
              {date}
            </Text>
            {isShow ? (
              <FontAwesome5 name="chevron-up" size={20} color="green" />
            ) : (
              <FontAwesome5 name="chevron-down" size={20} color="green" />
            )}
          </Button>

          {isShow && (
            <View flex center style={styles.weatherContainer}>
              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="cloud-rain" size={50} color="green" />
                {/* <View centerV style={styles.weatherLabel}> */}
                <Text text80>Lượng mưa</Text>
                {/* </View> */}
                <Text text60>
                  {dayItem.rain ? dayItem.rain : 0}{" "}
                  <TextR style={styles.unit}>mm/s</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="infinity" size={50} color="green" />
                {/* <View centerV style={styles.weatherLabel}> */}
                <Text text80>Nhiệt độ</Text>
                <Text text80>trung bình</Text>
                {/* </View> */}
                <Text text60>
                  {Math.round(dayItem.temp.day - 273.15)}{" "}
                  <TextR style={styles.unit}>&#8451;</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="temperature-high" size={50} color="green" />
                <Text text80>Nhiệt độ</Text>
                <Text text80>cao nhất</Text>
                <Text text60>
                  {Math.round(dayItem.temp.max - 273.15)}{" "}
                  <TextR style={styles.unit}>&#8451;</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="temperature-low" size={50} color="green" />
                <Text text80>Nhiệt độ</Text>
                <Text text80>thấp nhất</Text>
                <Text text60>
                  {Math.round(dayItem.temp.min - 273.15)}{" "}
                  <TextR style={styles.unit}>&#8451;</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="wind" size={50} color="green" />
                <Text text80>Sức gió</Text>
                <Text text60>
                  {dayItem.wind_speed} <TextR style={styles.unit}>m/s</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="air-freshener" size={50} color="green" />
                <Text text80>Độ ẩm</Text>
                <Text text60>
                  {dayItem.humidity} <TextR style={styles.unit}>%</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="sun" size={50} color="green" />
                <Text text80>Chỉ số UV</Text>
                <Text text60>{dayItem.uvi}</Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="cloud" size={50} color="green" />
                <Text text80>Mây che phủ</Text>
                <Text text60>
                  {dayItem.clouds} <TextR style={styles.unit}>%</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <Feather name="sunrise" size={50} color="green" />
                <Text text80>Mặt trời mọc</Text>
                <Text text60>{sunriseTime}</Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <Feather name="sunset" size={50} color="green" />
                <Text text80>Mặt trời lặn</Text>
                <Text text60>{sunsetTime}</Text>
              </View>
            </View>
          )}
        </View>
      );
    });
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionModal />

        <View paddingT-30 marginB-20>
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
        {/* {isLoading ? <Loader /> : <View>{list()}</View>} */}
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
  weatherLabel: {
    height: 50,
  },
  unit: {
    fontSize: 18,
    fontWeight: "500",
  },
});
