import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
  ToastAndroid,
} from "react-native";
import {
  DateTimePicker,
  Incubator,
  Picker,
  Text,
  View,
} from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import seasonNameArray from "../../json/seasonName";
import seasonStateArray from "../../json/seasonState";

import getRiceFieldList from "../../services/riceField/getRiceFieldList";
import getRiceList from "../../services/rice/getRiceList";
import getRiceSeason from "../../services/riceSeason/getRiceSeason";
import modifyRiceSeason from "../../services/riceSeason/modifyRiceSeason";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const { TextField } = Incubator;

const ModifyRiceSeason = ({ navigation, route }) => {
  // call API to get Rice Season data to fill the form
  const { idRiceSeason } = route.params;
  const [seasonData, setSeasonData] = useState({});
  const getRiceSeasonData = useCallback(async () => {
    try {
      const data = await getRiceSeason(idRiceSeason);
      // console.log("ModifyRiceSeason - Rice Season data: ", data);
      setSeasonData(data);
      setRiceSeason(data);
    } catch (err) {
      console.log("ModifyRiceSeason - Error while getting Rice Season data.");
    }
  }, [idRiceSeason]);
  useEffect(() => {
    getRiceSeasonData();
  }, [getRiceSeasonData]);

  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("ModifyRiceSeason - User ID from SecureStore: ", userId),
    [userId]
  );

  // call API to get Rice Field list
  const [riceFieldArray, setRiceFieldArray] = useState([]);
  const getRiceFieldArray = useCallback(async () => {
    try {
      const data = await getRiceFieldList(userId);
      // console.log("ModifyRiceSeason - Rice Field list: ", data);
      setRiceFieldArray(data);
    } catch (err) {
      console.log("ModifyRiceSeason - Error while getting Rice Field list.");
    }
  }, [userId]);
  useEffect(() => {
    getRiceFieldArray();
  }, [getRiceFieldArray]);

  // call API to get Rice list
  const [riceArray, setRiceArray] = useState([]);
  const getRiceArray = useCallback(async () => {
    try {
      const data = await getRiceList();
      // console.log("ModifyRiceSeason - Rice list: ", data);
      setRiceArray(data);
    } catch (err) {
      console.log("ModifyRiceSeason - Error while getting Rice list.");
    }
  }, []);
  useEffect(() => {
    getRiceArray();
  }, [getRiceArray]);

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  let seasonYearArray = [];
  for (let i = currentYear + 1; i >= currentYear - 10; i--) {
    seasonYearArray.push(i.toString());
  }

  const initState = {
    seasonName: "",
    seasonYear: "",
    riceFieldId: "",
    riceFieldName: "",
    riceName: "",
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
    setRiceSeason({ ...riceSeason, totalRice: text });
  };

  const reset = () => {
    setRiceSeason(seasonData);
    setError(initState);
    console.log("ModifyRiceSeason - Reset completed.");
  };

  // handle disable Submit button
  useEffect(() => {
    if (
      riceSeason.seasonName &&
      riceSeason.seasonYear &&
      riceSeason.riceFieldName &&
      riceSeason.riceName &&
      riceSeason.currentState &&
      riceSeason.timeStart
    ) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [riceSeason]);

  const handleModify = async () => {
    let err = false;
    if (!riceSeason.seasonName) {
      setError({ ...error, seasonName: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, seasonName: "" });
      err = true;
    }

    if (!riceSeason.seasonYear) {
      setError({ ...error, seasonYear: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, seasonYear: "" });
      err = true;
    }

    if (!riceSeason.riceFieldName) {
      setError({ ...error, riceFieldName: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, riceFieldName: "" });
      err = true;
    }

    if (!riceSeason.riceName) {
      setError({ ...error, riceName: "* Bắt buộc." });
      err = false;
    } else {
      setError({ ...error, riceName: "" });
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
        let dataAPI = await modifyRiceSeason(riceSeason);
        // console.log("ModifyRiceSeason - Data API: ", dataAPI);
        if (dataAPI) {
          ToastAndroid.show("Đã lưu thông tin vụ mùa", ToastAndroid.SHORT);
        }
        navigation.navigate(nameList.riceSeasonInfo, {
          idRiceSeason,
        });
      } catch (err) {
        console.log("ModifyRiceSeason - Error while modifying Rice Season.");
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
                Chỉnh sửa vụ mùa
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
                  <Text red>{error.seasonName}</Text>
                </View>

                <View marginL-20>
                  <Picker
                    migrateTextField
                    text70
                    value={riceSeason.seasonYear}
                    placeholder={"Chọn năm"}
                    onChange={(year) => {
                      setRiceSeason({
                        ...riceSeason,
                        seasonYear: year.value,
                      });
                    }}
                    style={[styles.seasonYear, styles.textField]}
                  >
                    {seasonYearArray.map((item, index) => (
                      <Picker.Item key={index} value={item} label={item} />
                    ))}
                  </Picker>
                  <Text red>{error.seasonYear}</Text>
                </View>
              </View>
            </View>

            {/* Rice Field */}
            <View marginT-20>
              <TextR style={styles.label}>Ruộng lúa:</TextR>
              <Picker
                migrateTextField
                text70
                value={riceSeason.riceFieldName}
                placeholder={"Chọn ruộng lúa"}
                onChange={(field) => {
                  setRiceSeason({
                    ...riceSeason,
                    riceFieldId: field.value,
                    riceFieldName: field.label,
                  });
                }}
                style={styles.textField}
              >
                {riceFieldArray.map((item, index) => (
                  <Picker.Item key={index} value={item._id} label={item.name} />
                ))}
              </Picker>
              <Text red>{error.riceFieldName}</Text>
            </View>

            {/* Rice */}
            <View marginT-20>
              <TextR style={styles.label}>Giống lúa:</TextR>
              <Picker
                migrateTextField
                text70
                value={riceSeason.riceName}
                placeholder={"Chọn giống lúa"}
                onChange={(rice) => {
                  setRiceSeason({ ...riceSeason, riceName: rice.value });
                }}
                style={styles.textField}
              >
                {riceArray.map((item, index) => (
                  <Picker.Item key={index} value={item} label={item} />
                ))}
              </Picker>
              <Text red>{error.riceName}</Text>
            </View>

            {/* Current State */}
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
              <Text red>{error.currentState}</Text>
            </View>

            {/* Time Start */}
            <View marginT-20>
              <TextR style={styles.label}>Ngày sạ:</TextR>
              <DateTimePicker
                migrateTextField
                containerStyle={{ marginVertical: 20 }}
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
                value={riceSeason.timeStart}
                onChange={(time) => {
                  setRiceSeason({ ...riceSeason, timeStart: time });
                }}
              />
              <Text red>{error.timeStart}</Text>
            </View>

            {/* Time End */}
            <View marginT-20>
              <TextR style={styles.label}>Ngày gặt:</TextR>
              <DateTimePicker
                migrateTextField
                containerStyle={{ marginVertical: 20 }}
                label={"Date"}
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
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
                <Text red>{error.totalRice}</Text>
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
