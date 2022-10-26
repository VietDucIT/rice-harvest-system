import React, { useState, useEffect, useCallback } from "react";
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

import seasonNameArray from "../../json/seasonName";
import seasonStateArray from "../../json/seasonState";
import getRiceFieldList from "../../services/riceField/getRiceFieldList";
import getRiceList from "../../services/rice/getRiceList";
import getRiceSeason from "../../services/riceSeason/getRiceSeason";
import modifyRiceSeason from "../../services/riceSeason/modifyRiceSeason";

StyleInit();

const { TextField } = Incubator;

const ModifyRiceSeason = ({ navigation, route }) => {
  // call API to get Rice Season data to fill the form
  const { idRiceSeason } = route.params;
  const [seasonData, setSeasonData] = useState({});
  const getRiceSeasonData = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceSeason(idRiceSeason);
      // console.log("Rice Season data: ", data);
      setSeasonData(data);
      setRiceSeason(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Season data.");
    }
  }, [idRiceSeason]);
  useEffect(() => {
    getRiceSeasonData();
  }, [getRiceSeasonData]);

  // HOW TO KNOW WHICH FIELDS A FARMER HAS ???
  // call API to get Rice Field list
  const [riceFieldArray, setRiceFieldArray] = useState([]);
  const getRiceFieldArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceFieldList();
      // console.log("Rice Field list: ", data);
      setRiceFieldArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Field list.");
    }
  }, []);
  useEffect(() => {
    getRiceFieldArray();
  }, [getRiceFieldArray]);

  // call API to get Rice list
  const [riceArray, setRiceArray] = useState([]);
  const getRiceArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceList();
      // console.log("Rice list: ", data);
      setRiceArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice list.");
    }
  }, []);
  useEffect(() => {
    getRiceArray();
  }, [getRiceArray]);

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const seasonYearArray = [];
  for (let i = currentYear + 1; i >= currentYear - 10; i--) {
    seasonYearArray.push(i.toString);
  }

  const initState = {
    seasonName: "",
    seasonYear: "",
    riceField: "",
    rice: "",
    currentState: "",
    timeStart: "",
    timeEnd: "",
    totalRice: "",
    description: "",
  };
  const [riceSeason, setRiceSeason] = useState(initState);
  const [error, setError] = useState(initState);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChangeTotalRice = (text) => {
    text = text.trim();
    let message = "";
    if (text === "") {
      message = "* Bắt buộc.";
    } else if (Number(text) <= 0) {
      message = "* Sản lượng phải lớn hơn 0.";
    } else {
      message = "";
    }
    setErrorTotalRice(message);
    // setTotalRice(text);
    setRiceSeason({ ...riceSeason, totalRice: text });
  };

  const reset = () => {
    setRiceSeason(seasonData);
    setError(initState);
    console.log("Reset completed.");
  };

  // handle disable submit btn
  useEffect(() => {
    if (
      riceSeason.seasonName &&
      riceSeason.seasonYear &&
      riceSeason.riceField &&
      riceSeason.rice &&
      riceSeason.currentState &&
      riceSeason.timeStart
    ) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [riceField]);

  const handleModify = async () => {
    let err = false;
    if (!seasonName) {
      setError({ ...error, seasonName: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, seasonName: "" });
      err = true;
    }

    if (!seasonYear) {
      setError({ ...error, seasonYear: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, seasonYear: "" });
      err = true;
    }

    if (!riceSeason.riceField) {
      setError({ ...error, riceField: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, riceField: "" });
      err = true;
    }

    if (!riceSeason.rice) {
      setError({ ...error, rice: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, rice: "" });
      err = true;
    }

    if (!riceSeason.currentState) {
      setError({ ...error, currentState: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, currentState: "" });
      err = true;
    }

    if (!riceSeason.timeStart) {
      setError({ ...error, timeStart: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, timeStart: "" });
      err = true;
    }

    if (err) {
      try {
        // setLoading(true);

        let dataAPI = await modifyRiceSeason(riceSeason);
        // console.log("Data API: ", dataAPI);
        Alert.alert("Thông báo", "Đã lưu thông tin vụ mùa.", [
          {
            text: "Đóng",
            style: "cancel",
          },
        ]);
        navigation.navigate(nameList.riceSeasons);
        // setLoading(false);
      } catch (err) {
        console.log("Error while modifying Rice Season.");
      }
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
                Chỉnh sửa thông tin
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
            {/* Season Name */}
            <View>
              <TextR style={styles.label}>Vụ mùa:</TextR>
              <View flex style={styles.seasonNameContainer}>
                <View>
                  <Picker
                    migrateTextField
                    text70
                    value={riceSeason.seasonName}
                    placeholder={"Chọn vụ mùa"}
                    onChange={(name) => {
                      setRiceSeason({ ...riceSeason, seasonName: name.value });
                    }}
                    style={[styles.seasonName, styles.textField]}
                  >
                    {seasonNameArray.map((item, index) => (
                      <Picker.Item
                        key={index}
                        value={item.name}
                        label={item.name}
                      />
                    ))}
                  </Picker>
                  <Text red style={styles.errorMessage}>
                    {error.seasonName}
                  </Text>
                </View>

                <View marginL-20>
                  <Picker
                    migrateTextField
                    text70
                    value={riceSeason.seasonYear}
                    placeholder={"Chọn năm"}
                    onChange={(year) => {
                      setRiceSeason({ ...riceSeason, seasonYear: year.value });
                    }}
                    style={[styles.seasonYear, styles.textField]}
                  >
                    {seasonYearArray.map((item, index) => (
                      <Picker.Item key={index} value={item} label={item} />
                    ))}
                  </Picker>
                  <Text red style={styles.errorMessage}>
                    {error.seasonYear}
                  </Text>
                </View>
              </View>
            </View>

            {/* Rice Field */}
            <View marginT-20>
              <TextR style={styles.label}>Ruộng lúa:</TextR>
              <Picker
                migrateTextField
                text70
                value={riceSeason.riceField}
                placeholder={"Chọn ruộng lúa"}
                onChange={(field) => {
                  setRiceSeason({ ...riceSeason, riceField: field.value });
                }}
                style={styles.textField}
              >
                {riceFieldArray.map((item, index) => (
                  <Picker.Item
                    key={index}
                    value={item._id}
                    label={"Mẫu ruộng số " + item._id}
                  />
                ))}
              </Picker>
              <Text red style={styles.errorMessage}>
                {error.riceField}
              </Text>
            </View>

            {/* Rice */}
            <View marginT-20>
              <TextR style={styles.label}>Giống lúa:</TextR>
              <Picker
                migrateTextField
                text70
                value={riceSeason.rice}
                placeholder={"Chọn giống lúa"}
                onChange={(rice) => {
                  setRiceSeason({ ...riceSeason, rice: rice.value });
                }}
                style={styles.textField}
              >
                {riceArray.map((item, index) => (
                  <Picker.Item key={index} value={item} label={item} />
                ))}
              </Picker>
              <Text red style={styles.errorMessage}>
                {error.rice}
              </Text>
            </View>

            {/* Tình trạng hiện tại */}
            <View marginT-20>
              <TextR style={styles.label}>Tình trạng hiện tại:</TextR>
              <Picker
                migrateTextField
                text70
                value={riceSeason.currentState}
                placeholder={"Chọn tình trạng"}
                onChange={(state) => {
                  setRiceSeason({ ...riceSeason, currentState: state.value });
                }}
                style={styles.textField}
              >
                {seasonStateArray.map((item, index) => (
                  <Picker.Item
                    key={index}
                    value={item.name}
                    label={item.name}
                  />
                ))}
              </Picker>
              <Text red style={styles.errorMessage}>
                {error.currentState}
              </Text>
            </View>

            {/* Time Start */}
            <View marginT-20>
              <TextR style={styles.label}>Thời gian sạ:</TextR>
              <DateTimePicker
                migrateTextField
                containerStyle={{ marginVertical: 20 }}
                // label={"Date"}
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
                // value={new Date('September 19, 2022')}
                value={riceSeason.timeStart}
                onChange={(time) => {
                  setRiceSeason({ ...riceSeason, timeStart: time });
                }}
              />
              <Text red style={styles.errorMessage}>
                {error.timeStart}
              </Text>
            </View>

            {/* Time End */}
            <View marginT-20>
              <TextR style={styles.label}>Thời gian gặt:</TextR>
              <DateTimePicker
                migrateTextField
                containerStyle={{ marginVertical: 20 }}
                label={"Date"}
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
                // value={new Date('September 19, 2022')}
                value={riceSeason.timeEnd}
                onChange={(time) => {
                  setRiceSeason({ ...riceSeason, timeEnd: time });
                }}
              />
            </View>

            {/* Total Rice */}
            {riceSeason.currentState === "Đã thu hoạch" && (
              <View>
                <TextR style={styles.label}>Sản lượng (kg):</TextR>
                <TextField
                  text70
                  grey10
                  placeholder="0"
                  value={riceSeason.totalRice}
                  onChangeText={onChangeTotalRice}
                  style={styles.textField}
                />
                <Text red style={styles.errorMessage}>
                  {error.totalRice}
                </Text>
              </View>
            )}

            {/* Description */}
            <View marginT-20>
              <TextR style={styles.label}>Mô tả:</TextR>
              <TextField
                text70
                grey10
                multiline
                numberOfLines={3}
                value={riceSeason.description}
                onChangeText={(text) => {
                  setRiceSeason({
                    ...riceSeason,
                    description: text,
                  });
                }}
                style={styles.textField}
              />
            </View>

            <View flex marginT-30 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton
                label="Lưu"
                onPress={handleModify}
                disabled={isDisableBtn}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ModifyRiceSeason;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
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
