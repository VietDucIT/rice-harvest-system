import React, { useState } from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import {
  View,
  TextField,
  Text,
  RadioGroup,
  RadioButton,
  SectionsWheelPicker,
  WheelPicker,
  Incubator,
} from "react-native-ui-lib";

import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const ModifyUserInfo = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState(0);
  const [birthYear, setBirthYear] = useState(1900);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState(0);
  const year = [1, 2, 3, 4];

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
      <View flex paddingH-25 paddingT-60>
        <View>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
          </View>
          <View center marginV-10>
            <Text text50 green>
              Chỉnh sửa thông tin
            </Text>
          </View>
        </View>

        <View>
          <View>
            <Text text70 style={styles.label}>
              Họ tên:
            </Text>
          </View>
          <TextField
            text70
            // placeholder="Họ tên"
            grey10
            onChangeText={setName}
            value={name}
          />
        </View>

        <View>
          <View>
            <Text text70 style={styles.label}>
              Giới tính:
            </Text>
          </View>
          <RadioGroup initialValue={gender} onValueChange={setGender}>
            <RadioButton value={1} label={"Nam"} marginV-10 />
            <RadioButton value={0} label={"Nữ"} />
          </RadioGroup>
        </View>

        <View>
          <View>
            <Text text70 marginT-10 style={styles.label}>
              Năm sinh:
            </Text>
          </View>
          <TextField
            text70
            placeholder="1900"
            grey10
            onChangeText={setBirthYear}
            value={birthYear}
          />
          {/* <SectionsWheelPicker
          sections={{
            numberOfVisibleRows: 3,
            itemHeight: 20,
            items: year,
            onChange: setBirthYear,
            initialValue: birthYear,
            style: { flex: 1 },
          }} 
        /> */}
        </View>
        {/* {items.map((item, index) => (
            <Picker.Item key={index} value={item} />
          ))} */}

        <View>
          <View>
            <Text text70 style={styles.label}>
              Địa chỉ:
            </Text>
          </View>
          <TextField text70 grey10 onChangeText={setAddress} value={address} />
        </View>

        <View>
          <View>
            <Text text70 style={styles.label}>
              Số điện thoại:
            </Text>
          </View>
          <TextField text70 grey10 onChangeText={setPhone} value={phone} />
        </View>

        <View>
          <View>
            <Text text70 style={styles.label}>
              Vai trò:
            </Text>
          </View>
          <RadioGroup initialValue={role} onValueChange={setRole}>
            <RadioButton value={0} label={"Nông dân"} marginV-10 />
            <RadioButton value={1} label={"Thương lái"} />
          </RadioGroup>
        </View>

        <View flex marginT-20 center>
          <CustomButton label="Lưu" />
          <CustomButton label="Nhập lại" marginT-5 marginB-20 onPress={reset} />
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
  label: {},
});
