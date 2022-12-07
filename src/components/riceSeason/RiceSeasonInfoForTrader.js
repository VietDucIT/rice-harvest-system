import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";
import dayjs from "dayjs";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceSeason from "../../services/riceSeason/getRiceSeason";

StyleInit();

const RiceSeasonInfoForTrader = ({ navigation, route }) => {
  const { idRiceSeason } = route.params;
  const [seasonData, setSeasonData] = useState({});

  // call API to get Rice Season
  const getRiceSeasonData = useCallback(async () => {
    try {
      const data = await getRiceSeason(idRiceSeason);
      // console.log("RiceSeasonInfoForTrader - Rice Season data: ", data);
      setSeasonData(data);
    } catch (err) {
      console.log(
        "RiceSeasonInfoForTrader - Error while getting Rice Season data."
      );
    }
  }, [idRiceSeason]);

  useEffect(() => {
    getRiceSeasonData();
  }, [getRiceSeasonData]);

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
                Thông tin vụ mùa
              </Text>
            </View>
          </View>

          <View flex marginH-25 marginT-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Vụ mùa: </TextR>
              <Text text70>
                {seasonData.seasonName} {seasonData.seasonYear}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ruộng lúa: </TextR>
              <Text text70>{seasonData.riceFieldName}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giống lúa: </TextR>
              <Text text70 style={styles.important}>
                {seasonData.riceName}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tình trạng: </TextR>
              <Text text70>{seasonData.currentState}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày sạ: </TextR>
              <Text text70>
                {dayjs(seasonData.timeStart).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày gặt (dự kiến): </TextR>
              <Text text70 style={styles.important}>
                {dayjs(seasonData.timeEnd).format("DD-MM-YYYY")}
              </Text>
            </View>
          </View>

          <View flex marginT-30 center>
            <CustomButton
              label="Đề xuất thu mua"
              onPress={() =>
                navigation.navigate(nameList.suggestToBuy, {
                  idRiceSeason: seasonData._id,
                })
              }
              style={{ width: 200 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceSeasonInfoForTrader;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemLabel: {
    fontSize: 17,
    fontWeight: "500",
  },
  important: {
    color: color.redColor,
    fontWeight: "600",
  },
  mapContainer: {
    width: "100%",
    height: 400,
    marginTop: 20,
    borderWidth: 2,
    borderColor: color.greenColor,
  },
});
