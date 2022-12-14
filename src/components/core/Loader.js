import React from "react";
import { ActivityIndicator, Image, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import color from "../../config/color";

const Loader = () => (
  <View style={styles.container}>
    <View marginB-20>
      <Image
        style={styles.logo}
        source={require("../../assets/images/Logo.png")}
      />
    </View>
    <ActivityIndicator size={40} color={color.greenColor} />

    <Text text70 marginT-20 green>
      Đang tải, vui lòng chờ...
    </Text>
  </View>
);
export default Loader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 250,
  },
  logo: {
    width: 70,
    height: 70,
  },
});
