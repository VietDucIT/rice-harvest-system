import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import { StyleInit } from "../../config/StyleInit";

import getUser from "../../services/user/getUser";

StyleInit();

const UserInfo = ({ navigation, route }) => {
  // const userData = {
  //   id: 1,
  //   name: "Nguyễn Văn A",
  //   nickname: "Hai A",
  //   gender: 1,
  //   birthYear: 1960,
  //   address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
  //   phone: "0123 456 789",
  //   role: 0,
  // };

  const { idUser } = route.params;
  const [userData, setUserData] = useState({});

  // call API to get User data
  const getUserData = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getUser(idUser);
      // console.log("User data: ", data);
      setUserData(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting User data.");
    }
  }, [idUser]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionButton navigation={navigation} />

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

          <View flex marginH-25 marginV-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Họ tên: </TextR>
              <Text green>{userData.name}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tên thường dùng: </TextR>
              <Text green>{userData.nickname}</Text>
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
              <Text>
                {userData.village +
                  ", " +
                  userData.commune +
                  ", " +
                  userData.town +
                  ", " +
                  userData.province}
              </Text>
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
              onPress={() =>
                navigation.navigate(nameList.modifyUserInfo, {
                  idUser: userData._id,
                })
              }
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
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemLabel: {
    fontWeight: "500",
  },
});
