import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import dayjs from "dayjs";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";
import Loader from "../core/Loader";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceSeason from "../../services/riceSeason/getRiceSeason";
import getSuggestToBuyListForRiceSeason from "../../services/suggestToBuy/getSuggestToBuyListForRiceSeason";

StyleInit();

const RiceSeasonInfo = ({ navigation, route }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { idRiceSeason } = route.params;
  console.log("RiceSeasonInfo - ID Rice Season: ", idRiceSeason);
  const [seasonData, setSeasonData] = useState({});
  const [suggestList, setSuggestList] = useState([]);

  // call API to get Rice Season data
  const getRiceSeasonData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getRiceSeason(idRiceSeason);
      // console.log("RiceSeasonInfo - Rice Season data: ", data);
      setSeasonData(data);
      setIsLoading(false);
    } catch (err) {
      console.log("RiceSeasonInfo - Error while getting Rice Season data.");
    }
  }, [idRiceSeason]);

  useEffect(() => {
    getRiceSeasonData();
  }, [getRiceSeasonData]);

  // call API to get Suggest To Buy list
  const getSuggestToBuyListData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getSuggestToBuyListForRiceSeason(seasonData._id);
      // console.log("RiceSeasonInfo - Suggest To Buy list: ", data);
      setSuggestList(data);
      setIsLoading(false);
    } catch (err) {
      console.log("RiceSeasonInfo - Error while getting Suggest To Buy list.");
    }
  }, [seasonData._id]);

  useEffect(() => {
    getSuggestToBuyListData();
  }, [getSuggestToBuyListData]);

  // recall API to get Suggest To Buy list after accept/reject
  useEffect(() => {
    if (route.params?.hasUpdated) {
      getSuggestToBuyListData();
    }
  }, [route.params?.hasUpdated]);

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

          <View style={styles.contentWrapper}>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Vụ mùa: </TextR>
              <Text text70 style={styles.itemContent}>
                {seasonData.seasonName} {seasonData.seasonYear}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ruộng lúa: </TextR>
              <Text text70 style={styles.itemContent}>
                {seasonData.riceFieldName}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giống lúa: </TextR>
              <Text text70 style={styles.itemContent}>
                {seasonData.riceName}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tình trạng: </TextR>
              <Text text70 style={styles.itemContent}>
                {seasonData.currentState}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày sạ: </TextR>
              <Text text70 style={styles.itemContent}>
                {dayjs(seasonData.timeStart).format("DD-MM-YYYY")}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ngày gặt (dự kiến): </TextR>
              <Text text70 style={styles.itemContent}>
                {seasonData.timeEnd
                  ? dayjs(seasonData.timeEnd).format("DD-MM-YYYY")
                  : ""}
              </Text>
            </View>

            {seasonData.currentState === "Đã thu hoạch" && (
              <View flex style={styles.itemContainer} marginT-5>
                <TextR style={styles.itemLabel}>Sản lượng mỗi công: </TextR>
                <Text text70 style={styles.itemContent}>
                  {seasonData.totalRice} kg
                </Text>
              </View>
            )}
          </View>

          <View marginT-30 center>
            <CustomButton
              label="Sửa"
              onPress={() =>
                navigation.navigate(nameList.modifyRiceSeason, {
                  idRiceSeason: seasonData._id,
                })
              }
            />
          </View>

          {seasonData.currentState !== "Đã thu hoạch" && (
            <View marginT-40>
              <Button link onPress={() => setIsShowMenu(!isShowMenu)} left>
                <Text green style={styles.link}>
                  {!isShowMenu ? "Xem đề xuất thu mua" : "Ẩn đề xuất thu mua"}
                </Text>
              </Button>
              {isShowMenu && (
                <View marginT-20>
                  {suggestList.length === 0 ? (
                    <Text text70 marginL-20>
                      Không có đề xuất thu mua...
                    </Text>
                  ) : (
                    suggestList.map((item, index) => {
                      return (
                        <View
                          style={styles.riceSeasonItem}
                          padding-5
                          marginV-8
                          marginH-16
                          key={index}
                        >
                          <TextR>
                            <TextR style={styles.traderName}>
                              {item.traderName} ({item.traderNickname}){" "}
                            </TextR>
                            <TextR
                              style={
                                item.status === "Chấp nhận"
                                  ? styles.acceptStatus
                                  : styles.rejectStatus
                              }
                            >
                              {item.status && `(${item.status})`}
                            </TextR>
                          </TextR>

                          <View style={styles.subContainer}>
                            <Text text80>
                              Giá: {item.suggestedPrice} đồng/kg
                            </Text>
                            <Text
                              green
                              text70
                              onPress={() =>
                                navigation.navigate(
                                  nameList.suggestToBuyInfoForFarmer,
                                  { idSuggestToBuy: item._id }
                                )
                              }
                            >
                              Xem
                            </Text>
                          </View>
                        </View>
                      );
                    })
                  )}
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceSeasonInfo;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  contentWrapper: {
    marginHorizontal: 20,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 10,
  },
  itemLabel: {
    fontSize: 17,
    fontWeight: "500",
  },
  itemContent: {
    width: "90%",
    paddingRight: 10,
  },
  link: {
    color: color.greenColor,
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  riceSeasonItem: {
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  traderName: {
    fontSize: 16,
    fontWeight: "600",
  },
  acceptStatus: {
    fontStyle: "italic",
    color: color.blueColor,
  },
  rejectStatus: {
    fontStyle: "italic",
    color: color.redColor,
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
