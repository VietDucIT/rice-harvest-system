import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Picker, Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import seasonNameArray from "../../json/seasonName";

import findRiceSeasonByName from "../../services/riceSeason/findRiceSeasonByName";
import getRiceSeasonList from "../../services/riceSeason/getRiceSeasonList";
import deleteRiceSeason from "../../services/riceSeason/deleteRiceSeason";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const RiceSeasons = ({ navigation, route }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("RiceSeasons - User ID from SecureStore: ", userId),
    [userId]
  );

  // FIND RICE SEASON BY NAME
  let seasonName = { name: "", year: "" };

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();
  let seasonYearArray = ["Tất cả"];
  for (let i = currentYear + 1; i >= currentYear - 10; i--) {
    seasonYearArray.push(i.toString());
  }

  const [riceSeasonArray, setRiceSeasonArray] = useState([]);

  // get Rice Season list
  const getRiceSeasonArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceSeasonList(userId);
      // console.log("RiceSeasons - Rice Season list: ", data);
      setRiceSeasonArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("RiceSeasons - Error while getting Rice Season list.");
    }
  }, [userId]);

  useEffect(() => {
    getRiceSeasonArray();
  }, [getRiceSeasonArray]);

  // get Rice Season list by Name
  const getRiceSeasonArrayByName = async () => {
    try {
      // setLoading(true);
      const data = await findRiceSeasonByName(
        seasonName.name,
        seasonName.year,
        userId
      );
      // console.log("RiceSeasons - Rice Seasons data: ", data);
      setRiceSeasonArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("RiceSeasons - Error while finding Rice Season by Name.");
    }
  };

  // recall API to get list after adding
  useEffect(() => {
    if (route.params?.hasNewSeason) {
      getRiceSeasonArray();
    }
  }, [route.params?.hasNewSeason]);

  // delete a Rice Season
  const handleDelete = (id) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa vụ mùa này?", [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          try {
            // setLoading(true);
            let dataAPI = await deleteRiceSeason(id);
            // console.log("RiceSeasons - Data API: ", dataAPI);

            // SET STATUS FOR THIS
            Alert.alert("Thông báo", "Đã xóa vụ mùa này.", [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);

            // recall API to get list after deleting
            getRiceSeasonArray();
            // setLoading(false);
          } catch (err) {
            console.log("RiceSeasons - Error while deleting Rice Season.");
          }
        },
      },
    ]);
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
                Quản lý vụ mùa
              </Text>
            </View>
          </View>

          {/* Search by selecting name and year */}
          <View center flex style={styles.seasonNameContainer}>
            <View>
              <Picker
                migrateTextField
                text70
                value={seasonName.name}
                placeholder={"Chọn vụ mùa"}
                onChange={(name) => (seasonName.name = name.value)}
                style={[styles.seasonName, styles.textField]}
              >
                {seasonNameArray.map((item, index) => (
                  <Picker.Item
                    key={index}
                    value={item.name}
                    label={item.name}
                  />
                ))}
                <Picker.Item value="Tất cả" label="Tất cả" />
              </Picker>
            </View>

            <View marginL-10>
              <Picker
                migrateTextField
                text70
                value={seasonName.year}
                placeholder={"Chọn năm"}
                onChange={(year) => (seasonName.year = year.value)}
                style={[styles.seasonYear, styles.textField]}
              >
                {seasonYearArray.map((item, index) => (
                  <Picker.Item key={index} value={item} label={item} />
                ))}
              </Picker>
            </View>

            <CustomButton
              marginL-10
              label="Tìm"
              onPress={() => getRiceSeasonArrayByName()}
              style={{ height: 45 }}
            />
          </View>

          <View marginT-20>
            {riceSeasonArray &&
              riceSeasonArray.map((item, index) => {
                const fullName = item.seasonName + " " + item.seasonYear;
                return (
                  <View
                    style={styles.riceSeasonItem}
                    padding-5
                    marginV-8
                    marginH-16
                    key={index}
                  >
                    <TextR style={styles.riceSeasonName}>
                      {item.seasonName} {item.seasonYear}
                    </TextR>
                    <View flex style={styles.subContainer}>
                      <Text text80>
                        {item.riceField}
                        {/* {item.riceField.length <= 40
                          ? `${item.riceField}`
                          : `${item.riceField.substring(0, 39)}...`} */}
                      </Text>
                      <View flex right style={styles.controllContainer}>
                        <Text
                          green
                          text70
                          onPress={() =>
                            navigation.navigate(nameList.riceSeasonInfo, {
                              idRiceSeason: item._id,
                            })
                          }
                        >
                          Xem
                        </Text>
                        <Text
                          text70
                          onPress={() => handleDelete(item._id)}
                          style={styles.deleteBtn}
                        >
                          Xóa
                        </Text>
                      </View>
                    </View>
                  </View>
                );
                // }
              })}

            {riceSeasonArray.length == 0 && (
              <View center margin-20>
                <Text text70>Không có vụ mùa nào có tên này.</Text>
                <Text text70>Vui lòng chọn lại hoặc thêm mới vụ mùa.</Text>
              </View>
            )}
          </View>

          <View marginT-30 center>
            <CustomButton
              label="Thêm"
              onPress={() => navigation.navigate(nameList.addRiceSeason)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceSeasons;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  seasonNameContainer: {
    flexDirection: "row",
  },
  seasonName: {
    marginTop: 15,
    width: 120,
  },
  seasonYear: {
    marginTop: 15,
    width: 100,
  },
  textField: {
    borderBottomWidth: 0.5,
    borderColor: color.lightGreyColor,
    // paddingBottom: 5,
  },
  riceSeasonItem: {
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  riceSeasonName: {
    fontSize: 16,
    fontWeight: "600",
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  deleteBtn: {
    color: color.redColor,
    opacity: 0.6,
  },
});
