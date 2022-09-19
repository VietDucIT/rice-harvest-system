import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-native";
// import queryString from "query-string";
import { ScrollView, Image, StyleSheet } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Geolocation from "react-native-geolocation-service";

import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

import getDayTime from "../../services/getDayTime";
import getWeatherByName from "../../services/getApiByName";

import Loader from "../core/Loader";
import cityList from "../../json/city";
import initWeatherData from "../../json/initWeatherData";

StyleInit();

const CurrentWeather = ({ navigation }) => {
  // const location = useLocation();
  // const { city } = queryString.parse(location.search);

  // const [isLoading, setLoading] = useState(false);

  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);

  const [weatherData, setWeatherData] = useState(initWeatherData);

  // Geolocation.getCurrentPosition(
  //   (position) => {
  //     console.log(position);
  //   },
  //   (error) => {
  //     // See error code charts below.
  //     console.log(error.code, error.message);
  //   },
  //   { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  // );

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setLat(position.coords.latitude);
  //     setLon(position.coords.longitude);
  //     console.log(position);
  //   });
  // }, []);

  return (
    <ScrollView>
      {/* <View flex paddingH-25 paddingT-120> */}
      {/* DELETE ! */}
      {weatherData && (
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
                Thời tiết hiện tại
              </Text>
            </View>
          </View>

          <View flex center style={styles.weatherContainer}>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="cloud-rain" size={50} color="green" />
              <Text text80>Lượng mưa</Text>
              <Text text60>
                {weatherData.current.rain ? weatherData.current.rain : 0} mm/s
              </Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="temperature-high" size={50} color="green" />
              <Text text80>Nhiệt độ</Text>
              <Text text60>
                {Math.round(weatherData.current.temp - 273.15)} &#8451;
              </Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="wind" size={50} color="green" />
              <Text text80>Sức gió</Text>
              <Text text60> {weatherData.current.wind_speed} m/s</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="air-freshener" size={50} color="green" />
              <Text text80>Độ ẩm</Text>
              <Text text60> {weatherData.current.humidity} %</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="sun" size={50} color="green" />
              <Text text80>Chỉ số UV</Text>
              <Text text60> {weatherData.current.uvi}</Text>
            </View>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="cloud" size={50} color="green" />
              <Text text80>Mây che phủ</Text>
              <Text text60> {weatherData.current.clouds} %</Text>
            </View>
          </View>

          <View>
            <View marginV-10 center>
              <CustomButton
                label="Dự báo thời tiết theo giờ"
                text55
                style={styles.btn}
                onPress={() => navigation.navigate("HourlyWeatherForecast")}
              />
            </View>
            <View marginV-10 center>
              <CustomButton
                label="Dự báo thời tiết theo ngày"
                text55
                style={styles.btn}
                onPress={() => navigation.navigate("DailyWeatherForecast")}
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
  btn: {
    width: 300,
  },
});
