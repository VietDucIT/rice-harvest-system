import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";
import CustomButton from "./core/CustomButton";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(coords);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View>
      <Text>{text}</Text>
      <CustomButton
        onPress={() => console.log(location.accuracy)}
        label="Press me"
      />
    </View>
  );
}
// import { WebView } from "react-native-webview";

// const Test = () => {
//   return (
//     <WebView source={{ uri: "https://qhviet.com/chuyen-doi-toa-do-vn2000" }} />
//   );
// };

// export default Test;
