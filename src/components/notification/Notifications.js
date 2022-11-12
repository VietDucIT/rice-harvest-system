import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getNotificationList from "../../services/notification/getNotificationList";
import modifyNotification from "../../services/notification/modifyNotification";
import deleteNotification from "../../services/notification/deleteNotification";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const Notifications = ({ navigation }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("Notifications - User ID from SecureStore: ", userId),
    [userId]
  );

  const [notificationArray, setNotificationArray] = useState([]);

  // call API
  const getNotificationArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getNotificationList(userId);
      // console.log("Notifications - Notification list: ", data);
      setNotificationArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Notifications - Error while getting Notification list.");
    }
  }, [userId]);

  useEffect(() => {
    getNotificationArray();
  }, [getNotificationArray]);

  // delete a Notification
  const handleDelete = (id) => {
    Alert.alert("Xóa thông báo?", [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Xóa",
        onPress: async () => {
          try {
            // setLoading(true);
            let dataAPI = await deleteNotification(id);
            // console.log("Notifications - Data API: ", dataAPI);
            navigation.navigate(nameList.notifications);
            // setLoading(false);
          } catch (err) {
            console.log("Notifications - Error while deleting Notification.");
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
          <View marginT-20>
            {notificationArray.map((item) => (
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
                        navigation.navigate(nameList.notificationInfo, {
                          idNotification: item._id,
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
        </View>
      </View>
    </ScrollView>
  );
};
export default Notifications;

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