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

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const indexItem = findUsername(username, userArray);

  const checkLogIn = () => {
    // Alert
    if (indexItem < 0) {
      Alert.alert(
        "Thông báo",
        "Tên đăng nhập không tồn tại. Vui lòng nhập lại.",
        [
          {
            text: "Nhập lại",
            style: "cancel",
          },
        ]
      );
    } else if (userArray[indexItem].password !== password) {
      // Wrong password
      Alert.alert("Thông báo", "Mật khẩu không chính xác. Vui lòng nhập lại.", [
        {
          text: "Nhập lại",
          style: "cancel",
        },
      ]);
    } else {
      navigation.navigate(nameList.mainScreen);
    }
  };

  // const onChangeText = (text) => {
  //   let message = "";
  //   if (text === "") {
  //     message = "This field is mandatory";
  //   }
  //   if (text === "Zzz") {
  //     message = "Please enter a valid text";
  //   }
  //   setError(message);
  // };

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
            grey10
            floatingPlaceholder
            floatOnFocus
            floatingPlaceholderColor={{
              focus: color.greenColor,
              default: color.lightGreyColor,
            }}
            containerStyle={{ marginBottom: 10 }}
            value={username}
            onChangeText={setUsername}
            maxLength={30}
            validate="required"
            // validate="number" / "email"
            // errorMessage="Vui lòng nhập Tên đăng nhập"
            validationMessage="This field is required"
            validateOnChange
            errorColor={color.redColor}
            // autoCapitalize="words"
            // underlineColor={{ focus: Colors.purple50, error: Colors.orange60 }}
            style={styles.textField}
            // hint="Tên dùng để đăng nhập vào hệ thống"
            // editable={!shouldDisable}
          />
          <TextField
            secureTextEntry
            text65
            placeholder="Mật khẩu"
            grey10
            floatingPlaceholder
            floatOnFocus
            floatingPlaceholderColor={color.greenColor}
            containerStyle={{ marginBottom: 10 }}
            maxLength={20}
            showCharacterCounter
            validate="required"
            value={password}
            onChangeText={setPassword}
            errorMessage="Vui lòng nhập Mật khẩu"
            errorColor={color.redColor}
            style={styles.textField}
            marginT-10
            validateOnChange
          />
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
              onPress={() => navigation.navigate(nameList.riceFields)}
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
