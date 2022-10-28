import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { DateTimePicker, Incubator, Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceSeason from "../../services/riceSeason/getRiceSeason";
import addSuggestToBuy from "../../services/suggestToBuy/addSuggestToBuy";

StyleInit();

const { TextField } = Incubator;

const SuggestToBuy = ({ navigation, route }) => {
  const { idRiceSeason } = route.params;
  const [seasonData, setSeasonData] = useState({});

  // call API to get Rice Season data
  const getRiceSeasonData = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceSeason(idRiceSeason);
      // console.log("Rice Season data: ", data);
      setSeasonData(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Season data.");
    }
  }, [idRiceSeason]);

  useEffect(() => {
    getRiceSeasonData();
  }, [getRiceSeasonData]);

  // const seasonData = {
  //   id: 1,
  //   name: "Thu Đông 2022",
  //   riceField: "Mẫu ruộng số 1",
  //   rice: "OM 18",
  //   currentState: "Lúa chín",
  //   timeStart: "19/9/2022",
  //   timeEnd: "19/12/2022",
  // };

  const initState = {
    suggestedPrice: "",
    suggestedTimeEnd: "",
    description: "",
  };
  const [suggestToBuy, setSuggestToBuy] = useState(initState);
  const [error, setError] = useState(initState);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChange = (text, field) => {
    text = text.trim();
    let message = "";
    if (text === "" && field === "suggestedPrice") {
      message = "* Vui lòng nhập giá đề xuất.";
    } else if (Number(text) <= 0 && field === "suggestedPrice") {
      message = "* Giá đề xuất phải lớn hơn 0.";
    } else if (
      field === "suggestedTimeEnd" &&
      Date.parse(text) <= Date.parse(seasonData.timeStart)
    ) {
      message = "* Ngày đề xuất thu hoạch không hợp lệ.";
    } else {
      message = "";
    }
    setError({
      ...error,
      [field]: message,
    });
    setSuggestToBuy({
      ...suggestToBuy,
      [field]: text,
    });
  };

  const reset = () => {
    setSuggestToBuy(initState);
    setError(initState);
    console.log("Reset completed.");
  };

  // handle disable submit btn
  useEffect(() => {
    if (suggestToBuy.suggestedPrice && suggestToBuy.suggestedTimeEnd) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [suggestToBuy]);

  const handleSuggest = async () => {
    let hasErr = true;
    if (!suggestToBuy.suggestedPrice) {
      setError({
        ...error,
        suggestedPrice: "* Vui lòng nhập giá đề xuất.",
      });
      hasErr = true;
    } else {
      setError({
        ...error,
        suggestedPrice: "",
      });
    }
    if (!suggestToBuy.suggestedTimeEnd) {
      setError({
        ...error,
        suggestedTimeEnd: "* Vui lòng nhập ngày đề xuất thu hoạch.",
      });
      hasErr = true;
    } else {
      setError({
        ...error,
        suggestedTimeEnd: "",
      });
    }
    // if (!error.suggestedPrice && !error.suggestedTimeEnd) {
    //   hasErr = false;
    // }

    if (!hasErr) {
      try {
        // setLoading(true);

        let merge = { suggestToBuy, seasonData };
        let dataAPI = await addSuggestToBuy(merge);
        // console.log("Data API: ", dataAPI);
        Alert.alert("Thông báo", "Đề xuất thu mua thành công.", [
          {
            text: "Đóng",
            style: "cancel",
          },
        ]);
        navigation.navigate(nameList.suggestToBuys);
        // setLoading(false);
      } catch (err) {
        console.log("Error while adding Suggest To Buy.");
      }
    }
  };

  return (
    <ScrollView>
      <View flex marginB-60>
        <UserOptionButton navigation={navigation} />

        <View>
          <View center marginT-30>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Đề xuất thu mua
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
            {/* Season Full Name */}
            <View>
              <TextR style={[styles.label, styles.disableLabel]}>Vụ mùa:</TextR>
              <TextField
                text70
                grey30
                placeholder={
                  seasonData.seasonName + " " + seasonData.seasonYear
                }
                value={seasonData.seasonName + " " + seasonData.seasonYear}
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
                placeholder={seasonData.riceField}
                value={seasonData.riceField}
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
                placeholder={seasonData.rice}
                value={seasonData.rice}
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
                placeholder={seasonData.currentState}
                value={seasonData.currentState}
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
                placeholder={seasonData.timeStart}
                value={seasonData.timeStart}
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
                placeholder={seasonData.timeEnd}
                value={seasonData.timeEnd}
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
                value={suggestToBuy.suggestedPrice}
                onChangeText={(text) => onChange(text, "suggestedPrice")}
                style={styles.textField}
                keyboardType="numeric"
              />
              <Text red style={styles.errorMessage}>
                {error.suggestedPrice}
              </Text>
            </View>

            {/* Suggested Time End */}
            <View marginT-20>
              <TextR style={styles.label}>Ngày đề xuất thu hoạch:</TextR>
              <DateTimePicker
                migrateTextField
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
                value={suggestToBuy.suggestedTimeEnd}
                onChange={(text) => onChange(text, "suggestedTimeEnd")}
              />
              <Text red style={styles.errorMessage}>
                {error.suggestedTimeEnd}
              </Text>
            </View>

            {/* Description */}
            <View>
              <TextR style={styles.label}>Ghi chú:</TextR>
              <TextField
                text70
                grey10
                multiline
                numberOfLines={2}
                value={suggestToBuy.description}
                onChangeText={(text) => {
                  setSuggestToBuy({ ...suggestToBuy, description: text });
                }}
                style={styles.textField}
              />
            </View>

            <View flex marginT-30 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton
                label="Gửi"
                onPress={handleSuggest}
                disabled={isDisableBtn}
              />
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
