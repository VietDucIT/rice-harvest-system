import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import findRiceSeasonByName from "../../services/riceSeason/findRiceSeasonByName";
import getRiceSeasonList from "../../services/riceSeason/getRiceSeasonList";
import deleteRiceSeason from "../../services/riceSeason/deleteRiceSeason";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const RiceSeasons = ({ navigation }) => {
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
  const [seasonName, setSeasonName] = useState("");

  const [riceSeasonArray, setRiceSeasonArray] = useState([]);

  let hasResult = true;

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
  const getRiceSeasonArrayByName = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await findRiceSeasonByName(seasonName, userId);
      // console.log("RiceSeasons - Rice Seasons data: ", data);
      setRiceSeasonArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("RiceSeasons - Error while finding Rice Season by Name.");
    }
  }, [seasonName, userId]);

  useEffect(() => {
    getRiceSeasonArrayByName();
  }, [getRiceSeasonArrayByName]);

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
            navigation.navigate(nameList.riceSeasons);
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

          <SearchBar
            placeholder="Nhập tên vụ mùa"
            handleSearch={(name) => {
              setSeasonName(name);
              console.log("RiceSeasons - Rice Season name: ", name);
            }}
          />

          <View marginT-20>
            {riceSeasonArray.map((item) => {
              const fullName = item.seasonName + " " + item.seasonYear;
              const searchString = seasonName.trim();
              if (fullName.includes(searchString)) {
                hasResult = true;
                return (
                  <View
                    style={styles.riceSeasonItem}
                    padding-5
                    marginV-8
                    marginH-16
                    key={item._id}
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
              }
            })}

            {seasonName && !hasResult && (
              <View center>
                Không có vụ mùa nào có tên này. Vui lòng nhập lại.
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
