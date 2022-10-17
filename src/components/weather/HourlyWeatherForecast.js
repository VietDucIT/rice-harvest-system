import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import UserOptionModal from "../user/UserOptionModal";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getDayTime from "../../services/time/getDayTime";

StyleInit();

const HourlyWeatherForecast = ({ navigation, route }) => {
  const { hourlyWeatherData, timezone_offset } = route.params;
  // console.log("From HourlyWeatherForecast 1: ", hourlyWeatherData);
  // console.log("From HourlyWeatherForecast 2: ", timezone_offset);
  const { getDateTimeString } = getDayTime();

  const list = () => {
    return hourlyWeatherData.map((hourItem, index) => {
      const [isShow, setIsShow] = useState(false);

      const date = new Date((hourItem.dt + timezone_offset - 7 * 3600) * 1000);
      const hour = getDateTimeString(date);

      return (
        <View left key={index} marginB-20>
          <Button
            flex
            link
            paddingL-50
            paddingR-80
            style={styles.hourItem}
            onPress={() => setIsShow(!isShow)}
          >
            <Text text50 green left>
              {hour}
            </Text>
            {isShow ? (
              <FontAwesome5
                name="chevron-up"
                size={20}
                color={color.greenColor}
              />
            ) : (
              <FontAwesome5
                name="chevron-down"
                size={20}
                color={color.greenColor}
              />
            )}
          </Button>

          {isShow && (
            <View flex center style={styles.weatherContainer}>
              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5
                  name="cloud-rain"
                  size={50}
                  color={color.greenColor}
                />
                <Text text80>Lượng mưa</Text>
                <Text text60>
                  {hourItem.rain ? hourItem.rain["1h"] : 0}{" "}
                  <TextR style={styles.unit}>mm/s</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5
                  name="temperature-high"
                  size={50}
                  color={color.greenColor}
                />
                <Text text80>Nhiệt độ</Text>
                <Text text60>
                  {Math.round(hourItem.temp - 273.15)}{" "}
                  <TextR style={styles.unit}>&#8451;</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="wind" size={50} color={color.greenColor} />
                <Text text80>Sức gió</Text>
                <Text text60>
                  {hourItem.wind_speed} <TextR style={styles.unit}>m/s</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5
                  name="air-freshener"
                  size={50}
                  color={color.greenColor}
                />
                <Text text80>Độ ẩm</Text>
                <Text text60>
                  {hourItem.humidity} <TextR style={styles.unit}>%</TextR>
                </Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="sun" size={50} color={color.greenColor} />
                <Text text80>Chỉ số UV</Text>
                <Text text60>{hourItem.uvi}</Text>
              </View>

              <View centerH padding-20 style={styles.weatherItem}>
                <FontAwesome5 name="cloud" size={50} color={color.greenColor} />
                <Text text80>Mây che phủ</Text>
                <Text text60>
                  {hourItem.clouds} <TextR style={styles.unit}>%</TextR>
                </Text>
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
  unit: {
    fontSize: 18,
    fontWeight: "500",
  },
});
