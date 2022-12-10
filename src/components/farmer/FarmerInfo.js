import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
  ToastAndroid,
} from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getFarmer from "../../services/user/getUser";
import getRiceSeasonList from "../../services/riceSeason/getRiceSeasonList";
import getUserIdStored from "../../services/user/getUserIdStored";
import addContact from "../../services/contact/addContact";
import checkIfContacted from "../../services/contact/checkIfContacted";

StyleInit();

const FarmerInfo = ({ navigation, route }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("FarmerInfo - User ID from SecureStore: ", userId),
    [userId]
  );

  const { idFarmer } = route.params;

  const [farmerData, setFarmerData] = useState({});
  const [isContacted, setIsContacted] = useState(false);
  const [riceSeasonArray, setRiceSeasonArray] = useState([]);

  // get Farmer data
  const getFarmerData = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getFarmer(idFarmer);
      // console.log("FarmerInfo - Farmer data: ", data);
      setFarmerData(data);
      // setLoading(false);
    } catch (err) {
      console.log("FarmerInfo - Error while getting Farmer data.");
    }
  }, [idFarmer]);

  useEffect(() => {
    getFarmerData();
  }, [getFarmerData]);

  // get Rice Season list of Farmer
  const getRiceSeasonArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceSeasonList(idFarmer);
      // console.log("FarmerInfo - Rice Season list: ", data);
      setRiceSeasonArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("FarmerInfo - Error while getting Rice Season list.");
    }
  }, [idFarmer]);

  useEffect(() => {
    getRiceSeasonArray();
  }, [getRiceSeasonArray]);

  const checkContact = useCallback(async () => {
    try {
      const data = await checkIfContacted(userId, idFarmer);
      // console.log("FarmerInfo - Is contacted: ", data);
      setIsContacted(data); // true / false
    } catch (err) {
      console.log("FarmerInfo - Error while checking if User is contacted.");
    }
  }, [userId, idFarmer]);

  useEffect(() => {
    checkContact();
  }, [checkContact]);

  const handleSaveContact = async (farmer) => {
    try {
      const contactData = { ...farmer, userId };
      // console.log("FarmerInfo - Contact Data: ", contactData);
      let dataAPI = await addContact(contactData);
      if (dataAPI) {
        ToastAndroid.show("Đã thêm vào danh sách liên hệ", ToastAndroid.SHORT);
      }
      // Alert.alert("Thông báo", "Đã thêm vào danh sách liên hệ.", [
      //   {
      //     text: "Đóng",
      //     style: "cancel",
      //   },
      // ]);
      navigation.navigate(nameList.findFarmers, { hasNewContact: true });
    } catch (err) {
      console.log("FarmerInfo - Error while adding Contact.", err);
    }
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionButton navigation={navigation} />

        <View>
          <View center marginT-30>
            <Image
              style={styles.avatar}
              source={
                farmerData.gender === 0
                  ? require("../../assets/images/woman-green.png")
                  : require("../../assets/images/man-green.png")
              }
            />
            <View marginV-10 center>
              <Text text50 green>
                {farmerData.name}
              </Text>
              <Text text60 green>
                ({farmerData.nickname})
              </Text>
            </View>
          </View>

          <View style={styles.contentWrapper}>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giới tính: </TextR>
              <Text text70 style={styles.itemContent}>
                {farmerData.gender === 0 ? "Nữ" : "Nam"}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Năm sinh: </TextR>
              <Text text70 style={styles.itemContent}>
                {farmerData.birthYear}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Địa chỉ: </TextR>
              <Text text70 style={styles.itemContent}>
                {farmerData.village}, {farmerData.commune}, {farmerData.town},{" "}
                {farmerData.province}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Số điện thoại: </TextR>
              <Text text70 style={styles.itemContent}>
                {farmerData.phone}
              </Text>
            </View>
          </View>

          <View marginT-30>
            <TextR style={styles.listLabel}>Danh sách vụ mùa:</TextR>
            <View>
              {riceSeasonArray.map((item, index) => {
                return (
                  <View
                    style={styles.riceSeasonItem}
                    padding-5
                    marginV-8
                    marginH-16
                    key={index}
                  >
                    <View flex style={styles.subContainer}>
                      <Text text80 style={styles.riceFieldName}>
                        {item.seasonName} {item.seasonYear}
                      </Text>
                      <Text
                        green
                        text70
                        onPress={() =>
                          navigation.navigate(
                            nameList.riceSeasonInfoForTrader,
                            {
                              idRiceSeason: item._id,
                            }
                          )
                        }
                      >
                        Xem
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <View center marginT-40>
            {isContacted ? (
              <CustomButton
                label="Đã lưu liên hệ"
                disabled
                style={{ width: 180 }}
              />
            ) : (
              <CustomButton
                label="Lưu liên hệ"
                onPress={() => {
                  handleSaveContact(farmerData);
                }}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default FarmerInfo;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
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
    fontWeight: "500",
    fontSize: 17,
  },
  itemContent: {
    width: "90%",
    paddingRight: 10,
  },
  listLabel: {
    fontSize: 16,
    color: color.greenColor,
    // textDecorationLine: "underline",
    fontWeight: "bold",
    marginLeft: 20,
  },
  riceSeasonItem: {
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  riceFieldName: {
    fontSize: 16,
    fontWeight: "600",
  },
});
