import React, { useState } from "react";
import { Modal, StyleSheet } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const UserOptionModal = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View right marginR-10 marginT-10>
        <Button link onPress={() => setModalVisible(true)}>
          {/* or"user" */}
          <FontAwesome5 name="users-cog" size={25} color="green" />
        </Button>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Đóng tùy chọn.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView} flex>
          <View style={styles.modalView}>
            <Text text60 green top center>
              Tùy chọn
            </Text>
            <View center>
              <Button
                link
                style={styles.modalText}
                onPress={() => console.log("Sửa thông tin")}
                marginV-5
              >
                <Text text65>Sửa thông tin</Text>
              </Button>
              <Button
                link
                style={styles.modalText}
                onPress={() => console.log("Đăng xuất")}
                marginV-5
              >
                <Text text65>Đăng xuất</Text>
              </Button>
              <Button
                link
                style={styles.modalText}
                onPress={() => console.log("Xóa tài khoản")}
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
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    height: "80%",
    padding: 35,
    justifyContent: "space-between",
    shadowColor: "green",
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
  },
});
