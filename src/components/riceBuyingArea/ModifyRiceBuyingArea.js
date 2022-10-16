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

import modifyRiceBuyingArea from "../../services/riceBuyingArea/modifyRiceBuyingArea";

StyleInit();

const { TextField } = Incubator;

const ModifyRiceBuyingArea = ({ navigation }) => {
  const initState = {
    name: "",
    village: "",
    commune: "",
    town: "",
    province: "",
    description: "",
  };
  const [riceBuyingArea, setRiceBuyingArea] = useState(initState);
  const [error, setError] = useState(initState);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChange = (text, field) => {
    text = text.trim();
    let message = "";
    if (text === "" && field === "name") {
      message = "* Vui lòng nhập tên khu vực.";
    } else if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setError({
      ...error,
      [field]: message,
    });
    setRiceBuyingArea({
      ...riceBuyingArea,
      [field]: text,
    });
  };

  const reset = () => {
    setRiceBuyingArea(initState);
    setError(initState);
    console.log("Reset completed.");
  };

  // handle disable submit btn
  useEffect(() => {
    if (
      riceBuyingArea.name &&
      riceBuyingArea.village &&
      riceBuyingArea.commune &&
      riceBuyingArea.town &&
      riceBuyingArea.province
    ) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [riceBuyingArea]);

  // call API
  const handleModify = async () => {
    try {
      // setLoading(true);

      let dataAPI = await modifyRiceBuyingArea(riceBuyingArea);
      // console.log("Data API: ", dataAPI);
      Alert.alert("Thông báo", "Đã lưu thông tin khu vực thu mua.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.navigate(nameList.riceBuyingAreaInfo);
      // setLoading(false);
    } catch (err) {
      console.log("Error while modifying Rice Buying Area.");
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
            {/* Name */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Tên khu vực:
              </TextR>
              <TextField
                text70
                grey10
                value={riceBuyingArea.name}
                onChangeText={(text) => onChange(text, "name")}
                errorMessage={"Vui lòng nhập Tên."}
                errorColor={color.redColor}
                style={styles.textField}
              />
              <Text red style={styles.errorMessage}>
                {error.name}
              </Text>
            </View>

            {/* Address */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>

              <View flex style={styles.addressContainer}>
                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    value={riceBuyingArea.village}
                    onChangeText={(text) => onChange(text, "village")}
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

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    value={riceBuyingArea.commune}
                    onChangeText={(text) => onChange(text, "commune")}
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

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    value={riceBuyingArea.town}
                    onChangeText={(text) => onChange(text, "town")}
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

                <View marginH-20>
                  <TextField
                    text70
                    grey10
                    value={riceBuyingArea.province}
                    onChangeText={(text) => onChange(text, "province")}
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

            {/* Description */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Mô tả:
              </TextR>
              <TextField
                text70
                grey10
                multiline
                numberOfLines={3}
                value={riceBuyingArea.description}
                onChangeText={(text) => {
                  setRiceBuyingArea({
                    ...riceBuyingArea,
                    description: text,
                  });
                }}
                style={styles.textField}
              />
            </View>
          </View>

          <View flex marginT-50 center style={styles.btnContainer}>
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
export default ModifyRiceBuyingArea;

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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
