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
  const [riceBuyingArea, setRiceBuyingArea] = useState({});
  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [village, setVillage] = useState("");
  // const [commune, setCommune] = useState("");
  // const [town, setTown] = useState("");
  // const [province, setProvince] = useState("");
  // const [description, setDescription] = useState("");

  const [isDisableBtn, setIsDisableBtn] = useState(true);
  const [errorName, setErrorName] = useState("");
  const [errorVillage, setErrorVillage] = useState("");
  const [errorCommune, setErrorCommune] = useState("");
  const [errorTown, setErrorTown] = useState("");
  const [errorProvince, setErrorProvince] = useState("");

  const onChangeName = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Vui lòng nhập tên khu vực.";
    } else {
      message = "";
    }
    setErrorName(message);
    // setName(text);
    setRiceBuyingArea({
      ...riceBuyingArea,
      name: text,
    });
  };

  const onChangeVillage = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else {
      message = "";
    }
    setErrorVillage(message);
    // setVillage(text);
    setRiceBuyingArea({
      ...riceBuyingArea,
      village: text,
    });
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
    // setCommune(text);
    setRiceBuyingArea({
      ...riceBuyingArea,
      commune: text,
    });
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
    // setTown(text);
    setRiceBuyingArea({
      ...riceBuyingArea,
      town: text,
    });
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
    // setProvince(text);
    setRiceBuyingArea({
      ...riceBuyingArea,
      province: text,
    });
  };

  const onChangeDescription = (text) => {
    setRiceBuyingArea({
      ...riceBuyingArea,
      description: text,
    });
  };

  const reset = () => {
    setRiceBuyingArea({});
    // setName("");
    // setAddress("");
    // setVillage("");
    // setCommune("");
    // setTown("");
    // setProvince("");
    // setDescription("");
    setErrorName("");
    setErrorVillage("");
    setErrorCommune("");
    setErrorTown("");
    setErrorProvince("");
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

  // gọi API
  const handleModify = async () => {
    try {
      // setLoading(true);

      let dataAPI = await addRiceBuyingArea(riceBuyingArea);
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
                // validate={"required"}
                value={riceBuyingArea.name}
                onChangeText={onChangeName}
                errorMessage={"Vui lòng nhập Tên."}
                errorColor={color.redColor}
                style={styles.textField}
              />
              <Text red style={styles.errorMessage}>
                {errorName}
              </Text>
            </View>

            {/* Address */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>

              {/* <TextField
                  text70
                  grey10
                  value={riceBuyingArea.address}
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
                    value={riceBuyingArea.village}
                    placeholder="Ấp"
                    floatingPlaceholder
                    floatOnFocus
                    floatingPlaceholderColor={{
                      focus: color.greenColor,
                      default: color.lightGreyColor,
                    }}
                    containerStyle={{ marginBottom: 10 }}
                    // errorMessage={"Bắt buộc."}
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
                    value={riceBuyingArea.commune}
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
                    value={riceBuyingArea.town}
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
                    value={riceBuyingArea.province}
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
                onChangeText={onChangeDescription}
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
