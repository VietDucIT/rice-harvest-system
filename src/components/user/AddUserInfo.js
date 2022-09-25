import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import {
  View,
  TextField,
  Text,
  RadioGroup,
  RadioButton,
  Picker,
} from "react-native-ui-lib";

import { nameList } from "../../App";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import Color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

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
  const [gender, setGender] = useState(0);
  const [birthYear, setBirthYear] = useState(currentYear);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(0);

  const reset = () => {
    setName("");
    setGender(0);
    setBirthYear(currentYear);
    setAddress("");
    setPhone("");
    setRole(0);
    console.log("Reset completed.");
  };

  const handleAdd = () => {
    Alert.alert("Thông báo", "Đăng ký thông tin thành công.", [
      {
        text: "Đóng",
        style: "cancel",
      },
    ]);
    navigation.navigate(nameList.mainScreen);
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
            <View marginV-10>
              <Text text50 green>
                Đăng ký thông tin
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
                validate={"required"}
                value={name}
                onChangeText={setName}
                errorMessage={"Vui lòng nhập Họ tên"}
                errorColor={Color.redColor}
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
                <RadioButton value={1} label={"Nam"} marginL-10 marginV-10 />
                <RadioButton value={0} label={"Nữ"} marginL-20 marginV-10 />
              </RadioGroup>
            </View>

            {/* Birth Year */}
            <View marginT-10>
              <TextR text70 marginT-10 style={styles.label}>
                Năm sinh:
              </TextR>
              <Picker
                placeholder={"Chọn năm"}
                value={birthYear}
                onChange={(year) => {
                  setBirthYear(year.value);
                  // console.log(year);
                }}
              >
                {yearArray.map((item, index) => (
                  <Picker.Item key={index} value={item} label={item} />
                ))}
              </Picker>
            </View>

            {/* Address */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>
              <TextField
                text70
                grey10
                validate={"required"}
                value={address}
                onChangeText={setAddress}
                errorMessage={"Vui lòng nhập Địa chỉ chính xác"}
                errorColor={Color.redColor}
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
                validate={"required"}
                value={phone}
                onChangeText={setPhone}
                errorMessage={"Vui lòng nhập Số điện thoại"}
                errorColor={Color.redColor}
              />
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
                />
                <RadioButton
                  value={1}
                  label={"Thương lái"}
                  marginV-10
                  marginL-20
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
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  ratioContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
