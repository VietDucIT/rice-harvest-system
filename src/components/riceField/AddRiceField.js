import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Incubator, Text, View } from "react-native-ui-lib";

// import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import AddressInput from "../core/AddressInput";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import addRiceField from "../../services/riceField/addRiceField";

StyleInit();

const { TextField } = Incubator;

const AddRiceField = ({ navigation }) => {
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
  const [isReset, setIsReset] = useState(true);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  // useEffect(() => {
  //   setRiceField({
  //     ...riceField,
  //     d1: Object.assign({ lat: x1, lon: y1 }),
  //   });
  // }, [x1, y1]);

  const onChange = (text, field) => {
    // text = text.trim();
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
    setIsReset(!isReset);
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

  // call API
  const handleAdd = async () => {
    try {
      // setLoading(true);

      // console.log("Data: ", riceField);
      let dataAPI = await addRiceField(riceField);
      // console.log("Data API: ", dataAPI);
      Alert.alert("Thông báo", "Thêm ruộng lúa thành công.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.goBack();
      // navigation.navigate(nameList.riceFields);
      // setLoading(false);
    } catch (err) {
      console.log("Error while adding Rice Field.");
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
                Thêm ruộng lúa
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
            {/* Address */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>
              <AddressInput
                handleAddress={(address) =>
                  setRiceField({ ...riceField, ...address })
                }
                isReset={isReset}
              />
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
                    value={riceField.x1}
                    onChangeText={(text) => onChange(text, "x1")}
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
                    value={riceField.y1}
                    onChangeText={(text) => onChange(text, "y1")}
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
                {/* <TextField
                  text70
                  grey10
                  onChangeText={setD1}
                  value={riceField.d1}
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
                    value={riceField.x2}
                    onChangeText={(text) => onChange(text, "x2")}
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
                    value={riceField.y2}
                    onChangeText={(text) => onChange(text, "y2")}
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
                    value={riceField.x3}
                    onChangeText={(text) => onChange(text, "x3")}
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
                    value={riceField.y3}
                    onChangeText={(text) => onChange(text, "y3")}
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
                    value={riceField.x4}
                    onChangeText={(text) => onChange(text, "x4")}
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
                    value={riceField.y4}
                    onChangeText={(text) => onChange(text, "y4")}
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
              label="Thêm"
              onPress={handleAdd}
              disabled={isDisableBtn}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default AddRiceField;

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
