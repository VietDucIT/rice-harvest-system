import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";
import { Button, Incubator, Text, View } from "react-native-ui-lib";

import nameList from "../json/nameList";

import CustomButton from "./core/CustomButton";

import color from "../config/color";
import { StyleInit } from "../config/StyleInit";

StyleInit();

const { TextField } = Incubator;

const FirstScreen = ({ navigation }) => {
  // Just for test, then move logic to BE
  const userArray = [
    {
      username: "Duc",
      password: "123",
    },
  ];
  const findUsername = (name, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].username === name) return i;
    }
    return -1;
  };
  const indexItem = findUsername(username, userArray);

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState("");

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const checkLogIn = () => {
    if (indexItem < 0) {
      setErrorUsername("* Tên đăng nhập không tồn tại.");
    } else if (userArray[indexItem].password !== password) {
      setErrorPassword("* Mật khẩu không chính xác.");
    } else {
      navigation.navigate(nameList.mainScreen);
    }
  };

  const onChangeUsername = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Vui lòng nhập tên đăng nhập.";
    } else {
      message = "";
    }
    setErrorUsername(message);
    setUsername(text);
  };

  const onChangePassword = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Vui lòng nhập mật khẩu.";
    } else {
      message = "";
    }
    setErrorPassword(message);
    setPassword(text);
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
            // label="Username"
            // labelStyle={{ alignSelf: "center" }}
            // labelColor={{
            //   default: Colors.$textDefault,
            //   focus: Colors.$textGeneral,
            //   error: Colors.$textDangerLight,
            //   disabled: Colors.$textDisabled,
            // }}
            placeholder="Tên đăng nhập"
            floatingPlaceholder
            floatOnFocus
            floatingPlaceholderColor={{
              focus: color.greenColor,
              default: color.lightGreyColor,
            }}
            containerStyle={{ marginBottom: 10 }}
            value={username}
            onChangeText={onChangeUsername}
            // onChangeText={setUsername}
            maxLength={30}
            // validate="required"
            // validate="number" / "email"
            // errorMessage="Vui lòng nhập Tên đăng nhập"
            // validationMessage="This field is required"
            // validateOnChange
            // errorColor={color.redColor}
            // autoCapitalize="words"
            // underlineColor={{ focus: Colors.purple50, error: Colors.orange60 }}
            style={styles.textField}
            // hint="Tên dùng để đăng nhập vào hệ thống"
            // editable={!shouldDisable}
            marginT-10
          />
          <Text red style={styles.errorMessage}>
            {errorUsername}
          </Text>

          {/* Password */}
          <TextField
            secureTextEntry
            text65
            placeholder="Mật khẩu"
            floatingPlaceholder
            floatOnFocus
            floatingPlaceholderColor={{
              focus: color.greenColor,
              default: color.lightGreyColor,
            }}
            containerStyle={{ marginBottom: 10 }}
            value={password}
            onChangeText={onChangePassword}
            maxLength={20}
            showCharCounter
            style={styles.textField}
            marginT-10
          />
          <Text red style={styles.errorMessage}>
            {errorPassword}
          </Text>
        </View>

        <View>
          <View marginT-50 center>
            <CustomButton label="Đăng nhập" onPress={checkLogIn} />

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
              onPress={() => navigation.navigate(nameList.calculator)}
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
  errorMessage: {},
});
