import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirstScreen from "./components/FirstScreen";
import MainScreen from "./components/MainScreen";

import SignUp from "./components/user/SignUp";
import ModifyUserInfo from "./components/user/ModifyUserInfo";

import CurrentWeather from "./components/weather/CurrentWeather";
import HourlyWeatherForecast from "./components/weather/HourlyWeatherForecast";
import DailyWeatherForecast from "./components/weather/DailyWeatherForecast";

import ModifyRiceField from "./components/riceField/ModifyRiceField";
import Map from "./components/Map/Map";

import Loader from "./components/core/Loader";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="SignUp" component={SignUp} />
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
        <Stack.Screen name="ModifyRiceField" component={ModifyRiceField} />
        <Stack.Screen name="Map" component={Map} />
        {/* <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUp" component={SignUp} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );

  // return <Loader />;
}
