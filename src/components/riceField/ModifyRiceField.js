import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
  ToastAndroid,
} from "react-native";
import { Incubator, Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";
import AddressInput from "../core/AddressInput";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceField from "../../services/riceField/getRiceField";
import modifyRiceField from "../../services/riceField/modifyRiceField";

StyleInit();

const { TextField } = Incubator;

const ModifyRiceField = ({ navigation, route }) => {
  // call API to get Rice Field data to fill the form
  const { idRiceField } = route.params;
  const [fieldData, setFieldData] = useState({});
  const getRiceFieldData = useCallback(async () => {
    try {
      const data = await getRiceField(idRiceField);
      // console.log("ModifyRiceField - Rice Field data: ", data);
      setFieldData(data);
      setRiceField(data);
    } catch (err) {
      console.log("ModifyRiceField - Error while getting Rice Field data.");
    }
  }, [idRiceField]);
  useEffect(() => {
    getRiceFieldData();
  }, [getRiceFieldData]);

  const initState = {
    name: "",
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
  const [riceField, setRiceField] = useState(fieldData);
  const [error, setError] = useState(initState);
  const [isReset, setIsReset] = useState(true);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

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
    setRiceField(fieldData);
    setIsReset(!isReset);
    setError(initState);
    console.log("ModifyRiceField - Reset completed.");
  };

  // handle disable Submit button
  useEffect(() => {
    if (
      riceField.name &&
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

  const handleModify = async () => {
    try {
      // console.log("ModifyRiceField - Data: ", riceField);
      let dataAPI = await modifyRiceField(riceField);
      // console.log("ModifyRiceField - Data API: ", dataAPI);
      if (dataAPI) {
        ToastAndroid.show("Đã lưu thông tin ruộng lúa", ToastAndroid.SHORT);
      }
      // Alert.alert("Thông báo", "Đã lưu thông tin ruộng lúa.", [
      //   {
      //     text: "Đóng",
      //     style: "cancel",
      //   },
      // ]);
      navigation.navigate(nameList.riceFieldInfo, {
        idRiceField: riceField._id,
      });
    } catch (err) {
      console.log("ModifyRiceField - Error while modifying Rice Field.");
    }
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionButton navigation={navigation} />

        <View>
          <View center marginT-30>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Chỉnh sửa ruộng lúa
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
            {/* Name */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Tên gợi nhớ:
              </TextR>
              <TextField
                text70
                grey10
                value={riceField.name}
                onChangeText={(text) => onChange(text, "name")}
                style={styles.textField}
                autoCapitalize="words"
              />
              <Text red>{error.name}</Text>
            </View>

            {/* Address */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>
              <AddressInput
                addressObject={riceField}
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
                  <Text red>{error.x1}</Text>
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
                  <Text red>{error.y1}</Text>
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
                  <Text red>{error.x2}</Text>
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
                  <Text red>{error.y2}</Text>
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
                  <Text red>{error.x3}</Text>
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
                  <Text red>{error.y3}</Text>
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
                  <Text red>{error.x4}</Text>
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
                  <Text red>{error.y4}</Text>
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
