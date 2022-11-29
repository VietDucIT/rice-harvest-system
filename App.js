// This file is for running in Android Studio
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirstScreen from "./src/components/FirstScreen";
import MainScreen from "./src/components/MainScreen";

import BillInfo from "./src/components/bill/BillInfo";
import Bills from "./src/components/bill/Bills";

import Calculator from "./src/components/calculator/Calculator";

import Contacts from "./src/components/contact/Contacts";

import FarmerInfo from "./src/components/farmer/FarmerInfo";
import FindFarmers from "./src/components/farmer/FindFarmers";

import FullMap from "./src/components/map/FullMap";

import Notifications from "./src/components/notification/Notifications";

import RicePrice from "./src/components/rice/RicePrice";

import AddRiceBuyingArea from "./src/components/riceBuyingArea/AddRiceBuyingArea";
import ModifyRiceBuyingArea from "./src/components/riceBuyingArea/ModifyRiceBuyingArea";
import RiceBuyingAreaInfo from "./src/components/riceBuyingArea/RiceBuyingAreaInfo";
import RiceBuyingAreas from "./src/components/riceBuyingArea/RiceBuyingAreas";

import AddRiceField from "./src/components/riceField/AddRiceField";
import ModifyRiceField from "./src/components/riceField/ModifyRiceField";
import RiceFieldInfo from "./src/components/riceField/RiceFieldInfo";
import RiceFields from "./src/components/riceField/RiceFields";

import AddRiceSeason from "./src/components/riceSeason/AddRiceSeason";
import ModifyRiceSeason from "./src/components/riceSeason/ModifyRiceSeason";
import RiceSeasonInfo from "./src/components/riceSeason/RiceSeasonInfo";
import RiceSeasonInfoForTrader from "./src/components/riceSeason/RiceSeasonInfoForTrader";
import RiceSeasons from "./src/components/riceSeason/RiceSeasons";

import ModifySuggestToBuy from "./src/components/suggestToBuy/ModifySuggestToBuy";
import SuggestToBuy from "./src/components/suggestToBuy/SuggestToBuy";
import SuggestToBuyInfo from "./src/components/suggestToBuy/SuggestToBuyInfo";
import SuggestToBuyInfoForFarmer from "./src/components/suggestToBuy/SuggestToBuyInfoForFarmer";
import SuggestToBuys from "./src/components/suggestToBuy/SuggestToBuys";

import AddUserInfo from "./src/components/user/AddUserInfo";
import ModifyUserInfo from "./src/components/user/ModifyUserInfo";
import UserInfo from "./src/components/user/UserInfo";
import UserOptionModal from "./src/components/user/UserOptionModal";

import CurrentWeather from "./src/components/weather/CurrentWeather";
import DailyWeatherForecast from "./src/components/weather/DailyWeatherForecast";
import HourlyWeatherForecast from "./src/components/weather/HourlyWeatherForecast";

import nameList from "./src/json/nameList";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={nameList.firstScreen} component={FirstScreen} />
        <Stack.Screen name={nameList.mainScreen} component={MainScreen} />
        <Stack.Screen name={nameList.billInfo} component={BillInfo} />
        <Stack.Screen name={nameList.bills} component={Bills} />
        <Stack.Screen name={nameList.calculator} component={Calculator} />
        <Stack.Screen name={nameList.contacts} component={Contacts} />
        <Stack.Screen name={nameList.farmerInfo} component={FarmerInfo} />
        <Stack.Screen name={nameList.findFarmers} component={FindFarmers} />
        <Stack.Screen name={nameList.fullMap} component={FullMap} />
        <Stack.Screen name={nameList.notifications} component={Notifications} />
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
        <Stack.Screen name={nameList.userInfo} component={UserInfo} />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen
            name={nameList.userOptionModal}
            component={UserOptionModal}
          />
        </Stack.Group>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { nameList };
