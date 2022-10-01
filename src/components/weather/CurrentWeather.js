import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Geolocation from "react-native-geolocation-service";

import nameList from "../../json/nameList";

import Loader from "../core/Loader";
import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getDayTime from "../../services/getDayTime";
import getWeatherByCoord from "../../services/getApiByCoord";

import initWeatherData from "../../json/initWeatherData";

StyleInit();

const CurrentWeather = ({ navigation }) => {
  const { getDateString, getTime } = getDayTime();
  const [currentTime, setCurrentTime] = useState(
    getTime(new Date()) + " ngày " + getDateString(new Date())
  );

  const [isLoading, setLoading] = useState(false);

  const [lat, setLat] = useState(10.8);
  const [lon, setLon] = useState(106.67);

  const [weatherData, setWeatherData] = useState(initWeatherData);

  // Get full data
  const getAPI = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getWeatherByCoord(lon, lat);
      // console.log("From CurrentWeather: ", data);
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      console.log("Can not call API");
    }
  }, [lon, lat]);

  useEffect(() => {
    getAPI();
  }, [getAPI]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLat(position.coords.latitude);
  //     setLon(position.coords.longitude);
  //     console.log(position);
  //   });
  // }, []);

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(
        getTime(new Date()) + " ngày " + getDateString(new Date())
      );
    }, 1000);
  }, []);

  return (
    <ScrollView>
      {/* <View flex paddingH-25 paddingT-120> */}
      {weatherData && (
        <View flex marginB-50>
          <UserOptionModal />

          <View center paddingT-50>
            <View>
              <Image
                style={styles.logo}
                source={require("../../assets/images/Logo.png")}
              />
            </View>
            <View marginV-20>
              <Text text50 green>
                Thời tiết hiện tại
              </Text>
              <Text center marginT-10>
                {currentTime}
              </Text>
            </View>
          </View>

          <View flex center style={styles.weatherContainer}>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="cloud-rain" size={50} color="green" />
              <Text text80>Lượng mưa</Text>
              <Text text60>
                {weatherData.current.rain ? weatherData.current.rain["1h"] : 0}{" "}
                <TextR style={styles.unit}>mm/s</TextR>
              </Text>
            </View>

            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="temperature-high" size={50} color="green" />
              <Text text80>Nhiệt độ</Text>
              <Text text60>
                {Math.round(weatherData.current.temp - 273.15)}{" "}
                <TextR style={styles.unit}>&#8451;</TextR>
              </Text>
            </View>

            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="wind" size={50} color="green" />
              <Text text80>Sức gió</Text>
              <Text text60>
                {" "}
                {weatherData.current.wind_speed}{" "}
                <TextR style={styles.unit}>m/s</TextR>
              </Text>
            </View>

            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="air-freshener" size={50} color="green" />
              <Text text80>Độ ẩm</Text>
              <Text text60>
                {" "}
                {weatherData.current.humidity}{" "}
                <TextR style={styles.unit}>%</TextR>
              </Text>
            </View>

            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="sun" size={50} color="green" />
              <Text text80>Chỉ số UV</Text>
              <Text text60> {weatherData.current.uvi}</Text>
            </View>

            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="cloud" size={50} color="green" />
              <Text text80>Mây che phủ</Text>
              <Text text60>
                {" "}
                {weatherData.current.clouds}{" "}
                <TextR style={styles.unit}>%</TextR>
              </Text>
            </View>
          </View>

          <View>
            <View marginV-10 center>
              <CustomButton
                label="Dự báo thời tiết theo giờ"
                text55
                style={styles.btn}
                onPress={() =>
                  navigation.navigate(nameList.hourlyWeatherForecast)
                }
              />
            </View>

            <View marginV-10 center>
              <CustomButton
                label="Dự báo thời tiết theo ngày"
                text55
                style={styles.btn}
                onPress={() =>
                  navigation.navigate(nameList.dailyWeatherForecast)
                }
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
export default CurrentWeather;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
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
  btn: {
    width: 300,
  },
});
