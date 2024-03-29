import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { Button, Incubator, Text, View } from "react-native-ui-lib";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as SecureStore from "expo-secure-store";

import nameList from "../json/nameList";

import CustomButton from "./core/CustomButton";

import color from "../config/color";
import { StyleInit } from "../config/StyleInit";

import logIn from "../services/user/logIn";

StyleInit();

const { TextField } = Incubator;

const FirstScreen = ({ navigation }) => {
  const initState = {
    phone: "",
    password: "",
  };
  const [user, setUser] = useState(initState);
  const [error, setError] = useState(initState);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChange = (text, field) => {
    text = text.trim();
    let message = "";
    if (text === "" && field === "phone") {
      message = "* Vui lòng nhập số điện thoại.";
    } else if (text === "" && field === "password") {
      message = "* Vui lòng nhập mật khẩu.";
    } else {
      message = "";
    }
    setError({
      ...error,
      [field]: message,
    });
    setUser({
      ...user,
      [field]: text,
    });
  };

  // handle disable Submit button
  useEffect(() => {
    if (user.phone && user.password) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [user]);

  const reset = () => {
    setUser(initState);
    console.log("FirstScreen - Clear text field.");
  };

  const handleLogIn = async () => {
    try {
      let dataAPI = await logIn(user);
      console.log("FirstScreen - Data from BE: ", dataAPI);

      if (dataAPI) {
        ToastAndroid.show("Đăng nhập thành công", ToastAndroid.SHORT);
      }
      reset();
      await SecureStore.setItemAsync("USER_ID", dataAPI._id);
      navigation.navigate(nameList.mainScreen);
    } catch (err) {
      Alert.alert(`Thông báo`, "Không tìm thấy tài khoản, vui lòng nhập lại.", [
        {
          text: "Nhập lại",
          style: "cancel",
        },
      ]);
      console.log("FirstScreen - Error while Logging In.");
    }
  };

  return (
    <ScrollView>
      <View flex paddingH-25 marginV-100>
        <View>
          <View center>
            <Image
              style={styles.logo}
              source={require("../assets/images/Logo.png")}
            />
          </View>
          <View center marginV-20>
            <Text text50 green>
              Xin chào
            </Text>
          </View>
        </View>

        <View>
          {/* Username */}
          <TextField
            text65
            value={user.phone}
            onChangeText={(text) => onChange(text, "phone")}
            placeholder="Số điện thoại"
            floatingPlaceholder
            floatOnFocus
            floatingPlaceholderColor={{
              focus: color.greenColor,
              default: color.lightGreyColor,
            }}
            containerStyle={{ marginBottom: 10 }}
            keyboardType="numeric"
            style={styles.textField}
            marginT-10
          />
          <Text red>{error.phone}</Text>

          {/* Password */}
          <View style={styles.passwordContainer}>
            <TextField
              secureTextEntry={!isShowPassword}
              text65
              value={user.password}
              onChangeText={(text) => onChange(text, "password")}
              placeholder="Mật khẩu"
              floatingPlaceholder
              floatOnFocus
              floatingPlaceholderColor={{
                focus: color.greenColor,
                default: color.lightGreyColor,
              }}
              containerStyle={{ marginBottom: 10 }}
              showCharCounter
              style={[styles.textField, styles.password]}
              marginT-10
            />
            <TouchableOpacity
              style={styles.eye}
              onPress={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? (
                <Text green text70 style={{ fontWeight: "600" }}>
                  Ẩn
                </Text>
              ) : (
                // <FontAwesome5
                //   name="eye"
                //   size={22}
                //   color={color.greenColor}
                // />
                <Text green text70 style={{ fontWeight: "600" }}>
                  Hiện
                </Text>
                // <FontAwesome5
                //   name="eye-slash"
                //   size={22}
                //   color={color.greenColor}
                // />
              )}
            </TouchableOpacity>
          </View>
          <Text red>{error.password}</Text>
        </View>

        <View>
          <View marginT-50 center>
            <CustomButton
              label="Đăng nhập"
              onPress={handleLogIn}
              disabled={isDisableBtn}
            />

            <Text text90 marginT-30>
              Bạn chưa có tài khoản?
            </Text>
            <Button
              link
              text70
              green20
              label="Đăng ký"
              marginT-5
              style={styles.heading}
              onPress={() => navigation.navigate(nameList.addUserInfo)} // Sign Up
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default FirstScreen;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  textField: {
    borderBottomWidth: 0.5,
    borderColor: color.lightGreyColor,
    paddingBottom: 5,
  },
  passwordContainer: {
    flexDirection: "row",
  },
  password: {
    width: 300,
  },
  eye: {
    marginTop: 35,
    marginHorizontal: 10,
  },
});
