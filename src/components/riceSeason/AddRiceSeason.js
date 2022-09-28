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
  Picker,
  Text,
  TextField,
  View,
} from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import { StyleInit } from "../../config/StyleInit";

import getDayTime from "../../services/getDayTime";

import nameList from "../../json/nameList";

StyleInit();

const AddRiceSeason = ({ navigation }) => {
  const seasonNameArray = ["Đông Xuân", "Hè Thu", "Thu Đông"];
  const seasonYearArray = ["2020", "2021", "2022", "2023"];
  const riceFieldArray = [
    "Mẫu ruộng số 1",
    "Mẫu ruộng số 2",
    "Mẫu ruộng số 3",
    "Mẫu ruộng số 4",
  ];
  const riceArray = [
    "OM 18",
    "OM 5451",
    "ST 24",
    "ST 25",
    "IR 504",
    "Nếp Long An",
  ];

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  const { getDateString } = getDayTime();
  const currentDate = getDateString(currentTime);

  const [seasonName, setSeasonName] = useState("");
  const [seasonYear, setSeasonYear] = useState(""); //useState(currentYear);
  const [riceField, setRiceField] = useState("");
  const [rice, setRice] = useState("");
  const [timeStart, setTimeStart] = useState();
  const [timeEnd, setTimeEnd] = useState();
  const [totalRice, setTotalRice] = useState();
  const [description, setDescription] = useState("");

  const reset = () => {
    setSeasonName("");
    setSeasonYear("");
    setRiceField("");
    setRice("");
    setTimeStart();
    setTimeEnd();
    setTotalRice();
    setDescription("");
    console.log("Reset completed.");
  };

  const handleAdd = () => {
    Alert.alert("Thông báo", "Thêm vụ mùa thành công.", [
      {
        text: "Đóng",
        style: "cancel",
      },
    ]);
    navigation.navigate(nameList.riceSeasons);
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
            {/* Season Name */}
            <View>
              <TextR style={styles.label}>Vụ mùa:</TextR>
              <View flex style={styles.seasonNameContainer}>
                <Picker
                  value={seasonName}
                  placeholder={"Chọn vụ mùa"}
                  onChange={(name) => {
                    setSeasonName(name.value);
                  }}
                  style={styles.seasonName}
                >
                  {seasonNameArray.map((item, index) => (
                    <Picker.Item key={index} value={item} label={item} />
                  ))}
                </Picker>

                <Picker
                  value={seasonYear}
                  placeholder={"Chọn năm"}
                  onChange={(year) => {
                    setSeasonYear(year.value);
                  }}
                  marginL-20
                  style={styles.seasonYear}
                >
                  {seasonYearArray.map((item, index) => (
                    <Picker.Item key={index} value={item} label={item} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Rice Field */}
            <View>
              <TextR style={styles.label}>Ruộng lúa:</TextR>
              <Picker
                value={riceField}
                placeholder={"Chọn ruộng lúa"}
                onChange={(field) => {
                  setRiceField(field.value);
                }}
              >
                {riceFieldArray.map((item, index) => (
                  <Picker.Item key={index} value={item} label={item} />
                ))}
              </Picker>
            </View>

            {/* Rice */}
            <View>
              <TextR style={styles.label}>Giống lúa:</TextR>
              <Picker
                value={rice}
                placeholder={"Chọn giống lúa"}
                onChange={(rice) => {
                  setRice(rice.value);
                }}
              >
                {riceArray.map((item, index) => (
                  <Picker.Item key={index} value={item} label={item} />
                ))}
              </Picker>
            </View>

            {/* Time Start */}
            <View>
              <TextR style={styles.label}>Thời gian sạ:</TextR>
              <DateTimePicker
                migrateTextField
                containerStyle={{ marginVertical: 20 }}
                label={"Date"}
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
                // value={new Date('September 19, 2022')}
                value={timeStart}
                onChange={(time) => {
                  setTimeStart(time);
                }}
              />
            </View>

            {/* Time End */}
            <View>
              <TextR style={styles.label}>Thời gian gặt:</TextR>
              <DateTimePicker
                migrateTextField
                containerStyle={{ marginVertical: 20 }}
                label={"Date"}
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
                // value={new Date('September 19, 2022')}
                value={timeEnd}
                onChange={(time) => {
                  setTimeEnd(time);
                }}
              />
            </View>

            {/* Total Rice */}
            <View>
              <TextR style={styles.label}>Sản lượng (kg):</TextR>
              <TextField
                text70
                grey10
                validate={"required"}
                onChangeText={setTotalRice}
                value={totalRice}
                placeholder="0"
              />
            </View>

            {/* Description */}
            <View>
              <TextR style={styles.label}>Mô tả:</TextR>
              <TextField
                text70
                grey10
                multiline
                numberOfLines={3}
                value={description}
                onChangeText={setDescription}
              />
            </View>

            <View flex marginT-30 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton label="Tạo" onPress={handleAdd} />
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
