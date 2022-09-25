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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AddUserInfo" component={AddUserInfo} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="ModifyUserInfo" component={ModifyUserInfo} />
        <Stack.Screen name="CurrentWeather" component={CurrentWeather} />
        <Stack.Screen
          name="HourlyWeatherForecast"
          component={HourlyWeatherForecast}
        />
        <Stack.Screen
          name="DailyWeatherForecast"
          component={DailyWeatherForecast}
        />
        <Stack.Screen name="RiceFields" component={RiceFields} />
        <Stack.Screen name="RiceFieldInfo" component={RiceFieldInfo} />
        <Stack.Screen name="AddRiceField" component={AddRiceField} />
        <Stack.Screen name="ModifyRiceField" component={ModifyRiceField} />
        <Stack.Screen name="RiceSeasons" component={RiceSeasons} />
        <Stack.Screen name="RiceSeasonInfo" component={RiceSeasonInfo} />
        <Stack.Screen name="AddRiceSeason" component={AddRiceSeason} />
        <Stack.Screen name="ModifyRiceSeason" component={ModifyRiceSeason} />
        <Stack.Screen name="RiceBuyingAreas" component={RiceBuyingAreas} />
        <Stack.Screen
          name="RiceBuyingAreaInfo"
          component={RiceBuyingAreaInfo}
        />
        <Stack.Screen name="AddRiceBuyingArea" component={AddRiceBuyingArea} />
        <Stack.Screen
          name="ModifyRiceBuyingArea"
          component={ModifyRiceBuyingArea}
        />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="RicePrice" component={RicePrice} />
        <Stack.Screen name="Calculator" component={Calculator} />
        {/* <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUp" component={SignUp} /> */}
        <Stack.Screen name="Test" component={Test} />
        {/* ???? */}
        <Stack.Screen name="UserOptionModal" component={UserOptionModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return <Loader />;
}
