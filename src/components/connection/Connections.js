import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getConnectionList from "../../services/connection/getConnectionList";
// import modifyConnection from "../../services/connection/modifyConnection";
import deleteConnection from "../../services/connection/deleteConnection";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const Connections = ({ navigation }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(() => console.log("User ID from SecureStore: ", userId), [userId]);

  const [connectionArray, setConnectionArray] = useState([]);

  // call API
  const getConnectionArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getConnectionList(userId);
      // console.log("Connection list: ", data);
      setConnectionArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Connection list.");
    }
  }, [userId]);

  useEffect(() => {
    getConnectionArray();
  }, [getConnectionArray]);

  // delete a Connection
  const handleDelete = (id) => {
    Alert.alert(
      "Hủy kết nối?",
      "Nếu hủy kết nối, bạn sẽ không còn thông tin liên lạc với người dùng này.",
      [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              // setLoading(true);
              let dataAPI = await deleteConnection(id);
              // console.log("Data API: ", dataAPI);
              navigation.navigate(nameList.connections);
              // setLoading(false);
            } catch (err) {
              console.log("Error while deleting Connection.");
            }
          },
        },
      ]
    );
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
                Quản lý đề xuất thu mua
              </Text>
            </View>
          </View>

          <SearchBar placeholder="Nhập tên nông dân" />

          <View marginT-20>
            {connectionArray.map((item) => (
              <View
                style={styles.riceSeasonItem}
                padding-5
                marginV-8
                marginH-16
                key={item._id}
              >
                <TextR style={styles.farmerName}>{item.farmerName}</TextR>
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
                        navigation.navigate(nameList.connectionInfo, {
                          idConnection: item._id,
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
            ))}
          </View>

          <View marginT-30 center>
            <CustomButton
              label="Thêm"
              onPress={() => navigation.navigate(nameList.findFarmers)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Connections;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  riceSeasonItem: {
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  farmerName: {
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
