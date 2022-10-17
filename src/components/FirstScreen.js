import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Button, Incubator, Text, View } from "react-native-ui-lib";

import nameList from "../json/nameList";

import CustomButton from "./core/CustomButton";

import color from "../config/color";
import { StyleInit } from "../config/StyleInit";

import logIn from "../../services/user/logIn";

StyleInit();

const { TextField } = Incubator;

const FirstScreen = ({ navigation }) => {
  // HANDLE LOG IN
  // const userArray = [
  //   {
  //     username: "Duc",
  //     password: "123",
  //   },
  // ];
  // const findUsername = (name, array) => {
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i].username === name) return i;
  //   }
  //   return -1;
  // };
  // const indexItem = findUsername(username, userArray);

  // const checkLogIn = () => {
  //   if (indexItem < 0) {
  //     setErrorUsername("* Tên đăng nhập không tồn tại.");
  //   } else if (userArray[indexItem].password !== password) {
  //     setErrorPassword("* Mật khẩu không chính xác.");
  //   } else {
  //     navigation.navigate(nameList.mainScreen);
  //   }
  // };

  const initState = {
    phone: "",
    password: "",
  };
  const [user, setUser] = useState(initState);
  const [error, setError] = useState(initState);
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

  // handle disable submit btn
  useEffect(() => {
    if (user.phone && user.password) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [user]);

  // call API
  const handleLogIn = async () => {
    try {
      // setLoading(true);

      // console.log("Data: ", user);
      let dataAPI = await logIn(user);
      // console.log("Data API: ", dataAPI);
      // HANDLE IF DATA API SEND ERROR (CODE 500)
      Alert.alert("Thông báo", "Đăng nhập thành công.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.navigate(nameList.mainScreen);
      // setLoading(false);
    } catch (err) {
      console.log("Error while Logging In.");
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
            showCharCounter
            style={styles.textField}
            marginT-10
          />
          <Text red style={styles.errorMessage}>
            {error.password}
          </Text>
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
              onPress={() => navigation.navigate(nameList.signUp)}
            />
            {/* Test screen */}
            <Button
              link
              text70
              green20
              label="Click me"
              marginT-5
              style={styles.heading}
              onPress={() => navigation.navigate(nameList.riceBuyingAreas)}
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
});
