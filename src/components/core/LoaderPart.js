import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import color from "../../config/color";

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size={40} color={color.greenColor} />

    <Text text70 marginT-20 green>
      Đang tải, vui lòng chờ ...
    </Text>
  </View>
);
export default Loader;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    alignItems: "center",
  },
});
