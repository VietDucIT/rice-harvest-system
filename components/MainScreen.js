import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import CustomButton from "./core/CustomButton";
import { StyleInit } from "../config/StyleInit";

StyleInit();

const MainScreen = ({ navigation }) => {
  const role = "Nông dân";

  return (
    <ScrollView>
      {/* <View flex paddingH-25 paddingT-120> */}
      <View flex marginV-50>
        {/* <View left paddingL-10>
          <Button link>
            <FontAwesome5 name="home" size={30} color="green" />
          </Button>
        </View> */}
        <View paddingT-50>
          <View center>
            <Image
              style={styles.logo}
              source={require("../assets/images/Logo.png")}
            />
          </View>
          <View center marginV-20>
            <Text text50 green>
              {role}
            </Text>
          </View>
        </View>
        <View>
          <View marginV-20 center>
            <CustomButton
              label="Thông tin thời tiết"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate("CurrentWeather")}
            />
          </View>
          <View marginV-20 center>
            <CustomButton
              label="Cập nhật giá lúa"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate("RicePrice")}
            />
          </View>
          <View marginV-20 center>
            <CustomButton
              label="Quản lý ruộng lúa"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate("RiceFields")}
            />
          </View>
          <View marginV-20 center>
            <CustomButton
              label="Quản lý vụ mùa"
              text60
              style={styles.btn}
              onPress={() => navigation.navigate("...")}
            />
          </View>
          {/* <View marginV-20 center>
            <CustomButton
              label="Quản lý khu vực thu mua"
              text60
              style={styles.btn}
            />
          </View>
          <View marginV-20 center>
            <CustomButton
              label="Xem bản đồ ruộng đất"
              text60
              style={styles.btn}
            />
          </View>
          <View marginV-20 center>
            <CustomButton
              label="Quản lý khu vực thu mua"
              text60
              style={styles.btn}
            />
          </View>
          <View marginV-20 center>
            <CustomButton
              label="Xem bản đồ ruộng đất"
              text60
              style={styles.btn}
            />
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};
export default MainScreen;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  btn: {
    width: 300,
  },
});
