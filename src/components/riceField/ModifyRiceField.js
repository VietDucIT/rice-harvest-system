import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Incubator, Text, Picker, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const { TextField } = Incubator;

const ModifyRiceField = ({ navigation }) => {
  let d1 = {};
  let d2 = {};
  let d3 = {};
  let d4 = {};
  const [address, setAddress] = useState("");
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
  const [errorVillage, setErrorVillage] = useState("");
  const [errorCommune, setErrorCommune] = useState("");
  const [errorTown, setErrorTown] = useState("");
  const [errorProvince, setErrorProvince] = useState("");
  const [errorX1, setErrorX1] = useState("");
  const [errorY1, setErrorY1] = useState("");
  const [errorX2, setErrorX2] = useState("");
  const [errorY2, setErrorY2] = useState("");
  const [errorX3, setErrorX3] = useState("");
  const [errorY3, setErrorY3] = useState("");
  const [errorX4, setErrorX4] = useState("");
  const [errorY4, setErrorY4] = useState("");
  const [description, setDescription] = useState("");

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
    setErrorVillage("");
    setErrorCommune("");
    setErrorTown("");
    setErrorProvince("");
    setErrorX1("");
    setErrorY1("");
    setErrorX2("");
    setErrorY2("");
    setErrorX3("");
    setErrorY3("");
    setErrorX4("");
    setErrorY4("");
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

  const onChangeX1 = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorX1(message);
    setX1(text);
  };

  const onChangeY1 = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorY1(message);
    setY1(text);
  };

  const onChangeX2 = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorX2(message);
    setX2(text);
  };

  const onChangeY2 = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorY2(message);
    setY2(text);
  };

  const onChangeX3 = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorX3(message);
    setX3(text);
  };

  const onChangeY3 = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorY3(message);
    setY3(text);
  };

  const onChangeX4 = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorX4(message);
    setX4(text);
  };

  const onChangeY4 = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorY4(message);
    setY4(text);
  };

  const handleModify = () => {
    Alert.alert("Thông báo", "Đã lưu thông tin ruộng lúa.", [
      {
        text: "Đóng",
        style: "cancel",
      },
    ]);
    navigation.navigate(nameList.riceFields);
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
                Chỉnh sửa thông tin
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
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
                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeX1}
                    value={x1}
                    placeholder="X"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                  />
                  <Text red style={styles.errorMessage}>
                    {errorX1}
                  </Text>
                </View>
                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeY1}
                    value={y1}
                    placeholder="Y"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                  />
                  <Text red style={styles.errorMessage}>
                    {errorY1}
                  </Text>
                </View>
                {/* <TextField
                  text70
                  grey10
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
                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeX2}
                    value={x2}
                    placeholder="X"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                  />
                  <Text red style={styles.errorMessage}>
                    {errorX2}
                  </Text>
                </View>
                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeY2}
                    value={y2}
                    placeholder="Y"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                  />
                  <Text red style={styles.errorMessage}>
                    {errorY2}
                  </Text>
                </View>
              </View>

              {/* D3 */}
              <View flex style={styles.coordItemContainer}>
                <TextR text70 style={styles.label}>
                  Điểm 3:
                </TextR>
                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeX3}
                    value={x3}
                    placeholder="X"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                  />
                  <Text red style={styles.errorMessage}>
                    {errorX3}
                  </Text>
                </View>
                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeY3}
                    value={y3}
                    placeholder="Y"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                  />
                  <Text red style={styles.errorMessage}>
                    {errorY3}
                  </Text>
                </View>
              </View>

              {/* D4 */}
              <View flex style={styles.coordItemContainer}>
                <TextR text70 style={styles.label}>
                  Điểm 4:
                </TextR>
                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeX4}
                    value={x4}
                    placeholder="X"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                  />
                  <Text red style={styles.errorMessage}>
                    {errorX4}
                  </Text>
                </View>
                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={onChangeY4}
                    value={y4}
                    placeholder="Y"
                    floatingPlaceholder
                    floatOnFocus
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                  />
                  <Text red style={styles.errorMessage}>
                    {errorY4}
                  </Text>
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
                style={styles.textField}
              />
            </View>
          </View>

          <View flex marginT-30 center style={styles.btnContainer}>
            <CustomButton label="Nhập lại" onPress={reset} />
            <CustomButton label="Lưu" onPress={handleModify} />
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
