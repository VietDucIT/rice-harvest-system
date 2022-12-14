import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, ToastAndroid } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import * as SecureStore from "expo-secure-store";

import nameList from "../../json/nameList";

import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getUserIdStored from "../../services/user/getUserIdStored";
import deleteUser from "../../services/user/deleteUser";

StyleInit();

const UserOptionModal = ({ navigation }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("UserOptionModal - User ID from SecureStore: ", userId),
    [userId]
  );

  const handleSignOut = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Đăng xuất",
        onPress: () => {
          SecureStore.deleteItemAsync("USER_ID");
          ToastAndroid.show("Đăng xuất thành công", ToastAndroid.SHORT);
          navigation.navigate(nameList.firstScreen);
        },
      },
      {
        text: "Đóng",
        style: "cancel",
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Xác nhận",
      "Việc xóa tài khoản sẽ xóa tất cả thông tin của bạn và KHÔNG thể khôi phục. Bạn có chắc chắn muốn xóa tài khoản này?",
      [
        {
          text: "Chắc chắn",
          onPress: async () => {
            try {
              let dataAPI = await deleteUser(userId);
              // console.log("UserOptionModal - Data API: ", dataAPI);
              Alert.alert("Thông báo", "Bạn đã xóa tài khoản thành công.", [
                {
                  text: "Đóng",
                  style: "cancel",
                },
              ]);
              navigation.navigate(nameList.addUserInfo);
            } catch (err) {
              console.log("UserOptionModal - Error while deleting User.");
            }
          },
        },
        {
          text: "Quay lại",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.centeredView} flex>
      <View style={styles.modalView}>
        <Text text60 green top center>
          Tùy chọn
        </Text>
        <View center>
          {/* Main Screen */}
          <Button
            link
            style={styles.modalText}
            onPress={() => navigation.navigate(nameList.mainScreen)}
            marginV-5
          >
            <Text text65>Màn hình chính</Text>
          </Button>

          {/* User Info */}
          <Button
            link
            style={styles.modalText}
            onPress={() =>
              navigation.navigate(nameList.userInfo, { idUser: userId })
            }
            marginV-5
          >
            <Text text65>Thông tin cá nhân</Text>
          </Button>

          {/* Notifications */}
          {/* <Button
            link
            style={styles.modalText}
            onPress={() => navigation.navigate(nameList.notifications)}
            marginV-5
          >
            <Text text65>Thông báo</Text>
          </Button> */}

          {/* Sign out */}
          <Button
            link
            style={styles.modalText}
            onPress={handleSignOut}
            marginV-5
          >
            <Text text65>Đăng xuất</Text>
          </Button>

          {/* Delete Account */}
          <Button
            link
            style={styles.modalText}
            onPress={handleDeleteAccount}
            marginV-5
          >
            <Text text65 red>
              Xóa tài khoản
            </Text>
          </Button>
        </View>

        <View right>
          <CustomButton
            label="Đóng"
            onPress={() => navigation.goBack()}
            style={{ width: 100 }}
          />
        </View>
      </View>
    </View>
  );
};
export default UserOptionModal;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: color.whiteColor,
    borderRadius: 10,
    width: "90%",
    height: "80%",
    padding: 35,
    justifyContent: "space-between",
    shadowColor: color.greenColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    padding: 10,
    borderBottomColor: color.greenColor,
    borderStyle: "solid",
    borderBottomWidth: 1,
  },
});
