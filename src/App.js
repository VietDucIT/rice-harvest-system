import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirstScreen from "./components/FirstScreen";
import MainScreen from "./components/MainScreen";

import Calculator from "./components/calculator/Calculator";

import FarmerInfo from "./components/farmer/FarmerInfo";
import FindFarmers from "./components/farmer/FindFarmers";

import Map from "./components/Map/Map";

import RicePrice from "./components/rice/RicePrice";

import AddRiceBuyingArea from "./components/riceBuyingArea/AddRiceBuyingArea";
import ModifyRiceBuyingArea from "./components/riceBuyingArea/ModifyRiceBuyingArea";
import RiceBuyingAreaInfo from "./components/riceBuyingArea/RiceBuyingAreaInfo";
import RiceBuyingAreas from "./components/riceBuyingArea/RiceBuyingAreas";

import AddRiceField from "./components/riceField/AddRiceField";
import ModifyRiceField from "./components/riceField/ModifyRiceField";
import RiceFieldInfo from "./components/riceField/RiceFieldInfo";
import RiceFields from "./components/riceField/RiceFields";

import AddRiceSeason from "./components/riceSeason/AddRiceSeason";
import ModifyRiceSeason from "./components/riceSeason/ModifyRiceSeason";
import RiceSeasonInfo from "./components/riceSeason/RiceSeasonInfo";
import RiceSeasonInfoForTrader from "./components/riceSeason/RiceSeasonInfoForTrader";
import RiceSeasons from "./components/riceSeason/RiceSeasons";

import ModifySuggestToBuy from "./components/suggestToBuy/ModifySuggestToBuy";
import SuggestToBuy from "./components/suggestToBuy/SuggestToBuy";
import SuggestToBuyInfo from "./components/suggestToBuy/SuggestToBuyInfo";
import SuggestToBuyInfoForFarmer from "./components/suggestToBuy/SuggestToBuyInfoForFarmer";
import SuggestToBuys from "./components/suggestToBuy/SuggestToBuys";

import AddUserInfo from "./components/user/AddUserInfo";
import ModifyUserInfo from "./components/user/ModifyUserInfo";
import SignUp from "./components/user/SignUp";
import UserInfo from "./components/user/UserInfo";
import UserOptionModal from "./components/user/UserOptionModal";

import CurrentWeather from "./components/weather/CurrentWeather";
import DailyWeatherForecast from "./components/weather/DailyWeatherForecast";
import HourlyWeatherForecast from "./components/weather/HourlyWeatherForecast";

import Loader from "./components/core/Loader";
import Test from "./components/Test";

import nameList from "./json/nameList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={nameList.firstScreen} component={FirstScreen} />
        <Stack.Screen name={nameList.mainScreen} component={MainScreen} />
        <Stack.Screen name={nameList.calculator} component={Calculator} />
        <Stack.Screen name={nameList.farmerInfo} component={FarmerInfo} />
        <Stack.Screen name={nameList.findFarmers} component={FindFarmers} />
        <Stack.Screen name={nameList.map} component={Map} />
        <Stack.Screen name={nameList.ricePrice} component={RicePrice} />
        <Stack.Screen
          name={nameList.addRiceBuyingArea}
          component={AddRiceBuyingArea}
        />
        <Stack.Screen
          name={nameList.modifyRiceBuyingArea}
          component={ModifyRiceBuyingArea}
        />
        <Stack.Screen
          name={nameList.riceBuyingAreaInfo}
          component={RiceBuyingAreaInfo}
        />
        <Stack.Screen
          name={nameList.riceBuyingAreas}
          component={RiceBuyingAreas}
        />
        <Stack.Screen name={nameList.addRiceField} component={AddRiceField} />
        <Stack.Screen
          name={nameList.modifyRiceField}
          component={ModifyRiceField}
        />
        <Stack.Screen name={nameList.riceFieldInfo} component={RiceFieldInfo} />
        <Stack.Screen name={nameList.riceFields} component={RiceFields} />
        <Stack.Screen name={nameList.addRiceSeason} component={AddRiceSeason} />
        <Stack.Screen
          name={nameList.modifyRiceSeason}
          component={ModifyRiceSeason}
        />
        <Stack.Screen
          name={nameList.riceSeasonInfo}
          component={RiceSeasonInfo}
        />
        <Stack.Screen
          name={nameList.riceSeasonInfoForTrader}
          component={RiceSeasonInfoForTrader}
        />
        <Stack.Screen name={nameList.riceSeasons} component={RiceSeasons} />
        <Stack.Screen
          name={nameList.modifySuggestToBuy}
          component={ModifySuggestToBuy}
        />
        <Stack.Screen name={nameList.suggestToBuy} component={SuggestToBuy} />
        <Stack.Screen
          name={nameList.suggestToBuyInfo}
          component={SuggestToBuyInfo}
        />
        <Stack.Screen
          name={nameList.suggestToBuyInfoForFarmer}
          component={SuggestToBuyInfoForFarmer}
        />
        <Stack.Screen name={nameList.suggestToBuys} component={SuggestToBuys} />
        <Stack.Screen name={nameList.addUserInfo} component={AddUserInfo} />
        <Stack.Screen
          name={nameList.modifyUserInfo}
          component={ModifyUserInfo}
        />
        <Stack.Screen name={nameList.signUp} component={SignUp} />
        <Stack.Screen name={nameList.userInfo} component={UserInfo} />
        {/* ???? */}
        <Stack.Screen
          name={nameList.userOptionModal}
          component={UserOptionModal}
        />
        <Stack.Screen
          name={nameList.currentWeather}
          component={CurrentWeather}
        />
        <Stack.Screen
          name={nameList.dailyWeatherForecast}
          component={DailyWeatherForecast}
        />
        <Stack.Screen
          name={nameList.hourlyWeatherForecast}
          component={HourlyWeatherForecast}
        />
        <Stack.Screen name={nameList.test} component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { nameList };
