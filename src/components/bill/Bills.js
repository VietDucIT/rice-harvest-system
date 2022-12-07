import React, { useState, useEffect, useCallback } from "react";
import { Image, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getBillList from "../../services/bill/getBillList";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const Bills = ({ navigation, route }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("Bills - User ID from SecureStore: ", userId),
    [userId]
  );

  const [billArray, setBillArray] = useState([]);

  // call API to get Bill list
  const getBillArray = useCallback(async () => {
    try {
      const data = await getBillList(userId);
      // console.log("Bills - Bill list: ", data);
      setBillArray(data);
    } catch (err) {
      console.log("Bills - Error while getting Bill list.");
    }
  }, [userId]);

  useEffect(() => {
    getBillArray();
  }, [getBillArray]);

  // recall API to get list after adding
  useEffect(() => {
    if (route.params?.hasNewBill) {
      getBillArray();
    }
  }, [route.params?.hasNewBill]);

  return (
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
              Quản lý phiếu thu mua
            </Text>
          </View>
        </View>

        <View marginT-20>
          {billArray.map((item, index) => (
            <View
              style={styles.billItem}
              padding-5
              marginV-8
              marginH-16
              key={index}
            >
              <TextR style={styles.billName}>{item.name}</TextR>
              <View style={styles.subContainer}>
                <View style={styles.address}>
                  <Text text80>
                    {item.village +
                      ", " +
                      item.commune +
                      ", " +
                      item.town +
                      ", " +
                      item.province}
                  </Text>
                </View>
                <View flex right style={styles.controllContainer}>
                  <Text
                    green
                    text70
                    onPress={() =>
                      navigation.navigate(nameList.billInfo, {
                        idBill: item._id,
                      })
                    }
                  >
                    Xem
                  </Text>
                  <Text
                    text70
                    onPress={() => handleDelete(item)}
                    style={styles.deleteBtn}
                  >
                    Xóa
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View marginT-30 center>
          <CustomButton
            label="Thêm"
            onPress={() => navigation.navigate(nameList.addBill)}
          />
        </View>
      </View>
    </View>
  );
};
export default Bills;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  billItem: {
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  billName: {
    fontSize: 16,
    fontWeight: "600",
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  address: {
    paddingRight: 10,
    width: "80%",
  },
  deleteBtn: {
    color: color.redColor,
    opacity: 0.6,
  },
});
