import React, { useState, useEffect } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import {
  DateTimePicker,
  Incubator,
  Picker,
  Text,
  View,
} from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getDayTime from "../../services/time/getDayTime";

StyleInit();

const { TextField } = Incubator;

const SuggestToBuy = ({ navigation }) => {
  const riceSeasonData = {
    id: 1,
    name: "Thu Đông 2022",
    riceField: "Mẫu ruộng số 1",
    rice: "OM 18",
    currentState: "Lúa chín",
    timeStart: "19/9/2022",
    timeEnd: "19/12/2022",
  };

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const { getDateString } = getDayTime();
  const currentDate = getDateString(currentTime);

  const [suggestedPrice, setSuggestedPrice] = useState("");
  const [suggestedTimeEnd, setSuggestedTimeEnd] = useState();
  const [description, setDescription] = useState("");
  const [errorSuggestedPrice, setErrorSuggestedPrice] = useState("");
  const [errorSuggestedTimeEnd, setErrorSuggestedTimeEnd] = useState("");

  const onChangeSuggestedPrice = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Vui lòng nhập giá đề xuất.";
    } else if (Number(text) <= 0) {
      message = "* Giá đề xuất phải lớn hơn 0.";
    } else {
      message = "";
    }
    setErrorSuggestedPrice(message);
    setSuggestedPrice(text);
  };

  const onChangeSuggestedTimeEnd = (text) => {
    let message = "";
    if (Date.parse(text) <= Date.parse(riceSeasonData.timeStart)) {
      message = "* Ngày đề xuất thu hoạch không hợp lệ.";
    } else {
      message = "";
    }
    setErrorSuggestedTimeEnd(message);
    setSuggestedTimeEnd(text);
  };

  const reset = () => {
    setSuggestedPrice("");
    setSuggestedTimeEnd();
    setErrorSuggestedPrice("");
    setErrorSuggestedTimeEnd("");
    setDescription("");
    console.log("Reset completed.");
  };

  const handleSuggest = () => {
    let hasErr = true;
    if (!suggestedTimeEnd) {
      setErrorSuggestedTimeEnd("* Vui lòng nhập ngày đề xuất thu hoạch.");
      hasErr = true;
    } else {
      setErrorSuggestedTimeEnd("");
      hasErr = false;
    }

    if (!hasErr) {
      Alert.alert("Thông báo", "Sửa đề xuất thu mua thành công.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.navigate(nameList.suggestToBuys);
    }
  };

  return (
    <ScrollView>
      <View flex marginB-60>
        <UserOptionModal />

        <View>
          <View center marginT-30>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Sửa đề xuất thu mua
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
            {/* Season Name */}
            <View>
              <TextR style={[styles.label, styles.disableLabel]}>Vụ mùa:</TextR>
              <TextField
                text70
                grey30
                placeholder={riceSeasonData.name}
                value={riceSeasonData.name}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Rice Field */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Ruộng lúa:
              </TextR>
              <TextField
                text70
                grey30
                placeholder={riceSeasonData.riceField}
                value={riceSeasonData.riceField}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Rice */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Giống lúa:
              </TextR>
              <TextField
                text70
                grey30
                placeholder={riceSeasonData.rice}
                value={riceSeasonData.rice}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Tình trạng hiện tại */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Tình trạng hiện tại:
              </TextR>
              <TextField
                text70
                grey30
                placeholder={riceSeasonData.currentState}
                value={riceSeasonData.currentState}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Time Start */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Thời gian sạ:
              </TextR>
              <TextField
                text70
                grey30
                placeholder={riceSeasonData.timeStart}
                value={riceSeasonData.timeStart}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Time End */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Thời gian gặt (dự kiến):
              </TextR>
              <TextField
                text70
                grey30
                placeholder={riceSeasonData.timeEnd}
                value={riceSeasonData.timeEnd}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Suggested Price */}
            <View marginT-20>
              <TextR style={styles.label}>Giá đề xuất (đồng/kg):</TextR>
              <TextField
                text70
                grey10
                value={suggestedPrice}
                onChangeText={onChangeSuggestedPrice}
                style={styles.textField}
                keyboardType="numeric"
              />
              <Text red style={styles.errorMessage}>
                {errorSuggestedPrice}
              </Text>
            </View>

            {/* Suggested Time End */}
            <View marginT-20>
              <TextR style={styles.label}>Ngày đề xuất thu hoạch:</TextR>
              <DateTimePicker
                migrateTextField
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
                value={suggestedTimeEnd}
                onChange={onChangeSuggestedTimeEnd}
              />
              <Text red style={styles.errorMessage}>
                {errorSuggestedTimeEnd}
              </Text>
            </View>

            {/* Description */}
            <View>
              <TextR style={styles.label}>Ghi chú:</TextR>
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

            <View flex marginT-30 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton label="Lưu" onPress={handleSuggest} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SuggestToBuy;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  disableLabel: {
    color: color.greyColor,
  },
  seasonNameContainer: {
    flexDirection: "row",
  },
  seasonName: {
    width: 150,
  },
  seasonYear: {
    width: 100,
  },
  textField: {
    borderBottomWidth: 0.5,
    borderColor: color.lightGreyColor,
    paddingBottom: 5,
  },
  errorMessage: {},
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
