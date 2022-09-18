import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { View, TextField, Text, Button } from "react-native-ui-lib";

import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <ScrollView>
      <View flex paddingH-25 paddingT-120>
        <View>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
          </View>
          <View center marginV-20>
            <Text text50 green>
              Đăng ký tài khoản
            </Text>
          </View>
        </View>

        <View>
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

          <View marginT-50 center>
            {/* <Button
            text70
            white
            background-green20
            label="Đăng ký"
            bg-green
            style={styles.btn}
          /> */}
            <CustomButton label="Đăng ký" />

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
  btn: {
    width: 150,
  },
});
