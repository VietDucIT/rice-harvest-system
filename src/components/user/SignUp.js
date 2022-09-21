import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { View, TextField, Text, Button } from "react-native-ui-lib";

import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
              onChangeText={setUsername}
              value={username}
            />

            <TextField
              text70
              placeholder="Mật khẩu"
              secureTextEntry
              grey10
              onChangeText={setPassword}
              value={password}
            />

            <TextField
              text70
              placeholder="Nhập lại mật khẩu"
              secureTextEntry
              grey10
              onChangeText={setConfirmPassword}
              value={confirmPassword}
            />
          </View>

          <View flex marginT-50 center>
            <View flex marginT-30 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton label="Đăng ký" marginL-20 />
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
              onPress={() => navigation.navigate("FirstScreen")}
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
