import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirstScreen from "./components/FirstScreen";
import MainScreen from "./components/MainScreen";

import SignUp from "./components/user/SignUp";
import AddUserInfo from "./components/user/AddUserInfo";
import ModifyUserInfo from "./components/user/ModifyUserInfo";
import UserInfo from "./components/user/UserInfo";
import UserOptionModal from "./components/user/UserOptionModal";

import CurrentWeather from "./components/weather/CurrentWeather";
import HourlyWeatherForecast from "./components/weather/HourlyWeatherForecast";
import DailyWeatherForecast from "./components/weather/DailyWeatherForecast";

import RiceFields from "./components/riceField/RiceFields";
import RiceFieldInfo from "./components/riceField/RiceFieldInfo";
import AddRiceField from "./components/riceField/AddRiceField";
import ModifyRiceField from "./components/riceField/ModifyRiceField";

import RiceSeasons from "./components/riceSeason/RiceSeasons";
import RiceSeasonInfo from "./components/riceSeason/RiceSeasonInfo";
import AddRiceSeason from "./components/riceSeason/AddRiceSeason";
import ModifyRiceSeason from "./components/riceSeason/ModifyRiceSeason";

import RiceBuyingAreas from "./components/riceBuyingArea/RiceBuyingAreas";
import RiceBuyingAreaInfo from "./components/riceBuyingArea/RiceBuyingAreaInfo";
import AddRiceBuyingArea from "./components/riceBuyingArea/AddRiceBuyingArea";
import ModifyRiceBuyingArea from "./components/riceBuyingArea/ModifyRiceBuyingArea";

import Map from "./components/Map/Map";
import RicePrice from "./components/rice/RicePrice";

import Calculator from "./components/calculator/Calculator";

import Test from "./components/Test";
import Loader from "./components/core/Loader";

const Stack = createNativeStackNavigator();

const nameList = {
  firstScreen: "Đăng nhập",
  mainScreen: "Màn hình chính",
  signUp: "Đăng ký",
  addUserInfo: "Đăng ký thông tin",
  userInfo: "Thông tin người dùng",
  modifyUserInfo: "Chỉnh sửa người dùng",
  currentWeather: "Thời tiết hiện tại",
  hourlyWeatherForecast: "Dự báo thời tiết theo giờ",
  dailyWeatherForecast: "Dự báo thời tiết theo ngày",
  riceFields: "Danh sách ruộng lúa",
  riceFieldInfo: "Thông tin ruộng lúa",
  addRiceField: "Thêm ruộng lúa",
  modifyRiceField: "Sửa ruộng lúa",
  riceSeasons: "Danh sách vụ mùa",
  riceSeasonInfo: "Thông tin vụ mùa",
  addRiceSeason: "Thêm vụ mùa",
  modifyRiceSeason: "Sửa vụ mùa",
  riceBuyingAreas: "Danh sách khu vực thu mua",
  riceBuyingAreaInfo: "Thông tin khu vực thu mua",
  addRiceBuyingArea: "Thêm khu vực thu mua",
  modifyRiceBuyingArea: "Sửa khu vực thu mua",
  map: "Bản đồ",
  ricePrice: "Giá lúa",
  calculator: "Máy tính",
  userOptionModal: "Tùy chọn người dùng",
  test: "Test",
};

export default function App() {
  console.log(nameList);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={nameList.firstScreen} component={FirstScreen} />
        <Stack.Screen name={nameList.mainScreen} component={MainScreen} />
        <Stack.Screen name={nameList.signUp} component={SignUp} />
        <Stack.Screen name={nameList.addUserInfo} component={AddUserInfo} />
        <Stack.Screen name={nameList.userInfo} component={UserInfo} />
        <Stack.Screen
          name={nameList.modifyUserInfo}
          component={ModifyUserInfo}
        />
        <Stack.Screen
          name={nameList.currentWeather}
          component={CurrentWeather}
        />
        <Stack.Screen
          name={nameList.hourlyWeatherForecast}
          component={HourlyWeatherForecast}
        />
        <Stack.Screen
          name={nameList.dailyWeatherForecast}
          component={DailyWeatherForecast}
        />
        <Stack.Screen name={nameList.riceFields} component={RiceFields} />
        <Stack.Screen name={nameList.riceFieldInfo} component={RiceFieldInfo} />
        <Stack.Screen name={nameList.addRiceField} component={AddRiceField} />
        <Stack.Screen
          name={nameList.modifyRiceField}
          component={ModifyRiceField}
        />
        <Stack.Screen name={nameList.riceSeasons} component={RiceSeasons} />
        <Stack.Screen
          name={nameList.riceSeasonInfo}
          component={RiceSeasonInfo}
        />
        <Stack.Screen name={nameList.addRiceSeason} component={AddRiceSeason} />
        <Stack.Screen
          name={nameList.modifyRiceSeason}
          component={ModifyRiceSeason}
        />
        <Stack.Screen
          name={nameList.riceBuyingAreas}
          component={RiceBuyingAreas}
        />
        <Stack.Screen
          name={nameList.riceBuyingAreaInfo}
          component={RiceBuyingAreaInfo}
        />
        <Stack.Screen
          name={nameList.addRiceBuyingArea}
          component={AddRiceBuyingArea}
        />
        <Stack.Screen
          name={nameList.modifyRiceBuyingArea}
          component={ModifyRiceBuyingArea}
        />
        <Stack.Screen name={nameList.map} component={Map} />
        <Stack.Screen name={nameList.ricePrice} component={RicePrice} />
        <Stack.Screen name={nameList.calculator} component={Calculator} />
        <Stack.Screen name={nameList.test} component={Test} />
        {/* ???? */}
        <Stack.Screen
          name={nameList.userOptionModal}
          component={UserOptionModal}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { nameList };
