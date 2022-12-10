import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
  ToastAndroid,
} from "react-native";
import { Picker, Text, View } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as Location from "expo-location";

import nameList from "../../json/nameList";

import Loader from "../core/Loader";
import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getDayTime from "../../services/time/getDayTime";
import getWeatherByCoord from "../../services/weather/getApiByCoord";
import getAddressAPIData from "../../services/address/getAddressAPIData";
import convertNameToCoord from "../../services/address/convertNameToCoord";
import convertCoordToName from "../../services/address/convertCoordToName";

import initWeatherData from "../../json/initWeatherData";

StyleInit();

const CurrentWeather = ({ navigation }) => {
  const { getDateString, getTime } = getDayTime();
  const [currentTime, setCurrentTime] = useState(
    getTime(new Date()) + " ngày " + getDateString(new Date())
  );

  const [isLoading, setLoading] = useState(false);

  const [searchedProvince, setSearchedProvince] = useState("");
  const [location, setLocation] = useState();
  const [errorLocation, setErrorLocation] = useState(null);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    // declare and self call function
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorLocation("Không thể truy cập thông tin vị trí của bạn.");
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      // console.log("CurrentWeather - Current Location: ", coords);
      setLocation(coords);
    })();
  }, []);

  // Convert Coord to Name
  const getLocationName = useCallback(async () => {
    try {
      const data = await convertCoordToName(
        location.latitude,
        location.longitude
      );
      setLocationName(data[0].local_names.vi);

      if (data) {
        ToastAndroid.show(
          `Hiển thị thời tiết tại \n${data[0].local_names.vi}`,
          ToastAndroid.LONG
        );
      }
      // Alert.alert(
      //   "Thông báo",
      //   `Hiển thị thông tin thời tiết tại ${data[0].local_names.vi}.`,
      //   [
      //     {
      //       text: "OK",
      //       style: "cancel",
      //     },
      //   ]
      // );
    } catch (err) {
      console.log("CurrentWeather - Can't convert Coord to Name.");
    }
  }, [location]);

  useEffect(() => {
    getLocationName();
  }, [getLocationName]);

  if (errorLocation) {
    Alert.alert("Lỗi", { errorLocation }, [
      {
        text: "Quay lại",
        onPress: () => navigation.goBack(),
      },
    ]);
  }
  // else if (location) {
  //   text = JSON.stringify(location);
  // }

  const [weatherData, setWeatherData] = useState(initWeatherData); //

  // Get full weather data
  const getAPI = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getWeatherByCoord(
        location.longitude,
        location.latitude
      );
      // console.log("CurrentWeather - From CurrentWeather: ", data);
      setWeatherData(data);
      setLoading(false);
    } catch (err) {
      console.log("CurrentWeather - Can't call weather API.");
    }
  }, [location]);

  useEffect(() => {
    getAPI();
  }, [getAPI]);

  // call API to get Province list for choosing
  const [addressAPI, setAddressAPI] = useState([]);
  const getAddressAPI = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAddressAPIData();
      setAddressAPI(data);
      setLoading(false);
    } catch (err) {
      console.log("CurrentWeather - Error while getting AddressAPI data.");
    }
  }, []);
  useEffect(() => {
    getAddressAPI();
  }, [getAddressAPI]);

  const onChangeSearchedProvince = async (text) => {
    let province = await text.value;
    if (province.includes("Tỉnh ")) {
      province = await province.slice(5);
    } else if (province.includes("Thành phố ")) {
      province = await province.slice(10);
    }
    console.log("CurrentWeather - Searching: ", province);
    setSearchedProvince(province);
  };

  const handleSearch = async () => {
    const coord = await convertNameToCoord(searchedProvince);
    console.log(
      "CurrentWeather - Lat: ",
      coord[0].lat,
      ", Lon: ",
      coord[0].lon
    );
    setLocation({ latitude: coord[0].lat, longitude: coord[0].lon });
  };

  useEffect(() => {
    setInterval(() => {
      setCurrentTime(
        getTime(new Date()) + " ngày " + getDateString(new Date())
      );
    }, 1000);
  }, []);

  return (
    <ScrollView>
      {weatherData === initWeatherData || isLoading ? (
        <Loader />
      ) : (
        <View flex marginB-50>
          <UserOptionButton navigation={navigation} />

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
              {locationName && (
                <View row center marginT-10>
                  <FontAwesome5
                    name="map-marker-alt"
                    size={20}
                    color={color.greenColor}
                  />
                  <Text> {locationName}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Search Bar */}
          <View flex center style={styles.searchContainer}>
            <View marginH-10 style={styles.searchBox}>
              <Picker
                migrateTextField
                text70
                placeholder={"Chọn tỉnh cần tìm..."}
                value={searchedProvince}
                onChange={onChangeSearchedProvince}
                style={styles.textField}
              >
                {addressAPI.map((item, index) => (
                  <Picker.Item
                    key={index}
                    value={item.name}
                    label={item.name}
                  />
                ))}
              </Picker>
            </View>

            <CustomButton
              label="Tìm"
              text55
              onPress={handleSearch}
              style={{ width: 70 }}
            />
          </View>

          <View flex center style={styles.weatherContainer}>
            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5
                name="cloud-rain"
                size={50}
                color={color.greenColor}
              />
              <Text text80>Lượng mưa</Text>
              <Text text60>
                {weatherData.current.rain ? weatherData.current.rain["1h"] : 0}{" "}
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
                {Math.round(weatherData.current.temp - 273.15)}{" "}
                <TextR style={styles.unit}>&#8451;</TextR>
              </Text>
            </View>

            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="wind" size={50} color={color.greenColor} />
              <Text text80>Sức gió</Text>
              <Text text60>
                {" "}
                {weatherData.current.wind_speed}{" "}
                <TextR style={styles.unit}>m/s</TextR>
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
                {" "}
                {weatherData.current.humidity}{" "}
                <TextR style={styles.unit}>%</TextR>
              </Text>
            </View>

            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="sun" size={50} color={color.greenColor} />
              <Text text80>Chỉ số UV</Text>
              <Text text60> {weatherData.current.uvi}</Text>
            </View>

            <View centerH padding-20 style={styles.weatherItem}>
              <FontAwesome5 name="cloud" size={50} color={color.greenColor} />
              <Text text80>Mây che phủ</Text>
              <Text text60>
                {" "}
                {weatherData.current.clouds}{" "}
                <TextR style={styles.unit}>%</TextR>
              </Text>
            </View>
          </View>

          <View marginT-10>
            <View marginV-15 center>
              <CustomButton
                label="Dự báo thời tiết theo giờ"
                text55
                style={styles.btn}
                onPress={() =>
                  navigation.navigate(nameList.hourlyWeatherForecast, {
                    hourlyWeatherData: weatherData.hourly,
                    timezone_offset: weatherData.timezone_offset,
                  })
                }
              />
            </View>

            <View marginV-15 center>
              <CustomButton
                label="Dự báo thời tiết theo ngày"
                text55
                style={styles.btn}
                onPress={() =>
                  navigation.navigate(nameList.dailyWeatherForecast, {
                    dailyWeatherData: weatherData.daily,
                    timezone_offset: weatherData.timezone_offset,
                  })
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
  searchContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  searchBox: {
    borderWidth: 0.5,
    borderColor: color.lightGreyColor,
    borderRadius: 10,
    paddingTop: 5,
    paddingLeft: 10,
    // borderRightWidth: 0,
    // borderTopLeftRadius: 20,
    // borderBottomLeftRadius: 20,
  },
  weatherContainer: {
    marginTop: 30,
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
    width: 270,
  },
});
