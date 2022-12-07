import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import {
  Incubator,
  Picker,
  RadioButton,
  RadioGroup,
  Text,
  View,
} from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";
import AddressInput from "../core/AddressInput";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getUser from "../../services/user/getUser";
import modifyUser from "../../services/user/modifyUser";

StyleInit();

const { TextField } = Incubator;

const ModifyUserInfo = ({ navigation, route }) => {
  // call API to get User data to fill the form
  const { idUser } = route.params;
  const [userData, setUserData] = useState({});
  const getUserData = useCallback(async () => {
    try {
      const data = await getUser(idUser);
      // console.log("ModifyUserInfo - User data: ", data);
      setUserData(data);
      setUser(data);
    } catch (err) {
      console.log("ModifyUserInfo - Error while getting User data.");
    }
  }, [idUser]);
  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  let yearArray = [];
  for (let year = currentYear; year >= 1922; year--) {
    yearArray.push(year.toString());
  }

  const initState = {
    name: "",
    nickname: "",
    gender: 1,
    birthYear: "",
    village: "",
    commune: "",
    town: "",
    province: "",
    phone: "",
    role: 0,
    password: "",
    confirmPassword: "",
  };
  const [user, setUser] = useState(initState);
  const [error, setError] = useState(initState);
  const [isReset, setIsReset] = useState(true);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChange = (text, field) => {
    // text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
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
    setUser(userData);
    setIsReset(!isReset);
    setError(initState);
    console.log("ModifyUserInfo - Reset completed.");
  };

  // handle disable Submit button
  useEffect(() => {
    if (
      user.name &&
      user.birthYear &&
      user.village &&
      user.commune &&
      user.town &&
      user.province &&
      user.phone &&
      user.password &&
      user.confirmPassword
    ) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [user]);

  const handleModify = async () => {
    let err = false;
    if (!error.birthYear) {
      setError({
        ...error,
        birthYear: "* Bắt buộc.",
      });
      err = false;
    } else {
      setError({
        ...error,
        birthYear: "",
      });
      err = true;
    }

    if (err) {
      try {
        // console.log("ModifyUserInfo - Data: ", user);
        let dataAPI = await modifyUser(user);
        // console.log("ModifyUserInfo - Data API: ", dataAPI);
        Alert.alert("Thông báo", "Sửa thông tin người dùng thành công.", [
          {
            text: "Đóng",
            style: "cancel",
          },
        ]);
        navigation.navigate(nameList.userInfo, { idUser });
      } catch (err) {
        console.log("ModifyUserInfo - Error while modifying User.");
      }
    }
  };

  return (
    <ScrollView>
      <View flex marginB-60>
        <UserOptionButton navigation={navigation} />

        <View>
          <View center marginT-30>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Chỉnh sửa thông tin
              </Text>
            </View>
          </View>

          <View marginT-20 marginH-25>
            {/* Name */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Họ tên:
              </TextR>
              <TextField
                text70
                grey10
                value={user.name}
                onChangeText={(text) => onChange(text, "name")}
                style={styles.textField}
                autoCapitalize="words"
              />
              <Text red>{error.name}</Text>
            </View>

            {/* Nickname */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Tên thường dùng:
              </TextR>
              <TextField
                text70
                grey10
                value={user.nickname}
                onChangeText={(text) => setUser({ ...user, nickname: text })}
                style={styles.textField}
                autoCapitalize="words"
              />
            </View>

            {/* Gender */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Giới tính:
              </TextR>
              <RadioGroup
                initialValue={user.gender}
                onValueChange={(value) => setUser({ ...user, gender: value })}
                flex
                style={styles.ratioContainer}
              >
                <RadioButton
                  value={1}
                  label={"Nam"}
                  marginL-10
                  marginV-10
                  color={color.greenColor}
                  labelStyle={{ fontSize: 16 }}
                />
                <RadioButton
                  value={0}
                  label={"Nữ"}
                  marginL-20
                  marginV-10
                  color={color.greenColor}
                  labelStyle={{ fontSize: 16 }}
                />
              </RadioGroup>
            </View>

            {/* Birth Year */}
            <View marginT-10>
              <TextR text70 marginT-10 style={styles.label}>
                Năm sinh:
              </TextR>
              <Picker
                migrateTextField
                text70
                placeholder={"Chọn năm"}
                value={user.birthYear}
                onChange={(year) => {
                  console.log("ModifyUserInfo - Birth year: ", year.label);
                  setUser({ ...user, birthYear: Number(year.label) });
                }}
                style={styles.textField}
              >
                {yearArray.map((item, index) => (
                  <Picker.Item key={index} value={user.item} label={item} />
                ))}
              </Picker>
              <Text red>{error.birthYear}</Text>
            </View>

            {/* Address */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>
              <AddressInput
                addressObject={user}
                handleAddress={(address) => setUser({ ...user, ...address })}
                isReset={isReset}
              />
            </View>

            {/* Phone */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Số điện thoại:
              </TextR>
              <TextField
                text70
                grey10
                value={user.phone}
                onChangeText={(text) => onChange(text, "phone")}
                keyboardType="numeric"
                style={styles.textField}
              />
              <Text red>{error.phone}</Text>
            </View>

            {/* Password */}
            <View marginT-10>
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
              <Text red>{error.password}</Text>
            </View>

            {/* Confirm Password */}
            <View marginT-10>
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
              <Text red>{error.confirmPassword}</Text>
            </View>

            <View flex marginT-50 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton
                label="Lưu"
                onPress={handleModify}
                disabled={isDisableBtn}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ModifyUserInfo;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  ratioContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  textField: {
    borderBottomWidth: 0.5,
    borderColor: color.lightGreyColor,
    paddingBottom: 5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
