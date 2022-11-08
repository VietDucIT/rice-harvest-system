import React, { useState, useEffect, useCallback } from "react";
import { Alert, Image, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getBillList from "../../services/bill/getBillList";
// import deleteBill from "../../services/bill/deleteBill";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const Bills = ({ navigation }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(() => console.log("User ID from SecureStore: ", userId), [userId]);

  const [billName, setBillName] = useState("");
  const [billArray, setBillArray] = useState([]);

  // call API
  const getBillArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getBillList(userId);
      // console.log("Bill list: ", data);
      setBillArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Bill list.");
    }
  }, [userId]);

  useEffect(() => {
    getBillArray();
  }, [getBillArray]);

  // delete a Bill
  const handleDelete = (item) => {
    Alert.alert("Thông báo", `Bạn có chắc chắn muốn xóa Phiếu thu mua này?`, [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          try {
            // setLoading(true);
            // let dataAPI = await deleteBill(item._id);
            // console.log("Data API: ", dataAPI);

            Alert.alert("Thông báo", "Đã xóa phiếu thu mua.", [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);
            navigation.goBack();
            // setLoading(false);
          } catch (err) {
            console.log("Error while deleting Bill.");
          }
        },
      },
    ]);
  };

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

        {/* ??? */}
        <SearchBar
          placeholder="Nhập tên khu vực"
          handleSearch={(name) => setBillName(name)}
        />

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
                    {/* {item.address.length <= 40
                    ? `${item.address}`
                    : `${item.address.substring(0, 39)}...`} */}
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
