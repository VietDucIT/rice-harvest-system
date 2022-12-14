import React, { useState, useEffect, useCallback } from "react";
import {
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

import getRiceBuyingArea from "../../services/riceBuyingArea/getRiceBuyingArea";
import modifyRiceBuyingArea from "../../services/riceBuyingArea/modifyRiceBuyingArea";

StyleInit();

const { TextField } = Incubator;

const ModifyRiceBuyingArea = ({ navigation, route }) => {
  // call API to get Rice Buying Area data to fill the form
  const { idRiceBuyingArea } = route.params;
  const [buyingAreaData, setBuyingAreaData] = useState({}); // to get data from backend, refill after reset
  const getRiceBuyingAreaData = useCallback(async () => {
    try {
      const data = await getRiceBuyingArea(idRiceBuyingArea);
      // console.log("ModifyRiceBuyingArea - Rice Buying Area data: ", data);
      setBuyingAreaData(data);
      setRiceBuyingArea(data);
    } catch (err) {
      console.log(
        "ModifyRiceBuyingArea - Error while getting Rice Buying Area data."
      );
    }
  }, [idRiceBuyingArea]);
  useEffect(() => {
    getRiceBuyingAreaData();
  }, [getRiceBuyingAreaData]);

  const initState = {
    name: "",
    village: "",
    commune: "",
    town: "",
    province: "",
    description: "",
  };
  const [riceBuyingArea, setRiceBuyingArea] = useState(initState); // to send data to backend
  const [error, setError] = useState(initState);
  const [isReset, setIsReset] = useState(true);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChange = (text, field) => {
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
    setRiceBuyingArea(buyingAreaData);
    setIsReset(!isReset);
    setError(initState);
    console.log("ModifyRiceBuyingArea - Reset completed.");
  };

  // handle disable Submit button
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

  const handleModify = async () => {
    try {
      let dataAPI = await modifyRiceBuyingArea(riceBuyingArea);
      // console.log("ModifyRiceBuyingArea - Data API: ", dataAPI);
      if (dataAPI) {
        ToastAndroid.show(
          "Đã lưu thông tin khu vực thu mua",
          ToastAndroid.SHORT
        );
      }
      navigation.navigate(nameList.riceBuyingAreaInfo, {
        idRiceBuyingArea,
      });
    } catch (err) {
      console.log(
        "ModifyRiceBuyingArea - Error while modifying Rice Buying Area."
      );
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
                Chỉnh sửa khu vực thu mua
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
                style={styles.textField}
              />
              <Text red>{error.name}</Text>
            </View>

            {/* Address */}
            <View marginT-10>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>
              <AddressInput
                addressObject={riceBuyingArea}
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
