import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import SearchBar from "../core/SearchBar";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getContactList from "../../services/contact/getContactList";
import deleteContact from "../../services/contact/deleteContact";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const Contacts = ({ navigation, route }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("Contacts - User ID from SecureStore: ", userId),
    [userId]
  );

  const [contactArray, setContactArray] = useState([]);

  // call API to get Contact list
  const getContactArray = useCallback(async () => {
    try {
      const data = await getContactList(userId);
      // console.log("Contacts - Contact list: ", data);
      setContactArray(data);
    } catch (err) {
      console.log("Contacts - Error while getting Contact list.");
    }
  }, [userId]);

  useEffect(() => {
    getContactArray();
  }, [getContactArray]);

  // recall API to get list after adding
  useEffect(() => {
    if (route.params?.hasNewContact) {
      getContactArray();
    }
  }, [route.params?.hasNewContact]);

  // delete a Contact
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
              let dataAPI = await deleteContact(id);
              if (dataAPI) {
                ToastAndroid.show("Đã xóa người liên hệ", ToastAndroid.SHORT);
              }
              // Alert.alert("Thông báo", "Đã xóa người liên hệ.", [
              //   {
              //     text: "Đóng",
              //     style: "cancel",
              //   },
              // ]);

              getContactArray();
            } catch (err) {
              console.log("Contacts - Error while deleting Contact.");
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
                Quản lý liên hệ
              </Text>
            </View>
          </View>

          <SearchBar placeholder="Nhập tên người liên hệ..." />

          <View marginT-20>
            {contactArray.map((item, index) => (
              <View
                style={styles.contactItem}
                padding-5
                marginV-8
                marginH-16
                key={index}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(nameList.contactInfo, {
                      idContact: item._id,
                    })
                  }
                >
                  <TextR style={styles.farmerName}>{item.userName2}</TextR>
                  <Text text80>
                    {item.userNickname2.length <= 40
                      ? `${item.userNickname2}`
                      : `${item.userNickname2.substring(0, 39)}...`}
                  </Text>
                </TouchableOpacity>
                <View flex style={styles.subContainer}>
                  <View flex right style={styles.controllContainer}>
                    <Text
                      green
                      text70
                      onPress={() =>
                        navigation.navigate(nameList.contactInfo, {
                          idContact: item._id,
                        })
                      }
                    >
                      Xem
                    </Text>
                    <Text
                      text70
                      onPress={() => handleDelete(item._id)}
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
export default Contacts;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  contactItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
