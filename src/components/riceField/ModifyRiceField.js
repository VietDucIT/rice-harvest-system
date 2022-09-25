import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  Text as TextR,
} from "react-native";
import { View, TextField, Text, Typography, Picker } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import Color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

const ModifyRiceField = ({ navigation }) => {
  let d1 = {};
  let d2 = {};
  let d3 = {};
  let d4 = {};
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [village, setVillage] = useState("");
  const [commune, setCommune] = useState("");
  const [town, setTown] = useState("");
  const [province, setProvince] = useState("");
  const [x1, setX1] = useState(0);
  const [y1, setY1] = useState(0);
  const [x2, setX2] = useState(0);
  const [y2, setY2] = useState(0);
  const [x3, setX3] = useState(0);
  const [y3, setY3] = useState(0);
  const [x4, setX4] = useState(0);
  const [y4, setY4] = useState(0);
  // const [coordinate, setCoordinate] = useState({});

  const reset = () => {
    setAddress("");
    setVillage("");
    setCommune("");
    setTown("");
    setProvince("");
    setX1(0);
    setY1(0);
    setX2(0);
    setY2(0);
    setX3(0);
    setY3(0);
    setX4(0);
    setY4(0);
    // setCoordinate({});
    setDescription("");
    console.log("Reset completed.");
  };

  useEffect(() => {
    d1 = Object.assign({ lat: x1, lon: y1 });
  }, [x1, y1]);

  useEffect(() => {
    d2 = Object.assign({ lat: x2, lon: y2 });
  }, [x2, y2]);

  useEffect(() => {
    d3 = Object.assign({ lat: x3, lon: y3 });
  }, [x3, y3]);

  useEffect(() => {
    d4 = Object.assign({ lat: x4, lon: y4 });
  }, [x4, y4]);

  const showAlert = () =>
    Alert.alert("Thông báo", "Đã lưu thông tin ruộng lúa.", [
      {
        text: "Đóng",
        style: "cancel",
      },
    ]);

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
                Đăng ký thông tin
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
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
                  errorColor={Color.redColor}
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
                    errorColor={Color.redColor}
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
                    errorColor={Color.redColor}
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
                    errorColor={Color.redColor}
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
                    errorColor={Color.redColor}
                    style={styles.addressItem}
                    autoCapitalize="words"
                  />
                </View>
              </View>
            </View>

            {/* Coordinate */}
            <View>
              <TextR text70 style={styles.label}>
                Tọa độ:
              </TextR>

              {/* D1 */}
              <View flex style={styles.coordItemContainer}>
                <TextR text70 style={styles.label}>
                  Điểm 1:
                </TextR>
                <TextField
                  text70
                  grey10
                  validate={"required"}
                  onChangeText={setX1}
                  value={x1}
                  placeholder="X"
                  floatingPlaceholder
                  floatOnFocus
                  containerStyle={{ marginBottom: 10 }}
                  errorMessage={"Bắt buộc"}
                  errorColor={Color.redColor}
                  style={styles.coorItem}
                />
                <TextField
                  text70
                  grey10
                  validate={"required"}
                  onChangeText={setY1}
                  value={y1}
                  placeholder="Y"
                  floatingPlaceholder
                  floatOnFocus
                  containerStyle={{ marginBottom: 10 }}
                  errorMessage={"Bắt buộc"}
                  errorColor={Color.redColor}
                  style={styles.coorItem}
                />
                {/* <TextField
                    text70
                    grey10
                    validate={"required"}
                    onChangeText={setD1}
                    value={d1}
                    placeholder="Điểm 1"
                  /> */}
              </View>

              {/* D2 */}
              <View flex style={styles.coordItemContainer}>
                <TextR text70 style={styles.label}>
                  Điểm 2:
                </TextR>
                <TextField
                  text70
                  grey10
                  validate={"required"}
                  onChangeText={setX2}
                  value={x2}
                  placeholder="X"
                  floatingPlaceholder
                  floatOnFocus
                  containerStyle={{ marginBottom: 10 }}
                  errorMessage={"Bắt buộc"}
                  errorColor={Color.redColor}
                  style={styles.coorItem}
                />
                <TextField
                  text70
                  grey10
                  validate={"required"}
                  onChangeText={setY2}
                  value={y2}
                  placeholder="Y"
                  floatingPlaceholder
                  floatOnFocus
                  containerStyle={{ marginBottom: 10 }}
                  errorMessage={"Bắt buộc"}
                  errorColor={Color.redColor}
                  style={styles.coorItem}
                />
              </View>

              {/* D3 */}
              <View flex style={styles.coordItemContainer}>
                <TextR text70 style={styles.label}>
                  Điểm 3:
                </TextR>
                <TextField
                  text70
                  grey10
                  validate={"required"}
                  onChangeText={setX3}
                  value={x3}
                  placeholder="X"
                  floatingPlaceholder
                  floatOnFocus
                  containerStyle={{ marginBottom: 10 }}
                  errorMessage={"Bắt buộc"}
                  errorColor={Color.redColor}
                  style={styles.coorItem}
                />
                <TextField
                  text70
                  grey10
                  validate={"required"}
                  onChangeText={setY3}
                  value={y3}
                  placeholder="Y"
                  floatingPlaceholder
                  floatOnFocus
                  containerStyle={{ marginBottom: 10 }}
                  errorMessage={"Bắt buộc"}
                  errorColor={Color.redColor}
                  style={styles.coorItem}
                />
              </View>

              {/* D4 */}
              <View flex style={styles.coordItemContainer}>
                <TextR text70 style={styles.label}>
                  Điểm 4:
                </TextR>
                <TextField
                  text70
                  grey10
                  validate={"required"}
                  onChangeText={setX4}
                  value={x4}
                  placeholder="X"
                  floatingPlaceholder
                  floatOnFocus
                  containerStyle={{ marginBottom: 10 }}
                  errorMessage={"Bắt buộc"}
                  errorColor={Color.redColor}
                  style={styles.coorItem}
                />
                <TextField
                  text70
                  grey10
                  validate={"required"}
                  onChangeText={setY4}
                  value={y4}
                  placeholder="Y"
                  floatingPlaceholder
                  floatOnFocus
                  containerStyle={{ marginBottom: 10 }}
                  errorMessage={"Bắt buộc"}
                  errorColor={Color.redColor}
                  style={styles.coorItem}
                />
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
            <CustomButton label="Lưu" onPress={showAlert} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ModifyRiceField;

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
  coordItemContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  coorItem: {
    width: 100,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
