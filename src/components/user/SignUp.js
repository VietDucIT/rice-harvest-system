import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";
import { Button, Text, TextField, View } from "react-native-ui-lib";

import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import nameList from "../../json/nameList";

StyleInit();

const SignUp = ({ navigation }) => {
  const usernameArray = ["Duc"];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const checkSignUp = () => {
    // Alert
    if (usernameArray.includes(username)) {
      Alert.alert(
        "Thông báo",
        "Tên đăng nhập đã tồn tại. Nếu bạn đã có tài khoản, chọn Đăng nhập. Nếu đó không phải bạn, chọn Nhập lại.",
        [
          {
            text: "Đăng nhập",
            onPress: () => navigation.navigate(nameList.firstScreen),
          },
          {
            text: "Nhập lại",
            style: "cancel",
          },
        ]
      );
    } else {
      Alert.alert("Thông báo", "Đăng ký thành công.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.navigate(nameList.addUserInfo);
    }
  };

  const reset = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
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
            <TextField
              text70
              placeholder="Tên đăng nhập"
              grey10
              floatingPlaceholder
              floatOnFocus
              floatingPlaceholderColor={color.greenColor}
              containerStyle={{ marginBottom: 10 }}
              maxLength={30}
              validate={"required"}
              value={username}
              onChangeText={setUsername}
              errorMessage={"Vui lòng nhập Tên đăng nhập"}
              errorColor={color.redColor}
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
              validate={"required"}
              value={password}
              onChangeText={setPassword}
              errorMessage={"Vui lòng nhập Mật khẩu"}
              errorColor={color.redColor}
            />

            <TextField
              secureTextEntry
              text65
              placeholder="Nhập lại mật khẩu"
              grey10
              floatingPlaceholder
              floatOnFocus
              floatingPlaceholderColor={color.greenColor}
              containerStyle={{ marginBottom: 10 }}
              maxLength={20}
              showCharacterCounter
              validate={"required"}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              errorMessage={"Vui lòng nhập lại Mật khẩu"}
              errorColor={color.redColor}
            />
          </View>

          <View flex marginT-50 center>
            <View flex marginT-30 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton label="Đăng ký" marginL-20 onPress={checkSignUp} />
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
