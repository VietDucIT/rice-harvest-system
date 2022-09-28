import React from "react";
import { ActivityIndicator } from "react-native";
import { Text, View } from "react-native-ui-lib";

const App = () => (
  <View flex center>
    <ActivityIndicator size="large" color="green" />
    <Text text70 marginT-20 green>
      Đang tải, vui lòng chờ ...
    </Text>
  </View>
);

export default App;
