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

import UserOptionButton from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import AddressInput from "../core/AddressInput";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import addRiceBuyingArea from "../../services/riceBuyingArea/addRiceBuyingArea";

StyleInit();

const { TextField } = Incubator;

const AddRiceBuyingArea = ({ navigation }) => {
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
  const [isReset, setIsReset] = useState(true);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChange = (text, field) => {
    // text = text.trim();
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
    setIsReset(!isReset);
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
  const handleAdd = async () => {
    try {
      // setLoading(true);

      let dataAPI = await addRiceBuyingArea(riceBuyingArea);
      // console.log("Data API: ", dataAPI);
      Alert.alert("Thông báo", "Thêm khu vực thu mua thành công.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.goBack();
      // navigation.navigate(nameList.riceBuyingAreas);
      // setLoading(false);
    } catch (err) {
      console.log("Error while adding Rice Buying Area.");
    }
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionButton navigation={navigation} />

        <View paddingT-30>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Thêm khu vực thu mua
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
              <AddressInput
                handleAddress={(address) =>
                  setRiceBuyingArea({ ...riceBuyingArea, ...address })
                }
                isReset={isReset}
              />
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
  textField: {
    borderBottomWidth: 0.5,
    borderColor: color.lightGreyColor,
    paddingBottom: 5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
