import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Text, TextField, Picker, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const AddRiceBuyingArea = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [village, setVillage] = useState("");
  const [commune, setCommune] = useState("");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState("");
  const [description, setDescription] = useState("");

  const reset = () => {
    setName("");
    setAddress("");
    setVillage("");
    setCommune("");
    setTown("");
    setProvince("");
    setDescription("");
    console.log("Reset completed.");
  };

  const showAlert = () => {
    Alert.alert("Thông báo", "Tạo khu vực thu mua thành công.", [
      {
        text: "Đóng",
        style: "cancel",
      },
    ]);
    navigation.navigate(nameList.riceBuyingAreas);
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionModal />

        <View paddingT-30>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Tạo khu vực thu mua
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
            {/* Name */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Tên khu vực:
              </TextR>
              <TextField
                text70
                grey10
                validate={"required"}
                value={name}
                onChangeText={setName}
                errorMessage={"Vui lòng nhập Tên"}
                errorColor={color.redColor}
              />
            </View>

            {/* Address */}
            <View>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>

              {/* <TextField
                  text70
                  grey10
                  validate={"required"}
                  value={address}
                  onChangeText={setAddress}
                  errorMessage={"Vui lòng nhập Địa chỉ"}
                  errorColor={color.redColor}
                  // title="Địa chỉ:"
                  // titleStyle={{ fontSize: Typography.text70.fontSize }}
                /> */}

              <View flex style={styles.addressContainer}>
                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    validate={"required"}
                    onChangeText={setVillage}
                    value={village}
                    placeholder="Ấp"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    errorMessage={"Bắt buộc"}
                    errorColor={color.redColor}
                    style={styles.addressItem}
                    autoCapitalize="words"
                  />
                </View>

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    validate={"required"}
                    onChangeText={setCommune}
                    value={commune}
                    placeholder="Xã"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    errorMessage={"Bắt buộc"}
                    errorColor={color.redColor}
                    style={styles.addressItem}
                    autoCapitalize="words"
                    marginL-20
                  />
                </View>

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    validate={"required"}
                    onChangeText={setTown}
                    value={town}
                    placeholder="Huyện"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    errorMessage={"Bắt buộc"}
                    errorColor={color.redColor}
                    style={styles.addressItem}
                    autoCapitalize="words"
                  />
                </View>

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    validate={"required"}
                    onChangeText={setProvince}
                    value={province}
                    placeholder="Tỉnh"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    errorMessage={"Bắt buộc"}
                    errorColor={color.redColor}
                    style={styles.addressItem}
                    autoCapitalize="words"
                  />
                </View>
              </View>
            </View>

            {/* Description */}
            <View>
              <TextR text70 style={styles.label}>
                Mô tả:
              </TextR>
              <TextField
                text70
                grey10
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>
          </View>

          <View flex marginT-30 center style={styles.btnContainer}>
            <CustomButton label="Nhập lại" onPress={reset} />
            <CustomButton label="Tạo" onPress={showAlert} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default AddRiceBuyingArea;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
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
