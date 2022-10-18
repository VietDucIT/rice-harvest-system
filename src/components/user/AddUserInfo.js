import React, { useState, useEffect } from "react";
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

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import addUser from "../../services/user/addUser";

StyleInit();

const { TextField } = Incubator;

const AddUserInfo = ({ navigation }) => {
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
    setUser(initState);
    setError(initState);
    console.log("Reset completed.");
  };

  // handle disable submit btn
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

  // call API
  const handleAdd = async () => {
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
        // setLoading(true);

        // console.log("Data: ", user);
        let dataAPI = await addUser(user);
        console.log("Data API: ", dataAPI);
        Alert.alert("Thông báo", "Thêm người dùng thành công.", [
          {
            text: "Đóng",
            style: "cancel",
          },
        ]);
        navigation.navigate(nameList.userInfo, { idUser: dataAPI._id });
        // setLoading(false);
      } catch (err) {
        console.log("Error while adding User.");
      }
    }
  };

  return (
    <ScrollView>
      <View flex marginB-60>
        <UserOptionModal />

        <View>
          <View center marginT-30>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View center marginV-10>
              <Text text50 green>
                Đăng ký thông tin
              </Text>
              {/* <TextR style={styles.require}>* Bắt buộc nhập</TextR> */}
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
              />
              <Text red style={styles.errorMessage}>
                {error.name}
              </Text>
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
                onChange={(year) =>
                  setUser({ ...user, birthYear: Number(year.label) })
                }
                style={styles.textField}
              >
                {yearArray.map((item, index) => (
                  <Picker.Item key={index} value={user.item} label={item} />
                ))}
              </Picker>
              <Text red style={styles.errorMessage}>
                {error.birthYear}
              </Text>
            </View>

            {/* Address */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>

              <View flex style={styles.addressContainer}>
                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    value={user.village}
                    onChangeText={(text) => onChange(text, "village")}
                    placeholder="Ấp"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.addressItem, styles.textField]}
                    autoCapitalize="words"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.village}
                  </Text>
                </View>

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    value={user.commune}
                    onChangeText={(text) => onChange(text, "commune")}
                    placeholder="Xã"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.addressItem, styles.textField]}
                    autoCapitalize="words"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.commune}
                  </Text>
                </View>

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    value={user.town}
                    onChangeText={(text) => onChange(text, "town")}
                    placeholder="Huyện"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.addressItem, styles.textField]}
                    autoCapitalize="words"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.town}
                  </Text>
                </View>

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    value={user.province}
                    onChangeText={(text) => onChange(text, "province")}
                    placeholder="Tỉnh"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.addressItem, styles.textField]}
                    autoCapitalize="words"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.province}
                  </Text>
                </View>
              </View>
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
              <Text red style={styles.errorMessage}>
                {error.phone}
              </Text>
            </View>

            {/* Role */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Vai trò:
              </TextR>
              <RadioGroup
                initialValue={user.role}
                onValueChange={(value) => setUser({ ...user, role: value })}
                flex
                style={styles.ratioContainer}
              >
                <RadioButton
                  value={0}
                  label={"Nông dân"}
                  marginV-10
                  marginL-10
                  color={color.greenColor}
                  labelStyle={{ fontSize: 16 }}
                />
                <RadioButton
                  value={1}
                  label={"Thương lái"}
                  marginV-10
                  marginL-20
                  color={color.greenColor}
                  labelStyle={{ fontSize: 16 }}
                />
              </RadioGroup>
            </View>

            {/* Password */}
            <View marginT-20>
              <TextR text70 style={styles.label}>
                Mật khẩu:
              </TextR>
              <TextField
                secureTextEntry
                text70
                grey10
                value={user.password}
                onChangeText={(text) => onChange(text, "password")}
                style={styles.textField}
                maxLength={20}
                showCharCounter
              />
              <Text red style={styles.errorMessage}>
                {error.password}
              </Text>
            </View>

            {/* Confirm Password */}
            <View marginT-20>
              <TextR text70 style={styles.label}>
                Nhập lại mật khẩu:
              </TextR>
              <TextField
                secureTextEntry
                text70
                grey10
                value={user.confirmPassword}
                onChangeText={(text) => onChange(text, "confirmPassword")}
                style={styles.textField}
                maxLength={20}
                showCharCounter
              />
              <Text red style={styles.errorMessage}>
                {error.confirmPassword}
              </Text>
            </View>

            <View flex marginT-50 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton
                label="Lưu"
                onPress={handleAdd}
                disabled={isDisableBtn}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default AddUserInfo;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  require: {
    marginTop: 10,
    color: color.redColor,
    fontSize: 14,
    fontStyle: "italic",
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
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderColor: color.lightGreyColor,
    paddingBottom: 5,
  },
  errorMessage: {},
  addressContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  addressItem: {
    width: 120,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
