import React, { useState } from "react";
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

StyleInit();

const { TextField } = Incubator;

const AddUserInfo = ({ navigation }) => {
  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  const getYearList = () => {
    let years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  };

  const yearArray = getYearList();

  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState(1);
  const [birthYear, setBirthYear] = useState(currentYear);
  const [address, setAddress] = useState("");
  const [village, setVillage] = useState("");
  const [commune, setCommune] = useState("");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(0);

  const [errorName, setErrorName] = useState("");
  const [errorBirthYear, setErrorBirthYear] = useState("");
  // const [errorAddress, setErrorAddress] = useState("");
  const [errorVillage, setErrorVillage] = useState("");
  const [errorCommune, setErrorCommune] = useState("");
  const [errorTown, setErrorTown] = useState("");
  const [errorProvince, setErrorProvince] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  const reset = () => {
    setName("");
    setNickname("");
    setGender(1);
    setBirthYear(currentYear);
    setAddress("");
    setVillage("");
    setCommune("");
    setTown("");
    setProvince("");
    setPhone("");
    setRole(0);
    setErrorName("");
    setErrorBirthYear("");
    // setErrorAddress("");
    setErrorVillage("");
    setErrorCommune("");
    setErrorTown("");
    setErrorProvince("");
    setErrorPhone("");
    console.log("Reset completed.");
  };

  const onChangeName = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorName(message);
    setName(text);
  };

  const onChangeVillage = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorVillage(message);
    setVillage(text);
  };

  const onChangeCommune = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorCommune(message);
    setCommune(text);
  };

  const onChangeTown = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorTown(message);
    setTown(text);
  };

  const onChangeProvince = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorProvince(message);
    setProvince(text);
  };

  const onChangePhone = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorPhone(message);
    setPhone(text);
  };

  const handleAdd = () => {
    let err = false;
    if (!birthYear) {
      setErrorBirthYear("* Bắt buộc");
      err = false;
    } else {
      setErrorBirthYear("");
      err = true;
    }

    if (err) {
      Alert.alert("Thông báo", "Đăng ký thông tin thành công.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.navigate(nameList.mainScreen);
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
                value={name}
                onChangeText={onChangeName}
                style={styles.textField}
              />
              <Text red style={styles.errorMessage}>
                {errorName}
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
                value={nickname}
                onChangeText={setNickname}
                style={styles.textField}
              />
            </View>

            {/* Gender */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Giới tính:
              </TextR>
              <RadioGroup
                initialValue={gender}
                onValueChange={setGender}
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
                value={birthYear}
                onChange={(year) => {
                  setBirthYear(year.value);
                  // console.log(year);
                }}
                style={styles.textField}
              >
                {yearArray.map((item, index) => (
                  <Picker.Item key={index} value={item} label={item} />
                ))}
              </Picker>
              <Text red style={styles.errorMessage}>
                {errorBirthYear}
              </Text>
            </View>

            {/* Address */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>

              {/* <TextField
                  text70
                  grey10
                  value={address}
                  onChangeText={setAddress}
                  // title="Địa chỉ:"
                  // titleStyle={{ fontSize: Typography.text70.fontSize }}
                /> */}

              <View flex style={styles.addressContainer}>
                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    // validate={"required"}
                    onChangeText={onChangeVillage}
                    value={village}
                    placeholder="Ấp"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    // errorMessage={"Bắt buộc"}
                    // errorColor={color.redColor}
                    style={[styles.addressItem, styles.textField]}
                    autoCapitalize="words"
                  />
                  <Text red style={styles.errorMessage}>
                    {errorVillage}
                  </Text>
                </View>

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeCommune}
                    value={commune}
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
                    {errorCommune}
                  </Text>
                </View>

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeTown}
                    value={town}
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
                    {errorTown}
                  </Text>
                </View>

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeProvince}
                    value={province}
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
                    {errorProvince}
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
                value={phone}
                onChangeText={onChangePhone}
                style={styles.textField}
              />
              <Text red style={styles.errorMessage}>
                {errorPhone}
              </Text>
            </View>

            {/* Role */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Vai trò:
              </TextR>
              <RadioGroup
                initialValue={role}
                onValueChange={setRole}
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

            <View flex marginT-50 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton label="Lưu" onPress={handleAdd} />
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
