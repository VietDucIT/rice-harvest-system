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
import seasonNameArray from "../../json/seasonName";
import seasonStateArray from "../../json/seasonState";
import getRiceFieldList from "../../services/riceField/getRiceFieldList";
import getRiceList from "../../services/rice/getRiceList";
import addRiceSeason from "../../services/riceSeason/addRiceSeason";

StyleInit();

const { TextField } = Incubator;

const AddRiceSeason = ({ navigation }) => {
  const [riceSeason, setRiceSeason] = useState({});
  const seasonYearArray = ["2020", "2021", "2022", "2023", "2024", "2025"];

  // gọi API lấy danh sách ruộng lúa
  const [riceFieldArray, setRiceFieldArray] = useState([]);

  const getRiceFieldArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceFieldList();
      // console.log("Rice Fields data: ", data);
      setRiceFieldArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Field list.");
    }
  }, []);

  useEffect(() => {
    getRiceFieldArray();
  }, [getRiceFieldArray]);
  // const riceFieldArray = [
  //   "Mẫu ruộng số 1",
  //   "Mẫu ruộng số 2",
  //   "Mẫu ruộng số 3",
  //   "Mẫu ruộng số 4",
  // ];

  // gọi API lấy danh sách giống lúa
  const [riceArray, setRiceArray] = useState([]);

  const getRiceArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceList();
      // console.log("Rices data: ", data);
      setRiceArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice list.");
    }
  }, []);

  useEffect(() => {
    getRiceArray();
  }, [getRiceArray]);
  // const riceArray = [
  //   "OM 18",
  //   "OM 5451",
  //   "ST 24",
  //   "ST 25",
  //   "IR 504",
  //   "Nếp Long An",
  // ];

  // const stateArray = [
  //   "Chưa gieo xạ",
  //   "Đang phát triển",
  //   "Lúa trổ",
  //   "Lúa chín",
  //   "Đã thu hoạch",
  // ];

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const { getDateString } = getDayTime();
  const currentDate = getDateString(currentTime);

  const [seasonName, setSeasonName] = useState("");
  const [seasonYear, setSeasonYear] = useState(""); //useState(currentYear);
  // const [riceField, setRiceField] = useState("");
  // const [rice, setRice] = useState("");
  // const [currentState, setCurrentState] = useState("");
  // const [timeStart, setTimeStart] = useState();
  // const [timeEnd, setTimeEnd] = useState();
  // const [totalRice, setTotalRice] = useState();
  // const [description, setDescription] = useState("");

  const [isDisableBtn, setIsDisableBtn] = useState(true);
  const [errorSeasonName, setErrorSeasonName] = useState("");
  const [errorSeasonYear, setErrorSeasonYear] = useState("");
  const [errorRiceField, setErrorRiceField] = useState("");
  const [errorRice, setErrorRice] = useState("");
  const [errorCurrentState, setErrorCurrentState] = useState("");
  const [errorTimeStart, setErrorTimeStart] = useState("");
  const [errorTotalRice, setErrorTotalRice] = useState("");

  useEffect(() => {
    setRiceSeason({
      ...riceSeason,
      fullName: seasonName + " " + seasonYear,
    });
  }, [seasonName, seasonYear]);

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
    setRiceSeason({});
    setSeasonName("");
    setSeasonYear("");
    // setRiceField("");
    // setRice("");
    // setCurrentState("");
    // setTimeStart();
    // setTimeEnd();
    // setTotalRice();
    setErrorSeasonName("");
    setErrorSeasonYear("");
    setErrorRiceField("");
    setErrorRice("");
    setErrorCurrentState("");
    setErrorTimeStart("");
    setErrorTotalRice("");
    setDescription("");
    console.log("Reset completed.");
  };

  const handleAdd = () => {
    let err = false;
    if (!seasonName) {
      setErrorSeasonName("* Bắt buộc.");
      err = false;
    } else {
      setErrorSeasonName("");
      err = true;
    }

    if (!seasonYear) {
      setErrorSeasonYear("* Bắt buộc.");
      err = false;
    } else {
      setErrorSeasonYear("");
      err = true;
    }

    if (!riceField) {
      setErrorRiceField("* Bắt buộc.");
      err = false;
    } else {
      setErrorRiceField("");
      err = true;
    }

    if (!rice) {
      setErrorRice("* Bắt buộc.");
      err = false;
    } else {
      setErrorRice("");
      err = true;
    }

    if (!currentState) {
      setErrorCurrentState("* Bắt buộc.");
      err = false;
    } else {
      setErrorCurrentState("");
      err = true;
    }

    if (!timeStart) {
      setErrorTimeStart("* Bắt buộc.");
      err = false;
    } else {
      setErrorTimeStart("");
      err = true;
    }

    if (err) {
      Alert.alert("Thông báo", "Thêm vụ mùa thành công.", [
        {
          text: "Đóng",
          style: "cancel",
        },
      ]);
      navigation.navigate(nameList.riceSeasons);
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
                Thêm vụ mùa
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
            {/* Season Full Name */}
            <View>
              <TextR style={styles.label}>Vụ mùa:</TextR>
              <View flex style={styles.seasonNameContainer}>
                <View>
                  <Picker
                    migrateTextField
                    text70
                    value={seasonName}
                    placeholder={"Chọn vụ mùa"}
                    onChange={(name) => {
                      setSeasonName(name.value);
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
                    {errorSeasonName}
                  </Text>
                </View>

                <View marginL-20>
                  <Picker
                    migrateTextField
                    text70
                    value={seasonYear}
                    placeholder={"Chọn năm"}
                    onChange={(year) => {
                      setSeasonYear(year.value);
                    }}
                    style={[styles.seasonYear, styles.textField]}
                  >
                    {seasonYearArray.map((item, index) => (
                      <Picker.Item key={index} value={item} label={item} />
                    ))}
                  </Picker>
                  <Text red style={styles.errorMessage}>
                    {errorSeasonYear}
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
                    value={item.id}
                    label={"Mẫu ruộng số " + item.id}
                  />
                ))}
              </Picker>
              <Text red style={styles.errorMessage}>
                {errorRiceField}
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
                {errorRice}
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
                {errorCurrentState}
              </Text>
            </View>

            {/* Time Start */}
            <View marginT-20>
              <TextR style={styles.label}>Thời gian sạ:</TextR>
              <DateTimePicker
                migrateTextField
                containerStyle={{ marginVertical: 20 }}
                label={"Date"}
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
                // value={new Date('September 19, 2022')}
                value={riceSeason.timeStart}
                onChange={(time) => {
                  setRiceSeason({ ...riceSeason, timeStart: time });
                }}
              />
              <Text red style={styles.errorMessage}>
                {errorTimeStart}
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
                  {errorTotalRice}
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
              <CustomButton label="Thêm" onPress={handleAdd} />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default AddRiceSeason;

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
