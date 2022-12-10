import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
  ToastAndroid,
} from "react-native";
import { DateTimePicker, Incubator, Text, View } from "react-native-ui-lib";
import dayjs from "dayjs";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceSeason from "../../services/riceSeason/getRiceSeason";
import addSuggestToBuy from "../../services/suggestToBuy/addSuggestToBuy";
import getUserIdStored from "../../services/user/getUserIdStored";
import getUser from "../../services/user/getUser";

StyleInit();

const { TextField } = Incubator;

const SuggestToBuy = ({ navigation, route }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("SuggestToBuy - User ID from SecureStore: ", userId),
    [userId]
  );

  const { idRiceSeason } = route.params;
  const [seasonData, setSeasonData] = useState({});

  // call API to get Rice Season data
  const getRiceSeasonData = useCallback(async () => {
    try {
      const data = await getRiceSeason(idRiceSeason);
      console.log("SuggestToBuy - Rice Season data: ", data);
      setSeasonData(data);
    } catch (err) {
      console.log("SuggestToBuy - Error while getting Rice Season data.");
    }
  }, [idRiceSeason]);

  useEffect(() => {
    getRiceSeasonData();
  }, [getRiceSeasonData]);

  // call API to get Trader info (just need Trader name, nickname)
  const [traderData, setTraderData] = useState({});
  const getTraderData = useCallback(async () => {
    try {
      const data = await getUser(userId);
      console.log("SuggestToBuy - Trader data: ", data);
      setTraderData(data);
    } catch (err) {
      console.log("SuggestToBuy - Error while getting Trader data.");
    }
  }, [userId]);
  useEffect(() => {
    getTraderData();
  }, [getTraderData]);

  // call API to get Farmer info (just need Farmer name, nickname)
  const [farmerData, setFarmerData] = useState({});
  const getFarmerData = useCallback(async () => {
    try {
      const data = await getUser(seasonData.farmerId);
      console.log("SuggestToBuy - Farmer data: ", data);
      setFarmerData(data);
    } catch (err) {
      console.log("SuggestToBuy - Error while getting Farmer data.");
    }
  }, [seasonData.farmerId]);
  useEffect(() => {
    getFarmerData();
  }, [getFarmerData]);

  const initState = {
    suggestedPrice: "",
    suggestedTimeEnd: "",
    description: "",
  };
  const [suggestToBuy, setSuggestToBuy] = useState(initState);
  const [error, setError] = useState(initState);
  const [isDisableBtn, setIsDisableBtn] = useState(true);

  const onChangePrice = (text) => {
    let message = "";
    if (text === "") {
      message = "* Vui lòng nhập giá đề xuất.";
    } else if (Number(text) <= 0) {
      message = "* Giá đề xuất phải lớn hơn 0.";
    } else {
      message = "";
      setSuggestToBuy({
        ...suggestToBuy,
        suggestedPrice: text,
      });
    }
    setError({
      ...error,
      suggestedPrice: message,
    });
  };

  const reset = () => {
    setSuggestToBuy(initState);
    setError(initState);
    console.log("SuggestToBuy - Reset completed.");
  };

  // handle disable Submit button
  useEffect(() => {
    if (suggestToBuy.suggestedPrice && suggestToBuy.suggestedTimeEnd) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }
  }, [suggestToBuy]);

  useEffect(() => {
    setSuggestToBuy({ ...suggestToBuy, traderId: userId });
  }, [userId]);

  const handleSuggest = async () => {
    try {
      let merge = {
        ...suggestToBuy,
        seasonId: seasonData._id,
        seasonState: seasonData.currentState,
        seasonFarmerId: seasonData.farmerId,
        seasonFarmerName: farmerData.name,
        seasonFarmerNickname: farmerData.nickname,
        seasonRiceFieldName: seasonData.riceFieldName,
        seasonRiceName: seasonData.riceName,
        seasonName: seasonData.seasonName,
        seasonYear: seasonData.seasonYear,
        seasonTimeEnd: seasonData.timeEnd,
        seasonTimeStart: seasonData.timeStart,
        traderName: traderData.name,
        traderNickname: traderData.nickname,
      };
      // console.log("SuggestToBuy - merge: ", merge);
      let dataAPI = await addSuggestToBuy(merge);
      // console.log("SuggestToBuy - Data API: ", dataAPI);
      if (dataAPI) {
        ToastAndroid.show("Đề xuất thu mua thành công", ToastAndroid.SHORT);
      }
      // Alert.alert("Thông báo", "Đề xuất thu mua thành công.", [
      //   {
      //     text: "Đóng",
      //     style: "cancel",
      //   },
      // ]);
      navigation.navigate(nameList.suggestToBuys, { hasNewSuggest: true });
    } catch (err) {
      console.log("SuggestToBuy - Error while adding Suggest To Buy.");
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
                Đề xuất thu mua
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
            {/* Season Full Name */}
            <View>
              <TextR style={[styles.label, styles.disableLabel]}>Vụ mùa:</TextR>
              <TextField
                text70
                grey30
                placeholder={
                  seasonData.seasonName + " " + seasonData.seasonYear
                }
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Rice Field */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Ruộng lúa:
              </TextR>
              <TextField
                text70
                grey30
                placeholder={seasonData.riceFieldName}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Rice */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Giống lúa:
              </TextR>
              <TextField
                text70
                grey30
                placeholder={seasonData.riceName}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Current State */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Tình trạng hiện tại:
              </TextR>
              <TextField
                text70
                grey30
                placeholder={seasonData.currentState}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Time Start */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Ngày sạ:
              </TextR>
              <TextField
                text70
                grey30
                placeholder={dayjs(seasonData.timeStart).format("DD-MM-YYYY")}
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Time End */}
            <View marginT-20>
              <TextR style={[styles.label, styles.disableLabel]}>
                Ngày gặt (dự kiến):
              </TextR>
              <TextField
                text70
                grey30
                placeholder={
                  seasonData.timeEnd
                    ? dayjs(seasonData.timeEnd).format("DD-MM-YYYY")
                    : ""
                }
                style={styles.textField}
                editable={false}
              />
            </View>

            {/* Suggested Price */}
            <View marginT-20>
              <TextR style={styles.label}>Giá đề xuất (đồng/kg):</TextR>
              <TextField
                text70
                grey10
                value={suggestToBuy.suggestedPrice}
                onChangeText={(text) => onChangePrice(text)}
                style={styles.textField}
                keyboardType="numeric"
              />
              <Text red>{error.suggestedPrice}</Text>
            </View>

            {/* Suggested Time End */}
            <View marginT-20>
              <TextR style={styles.label}>Ngày đề xuất thu hoạch:</TextR>
              <DateTimePicker
                migrateTextField
                dateFormat={"DD/MM/YYYY"}
                placeholder={"Chọn ngày"}
                value={suggestToBuy.suggestedTimeEnd}
                onChange={(text) =>
                  setSuggestToBuy({ ...suggestToBuy, suggestedTimeEnd: text })
                }
              />
            </View>

            {/* Description */}
            <View>
              <TextR style={styles.label}>Ghi chú:</TextR>
              <TextField
                text70
                grey10
                multiline
                numberOfLines={2}
                value={suggestToBuy.description}
                onChangeText={(text) => {
                  setSuggestToBuy({ ...suggestToBuy, description: text });
                }}
                style={styles.textField}
              />
            </View>

            <View flex marginT-30 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton
                label="Gửi"
                onPress={handleSuggest}
                disabled={isDisableBtn}
              />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SuggestToBuy;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  disableLabel: {
    color: color.greyColor,
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
