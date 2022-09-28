import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import { StyleInit } from "../../config/StyleInit";

import nameList from "../../json/nameList";

StyleInit();

const UserInfo = ({ navigation }) => {
  const userData = {
    id: 1,
    name: "Nguyễn Văn A",
    gender: 1,
    birthYear: 1960,
    address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
    phone: "0123 456 789",
    role: 0,
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionModal />

        <View>
          <View center>
            <Image
              style={styles.avatar}
              source={
                userData.gender === 0
                  ? require("../../assets/images/woman-green.png")
                  : require("../../assets/images/man-green.png")
              }
            />
            <View marginV-10>
              <Text text50 green>
                Thông tin cá nhân
              </Text>
            </View>
          </View>

          <View flex style={styles.contentWrapper} marginH-25 marginV-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Họ tên: </TextR>
              <Text green>{userData.name}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giới tính: </TextR>
              <Text>{userData.gender === 0 ? "Nữ" : "Nam"}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Năm sinh: </TextR>
              <Text>{userData.birthYear}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Địa chỉ: </TextR>
              <Text>{userData.address}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Số điện thoại: </TextR>
              <Text>{userData.phone}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Vai trò: </TextR>
              <Text>{userData.role === 0 ? "Nông dân" : "Thương lái"}</Text>
            </View>
          </View>

          <View flex marginT-20 center>
            <CustomButton
              label="Sửa"
              onPress={() => navigation.navigate(nameList.modifyUserInfo)}
              style={{ width: 100 }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default UserInfo;

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
  },
  contentWrapper: {
    // flexDirection: "column",
    // flexWrap: "wrap",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemLabel: {
    fontWeight: "500",
  },
});
