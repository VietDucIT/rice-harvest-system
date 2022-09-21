import React, { useState } from "react";
import { ScrollView, Image, StyleSheet, Text as TextR } from "react-native";
import {
  View,
  TextField,
  Text,
  RadioGroup,
  RadioButton,
  Picker,
} from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const ModifyUserInfo = ({ navigation }) => {
  const years = ["2000", "2001", "2002", "2003"];

  const [name, setName] = useState("");
  const [gender, setGender] = useState(0);
  const [birthYear, setBirthYear] = useState(1900);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(0);

  const reset = () => {
    setName("");
    setGender(0);
    setBirthYear(1900);
    setAddress("");
    setPhone("");
    console.log("Reset completed.");
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
              <TextField text70 grey10 onChangeText={setName} value={name} />
            </View>

            {/* Gender */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Giới tính:
              </TextR>
              <RadioGroup initialValue={gender} onValueChange={setGender}>
                <RadioButton value={1} label={"Nam"} marginV-10 />
                <RadioButton value={0} label={"Nữ"} />
              </RadioGroup>
            </View>

            {/* Birth Year */}
            <View marginT-10>
              <TextR text70 marginT-10 style={styles.label}>
                Năm sinh:
              </TextR>
              <Picker
                value={birthYear}
                placeholder={"Chọn năm"}
                onChange={(year) => {
                  setBirthYear(year.value);
                  // console.log(year);
                }}
              >
                {years.map((item, index) => (
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
                onChangeText={setAddress}
                value={address}
              />
            </View>

            {/* Phone */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Số điện thoại:
              </TextR>
              <TextField text70 grey10 onChangeText={setPhone} value={phone} />
            </View>

            {/* Role */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Vai trò:
              </TextR>
              <RadioGroup initialValue={role} onValueChange={setRole}>
                <RadioButton value={0} label={"Nông dân"} marginV-10 />
                <RadioButton value={1} label={"Thương lái"} />
              </RadioGroup>
            </View>

            <View flex marginT-50 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton label="Lưu" />
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
