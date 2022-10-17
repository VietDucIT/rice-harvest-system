import React, { useState } from "react";
import { Alert, Modal, StyleSheet } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import nameList from "../../json/nameList";

import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import deleteUser from "../../services/user/deleteUser";

StyleInit();

const UserOptionModal = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOut = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn đăng xuất?", [
      {
        text: "Đăng xuất",
        onPress: () => {
          // DO SOMETHING
          Alert.alert("Thông báo", "Bạn đã đăng xuất thành công.", [
            {
              text: "Đóng",
              style: "cancel",
            },
          ]);
          navigation.navigate(nameList.firstScreen);
        },
      },
      {
        text: "Đóng",
        style: "cancel",
      },
    ]);
  };

  // WHERE IS ID TO DELETE
  const handleDeleteAccount = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa tài khoản này?", [
      {
        text: "Chắc chắn",
        onPress: async () => {
          try {
            // setLoading(true);
            let dataAPI = await deleteUser(id);
            // console.log("Data API: ", dataAPI);
            Alert.alert("Thông báo", "Bạn đã xóa tài khoản thành công.", [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);
            navigation.navigate(nameList.signUp);
            // setLoading(false);
          } catch (err) {
            console.log("Error while deleting User.");
          }
        },
      },
      {
        text: "Quay lại",
        style: "cancel",
      },
    ]);
  };

  return (
    <View>
      <View right marginR-10 marginT-10>
        <Button link onPress={() => setModalVisible(true)}>
          {/* or "user" */}
          <FontAwesome5 name="users-cog" size={25} color={color.greenColor} />
        </Button>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Close modal
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView} flex>
          <View style={styles.modalView}>
            <Text text60 green top center>
              Tùy chọn
            </Text>
            <View center>
              {/* WHERE IS ID USER TO NAVIGATE TO USER INFO */}
              <Button
                link
                style={styles.modalText}
                onPress={() =>
                  navigation.navigate(nameList.userInfo, { idUser: "123" })
                }
                marginV-5
              >
                <Text text65>Thông tin cá nhân</Text>
              </Button>

              <Button
                link
                style={styles.modalText}
                onPress={handleSignOut}
                marginV-5
              >
                <Text text65>Đăng xuất</Text>
              </Button>

              <Button
                link
                style={styles.modalText}
                onPress={handleDeleteAccount}
                marginV-5
              >
                <Text text65>Xóa tài khoản</Text>
              </Button>
            </View>

            <View right>
              <CustomButton
                label="Đóng"
                onPress={() => setModalVisible(!modalVisible)}
                style={{ width: 100 }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
