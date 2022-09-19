import React, { useState } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { View, TextField, Text, Button } from "react-native-ui-lib";

import CustomButton from "./core/CustomButton";
import { StyleInit } from "../config/StyleInit";

StyleInit();

const FirstScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        </View>

        <View>
          <View marginT-50 center>
            <CustomButton label="Đăng nhập" />

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
              onPress={() => navigation.navigate("SignUp")}
            />
            {/* Test screen */}
            <Button
              link
              text70
              green20
              label="Click me"
              marginT-5
              style={styles.heading}
              onPress={() => navigation.navigate("Calculator")}
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
});
