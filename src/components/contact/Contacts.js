import React, { useState, useEffect, useCallback } from "react";
import { ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getContactList from "../../services/contact/getContactList";
// import modifyContact from "../../services/contact/modifyContact";
import deleteContact from "../../services/contact/deleteContact";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const Contacts = ({ navigation }) => {
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

  // call API
  const getContactArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getContactList(userId);
      // console.log("Contacts - Contact list: ", data);
      setContactArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Contacts - Error while getting Contact list.");
    }
  }, [userId]);

  useEffect(() => {
    getContactArray();
  }, [getContactArray]);

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
              // setLoading(true);
              let dataAPI = await deleteContact(id);
              // console.log("Contacts - Data API: ", dataAPI);
              navigation.navigate(nameList.contacts);
              // setLoading(false);
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
                Quản lý đề xuất thu mua
              </Text>
            </View>
          </View>

          <SearchBar placeholder="Nhập tên nông dân" />

          <View marginT-20>
            {contactArray.map((item, index) => (
              <View
                style={styles.riceSeasonItem}
                padding-5
                marginV-8
                marginH-16
                key={index}
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
                        navigation.navigate(nameList.contactInfo, {
                          idContact: item._id,
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
export default Contacts;

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
