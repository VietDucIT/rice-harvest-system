import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceSeasonList from "../../services/riceSeason/getRiceSeasonList";
import deleteRiceSeason from "../../services/riceSeason/deleteRiceSeason";

StyleInit();

const RiceSeasons = ({ navigation }) => {
  // TÌM KIẾM VỤ MÙA THEO TÊN
  const [seasonName, setSeasonName] = useState("");
  let hasResult = true;

  // LỌC

  // const initArray = [
  //   {
  //     id: 1,
  //     name: "Thu Đông 2022",
  //     riceField: "Mẫu ruộng số 1",
  //     rice: "OM 18",
  //     timeStart: "19/9/2022",
  //     timeEnd: "19/12/2022",
  //     totalRice: 900,
  //   },
  //   {
  //     id: 2,
  //     name: "Đông Xuân 2023",
  //     riceField: "Mẫu ruộng số 1",
  //     rice: "OM 5451",
  //     timeStart: "19/9/2022",
  //     timeEnd: "19/12/2022",
  //     totalRice: 900,
  //   },
  //   {
  //     id: 3,
  //     name: "Đông Xuân 2023",
  //     riceField: "Mẫu ruộng số 2",
  //     rice: "OM 18",
  //     timeStart: "19/9/2022",
  //     timeEnd: "19/12/2022",
  //     totalRice: 900,
  //   },
  //   {
  //     id: 4,
  //     name: "Hè Thu 2023",
  //     riceField: "Mẫu ruộng số 1",
  //     rice: "OM 18",
  //     timeStart: "19/9/2022",
  //     timeEnd: "19/12/2022",
  //     totalRice: 900,
  //   },
  //   {
  //     id: 5,
  //     name: "Hè Thu 2023",
  //     riceField: "Mẫu ruộng số 2",
  //     rice: "ST 25",
  //     timeStart: "19/9/2022",
  //     timeEnd: "19/12/2022",
  //     totalRice: 900,
  //   },
  // ];

  const [riceSeasonArray, setRiceSeasonArray] = useState([]);

  // call API
  const getRiceSeasonArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceSeasonList();
      // console.log("Rice Season list: ", data);
      setRiceSeasonArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Season list.");
    }
  }, []);

  useEffect(() => {
    getRiceSeasonArray();
  }, [getRiceSeasonArray]);

  // delete a Rice Season
  const handleDelete = async (id) => {
    try {
      // setLoading(true);
      let dataAPI = await deleteRiceSeason(id);
      // console.log("Data API: ", dataAPI);
      Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa vụ mùa này?", [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: () => {
            // set status for this suggest
            Alert.alert("Thông báo", "Đã xóa vụ mùa này.", [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);
            navigation.navigate(nameList.riceSeasons);
          },
        },
      ]);
      // setLoading(false);
    } catch (err) {
      console.log("Error while deleting Rice Season.");
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
                Quản lý vụ mùa
              </Text>
            </View>
          </View>

          <SearchBar
            placeholder="Nhập tên vụ mùa"
            handleSearch={(name) => setSeasonName(name)}
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
                    key={item.id}
                  >
                    <TextR style={styles.riceSeasonName}>
                      {item.seasonName} {item.seasonYear}
                    </TextR>
                    <View flex style={styles.subContainer}>
                      <Text text80>
                        {item.riceField.length <= 40
                          ? `${item.riceField}`
                          : `${item.riceField.substring(0, 39)}...`}
                      </Text>
                      <View flex right style={styles.controllContainer}>
                        <Text
                          green
                          text70
                          onPress={() =>
                            navigation.navigate(nameList.riceSeasonInfo, {
                              idRiceSeason: item.id,
                            })
                          }
                        >
                          Xem
                        </Text>
                        <Text
                          text70
                          onPress={handleDelete}
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
