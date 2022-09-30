import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";
import { Button, Incubator, Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const { TextField } = Incubator;

const SignUp = ({ navigation }) => {
  // Just for test, then move logic to BE
  const usernameArray = ["Duc"];

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");

  const checkSignUp = () => {
    // Alert
    if (usernameArray.includes(username)) {
      setErrorUsername("* Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
      // Alert.alert(
      //   "Thông báo",
      //   "Tên đăng nhập đã tồn tại. Nếu bạn đã có tài khoản, chọn Đăng nhập. Nếu đó không phải bạn, chọn Nhập lại.",
      //   [
      //     {
      //       text: "Đăng nhập",
      //       onPress: () => navigation.navigate(nameList.firstScreen),
      //     },
      //     {
      //       text: "Nhập lại",
      //       style: "cancel",
      //     },
      //   ]
      // );
    } else {
      // Alert.alert("Thông báo", "Đăng ký thành công.", [
      //   {
      //     text: "Đóng",
      //     style: "cancel",
      //   },
      // ]);
      navigation.navigate(nameList.addUserInfo);
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

  const onChangeConfirmPassword = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Vui lòng nhập lại mật khẩu.";
    } else if (text !== password) {
      message = "* Mật khẩu nhật lại không khớp.";
    } else {
      message = "";
    }
    setErrorConfirmPassword(message);
    setConfirmPassword(text);
  };

  const reset = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setErrorUsername("");
    setErrorPassword("");
    setErrorConfirmPassword("");
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

            {/* Confirm Password */}
            <TextField
              secureTextEntry
              text65
              placeholder="Nhập lại mật khẩu"
              floatingPlaceholder
              floatOnFocus
              floatingPlaceholderColor={{
                focus: color.greenColor,
                default: color.lightGreyColor,
              }}
              containerStyle={{ marginBottom: 10 }}
              value={confirmPassword}
              onChangeText={onChangeConfirmPassword}
              maxLength={20}
              showCharCounter
              style={styles.textField}
              marginT-10
            />
            <Text red style={styles.errorMessage}>
              {errorConfirmPassword}
            </Text>
            {/* <TextField
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
            /> */}
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
