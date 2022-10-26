import React, { useState, useEffect, useCallback } from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";
import { Button, Incubator, Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

// ???
import addUser from "../../services/user/addUser";

StyleInit();

const { TextField } = Incubator;

const SignUp = ({ navigation }) => {
  const initState = {
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(initState);
  const [error, setError] = useState(initState);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChange = (text, field) => {
    // text = text.trim();
    let message = "";
    if (text === "" && field === "phone") {
      message = "* Vui lòng nhập số điện thoại.";
    } else if (text === "" && field === "password") {
      message = "* Vui lòng nhập mật khẩu.";
    } else if (text === "" && field === "confirmPassword") {
      message = "* Vui lòng nhập lại mật khẩu.";
    } else if (field === "confirmPassword" && text !== user.password) {
      message = "* Mật khẩu nhập lại không khớp.";
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

  const reset = () => {
    setUser(initState);
    setError(initState);
    console.log("Reset completed.");
  };

  // handle disable submit btn
  useEffect(() => {
    if (user.phone && user.password && user.confirmPassword) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [user]);

  // call API
  // HANDLE IF USERNAME IS EXISTING
  const handleSignUp = async () => {
    try {
      // setLoading(true);

      // console.log("Data: ", user); // OK
      let dataAPI = await addUser(user);
      console.log("Data API: ", dataAPI);
      Alert.alert("Thông báo", "Đăng ký tài khoản thành công.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.navigate(nameList.addUserInfo);
      // setLoading(false);
    } catch (err) {
      console.log("Error while Signing Up.");
    }
  };

  return (
    <ScrollView>
      <View flex marginB-60>
        <View center marginT-50>
          <Image
            style={styles.logo}
            source={require("../../assets/images/Logo.png")}
          />
          <View marginV-10>
            <Text text50 green>
              Đăng ký tài khoản
            </Text>
          </View>
        </View>

        <View marginT-20 marginH-25>
          <View>
            {/* Username - Phone */}
            <TextField
              text65
              value={user.phone}
              onChangeText={(text) => onChange(text, "phone")}
              placeholder="Tên đăng nhập (Số điện thoại)"
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
            <Text red style={styles.errorMessage}>
              {error.phone}
            </Text>

            {/* Password */}
            <TextField
              secureTextEntry
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
              maxLength={20}
              showCharCounter
              style={styles.textField}
              marginT-10
            />
            <Text red style={styles.errorMessage}>
              {error.password}
            </Text>

            {/* Confirm Password */}
            <TextField
              secureTextEntry
              text65
              value={user.confirmPassword}
              onChangeText={(text) => onChange(text, "confirmPassword")}
              placeholder="Nhập lại mật khẩu"
              floatingPlaceholder
              floatOnFocus
              floatingPlaceholderColor={{
                focus: color.greenColor,
                default: color.lightGreyColor,
              }}
              containerStyle={{ marginBottom: 10 }}
              maxLength={20}
              showCharCounter
              style={styles.textField}
              marginT-10
            />
            <Text red style={styles.errorMessage}>
              {error.confirmPassword}
            </Text>
          </View>

          <View flex marginT-50 center>
            <View flex center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton
                label="Đăng ký"
                marginL-20
                onPress={handleSignUp}
                disabled={isDisableBtn}
              />
            </View>

            <Text text90 marginT-30>
              Bạn đã có tài khoản?
            </Text>
            <Button
              link
              text70
              green
              label="Đăng nhập"
              marginT-5
              style={styles.heading}
              onPress={() => navigation.navigate(nameList.firstScreen)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SignUp;

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
  errorMessage: {},
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
