import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Incubator, Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import modifyRiceField from "../../services/riceField/modifyRiceField";

StyleInit();

const { TextField } = Incubator;

const ModifyRiceField = ({ navigation }) => {
  const initState = {
    village: "",
    commune: "",
    town: "",
    province: "",
    x1: "",
    y1: "",
    x2: "",
    y2: "",
    x3: "",
    y3: "",
    x4: "",
    y4: "",
    description: "",
  };
  const [riceField, setRiceField] = useState(initState);
  const [error, setError] = useState(initState);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChange = (text, field) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setError({
      ...error,
      [field]: message,
    });
    setRiceField({
      ...riceField,
      [field]: text,
    });
  };

  const reset = () => {
    setRiceField(initState);
    setError(initState);
    console.log("Reset completed.");
  };

  // handle disable submit btn
  useEffect(() => {
    if (
      riceField.village &&
      riceField.commune &&
      riceField.town &&
      riceField.province &&
      riceField.x1 &&
      riceField.y1 &&
      riceField.x2 &&
      riceField.y2 &&
      riceField.x3 &&
      riceField.y3 &&
      riceField.x4 &&
      riceField.y4
    ) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [riceField]);

  // gọi API
  const handleModify = async () => {
    try {
      // setLoading(true);

      // console.log("Data: ", riceField);
      let dataAPI = await modifyRiceField(riceField);
      // console.log("Data API: ", dataAPI);
      Alert.alert("Thông báo", "Đã lưu thông tin ruộng lúa.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.navigate(nameList.riceFields);
      // setLoading(false);
    } catch (err) {
      console.log("Error while modifying Rice Field.");
    }
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

              {/* Village */}
              <View flex style={styles.addressContainer}>
                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    onChangeText={(text) => onChange(text, "village")}
                    value={riceField.village}
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

                {/* Commune */}
                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    onChangeText={(text) => onChange(text, "commune")}
                    value={riceField.commune}
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

                {/* Town */}
                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    onChangeText={(text) => onChange(text, "town")}
                    value={riceField.town}
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

                {/* Province */}
                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    onChangeText={(text) => onChange(text, "province")}
                    value={riceField.province}
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
                    onChangeText={(text) => onChange(text, "x1")}
                    value={riceField.x1}
                    placeholder="X"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                    keyboardType="numeric"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.x1}
                  </Text>
                </View>

                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={(text) => onChange(text, "y1")}
                    value={riceField.y1}
                    placeholder="Y"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                    keyboardType="numeric"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.y1}
                  </Text>
                </View>
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
                    onChangeText={(text) => onChange(text, "x2")}
                    value={riceField.x2}
                    placeholder="X"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                    keyboardType="numeric"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.x2}
                  </Text>
                </View>

                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={(text) => onChange(text, "y2")}
                    value={riceField.y2}
                    placeholder="Y"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                    keyboardType="numeric"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.y2}
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
                    onChangeText={(text) => onChange(text, "x3")}
                    value={riceField.x3}
                    placeholder="X"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                    keyboardType="numeric"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.x3}
                  </Text>
                </View>

                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={(text) => onChange(text, "y3")}
                    value={riceField.y3}
                    placeholder="Y"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                    keyboardType="numeric"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.y3}
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
                    onChangeText={(text) => onChange(text, "x4")}
                    value={riceField.x4}
                    placeholder="X"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                    keyboardType="numeric"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.x4}
                  </Text>
                </View>

                <View>
                  <TextField
                    text70
                    grey10
                    onChangeText={(text) => onChange(text, "y4")}
                    value={riceField.y4}
                    placeholder="Y"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    style={[styles.coorItem, styles.textField]}
                    keyboardType="numeric"
                  />
                  <Text red style={styles.errorMessage}>
                    {error.y4}
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
                value={riceField.description}
                onChangeText={(text) => {
                  setRiceField({
                    ...riceField,
                    description: text,
                  });
                }}
                style={styles.textField}
              />
            </View>
          </View>

          <View flex marginT-40 center style={styles.btnContainer}>
            <CustomButton label="Nhập lại" onPress={reset} />
            <CustomButton
              label="Lưu"
              onPress={handleModify}
              disabled={isDisableBtn}
            />
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
