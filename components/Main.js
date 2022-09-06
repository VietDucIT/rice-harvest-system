import { useState } from "react";
import {
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Color from "../config/color";

const Main = () => {
  const [username, setUsername] = useState("");

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/Logo.png")}
      />
      <View style={styles.form}>
        <View style={styles.textInputGroup}>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
          />
        </View>
        <View style={styles.btnGroup}>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btn}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btn}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};
export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  logo: {
    width: 100,
    height: 100,
  },
  form: {
    width: "100%",
  },
  textInputGroup: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnGroup: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnContainer: {
    width: "50%",
    height: 60,
  },
  btn: {
    backgroundColor: Color.greenColor,
    borderRadius: 30,
    height: 40,
    fontSize: 20,
    fontWeight: "500",
    color: Color.whiteColor,
    textAlign: "center",
  },
});
