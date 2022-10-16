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
  const [seasonName, setSeasonName] = useState("");

  const [riceSeasonArray, setRiceSeasonArray] = useState([]);

  // gọi API lấy dữ liệu
  const getRiceSeasonArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceSeasonList();
      // console.log("Rice Seasons data: ", data);
      setRiceSeasonArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Season list.");
    }
  }, []);

  useEffect(() => {
    getRiceSeasonArray();
  }, [getRiceSeasonArray]);

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

  // const renderItem = ({ item }) => (
  //   <View style={styles.riceSeasonItem} padding-5 marginV-8 marginH-16>
  //     <TextR style={styles.riceSeasonName}>{item.name}</TextR>
  //     <View flex style={styles.subContainer}>
  //       <Text text80>
  //         {item.riceField.length <= 40
  //           ? `${item.riceField}`
  //           : `${item.riceField.substring(0, 39)}...`}
  //       </Text>
  //       <Text
  //         green
  //         text70
  //         onPress={() => navigation.navigate(nameList.riceSeasonInfo)}
  //       >
  //         Xem
  //       </Text>
  //     </View>
  //   </View>
  // );

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
            {riceSeasonArray.map((item) => (
              <View
                style={styles.riceSeasonItem}
                padding-5
                marginV-8
                marginH-16
                key={item.id}
              >
                <TextR style={styles.riceSeasonName}>{item.name}</TextR>
                <View flex style={styles.subContainer}>
                  <Text text80>
                    {item.riceField.length <= 40
                      ? `${item.riceField}`
                      : `${item.riceField.substring(0, 39)}...`}
                  </Text>
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
                </View>
              </View>
            ))}
            {/* <FlatList
            data={riceSeasons}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          /> */}
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
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between",
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
});
