import React, { useState, useEffect, useCallback } from "react";
import { Alert, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getNotificationList from "../../services/notification/getNotificationList";
// import modifyNotification from "../../services/notification/modifyNotification";
import deleteNotification from "../../services/notification/deleteNotification";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const Notifications = ({ navigation, route }) => {
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

  // call API to get Notification list
  const getNotificationArray = useCallback(async () => {
    try {
      const data = await getNotificationList(userId);
      // console.log("Notifications - Notification list: ", data);
      await data.sort((a, b) => a.createAt - b.createAt);
      setNotificationArray(data);
    } catch (err) {
      console.log("Notifications - Error while getting Notification list.");
    }
  }, [userId]);

  useEffect(() => {
    getNotificationArray();
  }, [getNotificationArray]);

  // recall API to get list after adding
  useEffect(() => {
    if (route.params?.hasNewNotification) {
      getNotificationArray();
    }
  }, [route.params?.hasNewNotification]);

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
            let dataAPI = await deleteNotification(id);
            getNotificationArray();
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
            {notificationArray.map((item, index) => (
              <View
                style={styles.notificationItem}
                padding-5
                marginV-8
                marginH-16
                key={index}
              >
                <TextR style={styles.title}>{item.title}</TextR>
                <View flex style={styles.subContainer}>
                  <Text text80>
                    {item.description.length <= 40
                      ? `${item.description}`
                      : `${item.description.substring(0, 39)}...`}
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
  notificationItem: {
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  title: {
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
