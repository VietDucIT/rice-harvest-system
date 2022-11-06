import React, { useState, useEffect, useCallback } from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceFieldList from "../../services/riceField/getRiceFieldList";
import deleteRiceField from "../../services/riceField/deleteRiceField";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const RiceFields = ({ navigation }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(() => console.log("From Ricefields, User ID: ", userId), [userId]);

  const [fieldName, setFieldName] = useState("");

  // {
  //   id: 1,
  //   address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
  //   coord: ["(1,1)", "(2,2)", "(3,3)", "(4,4)"],
  //   description: "Ruộng sau nhà bác 4",
  // },

  const [riceFieldArray, setRiceFieldArray] = useState([]);

  // get Rice Field list
  const getRiceFieldArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceFieldList(userId);
      // console.log("Rice Fields data: ", data);
      setRiceFieldArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Field list.");
    }
  }, [userId]);

  useEffect(() => {
    getRiceFieldArray();
    // });
  }, [getRiceFieldArray]);

  // delete a Rice Field
  const handleDelete = (field) => {
    Alert.alert("Xác nhận", `Bạn có chắc chắn muốn xóa ${field.name}?`, [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          try {
            // setLoading(true);
            let dataAPI = await deleteRiceField(field._id);
            // console.log("Data API: ", dataAPI);

            // SET STATUS FOR THIS ???
            Alert.alert("Thông báo", `Đã xóa ${field.name}.`, [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);
            navigation.goBack();
            // setLoading(false);
          } catch (err) {
            console.log("Error while deleting Rice Field.");
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
          <View center marginT-30>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Quản lý ruộng lúa
              </Text>
            </View>
          </View>

          {/* ??? */}
          <SearchBar
            placeholder="Nhập tên ruộng lúa"
            handleSearch={(name) => {
              setFieldName(name);
              // console.log("Tested");
            }}
          />

          <View marginT-20>
            {riceFieldArray &&
              riceFieldArray.map((item) => (
                <View
                  flex
                  style={styles.fieldItem}
                  padding-5
                  marginV-8
                  marginH-16
                  key={item._id}
                >
                  <Text text70>
                    {item.name?.length <= 15
                      ? `${item.name}`
                      : `${item.name?.substring(0, 15)}...`}
                  </Text>
                  <View flex right style={styles.controllContainer}>
                    <Text
                      green
                      text70
                      onPress={() =>
                        navigation.navigate(nameList.riceFieldInfo, {
                          idRiceField: item._id,
                        })
                      }
                    >
                      Xem
                    </Text>
                    <Text
                      text70
                      onPress={() => handleDelete(item)}
                      style={styles.deleteBtn}
                    >
                      Xóa
                    </Text>
                  </View>
                </View>
              ))}
          </View>

          <View marginT-30 center>
            <CustomButton
              label="Thêm"
              onPress={() => navigation.navigate(nameList.addRiceField)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceFields;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  fieldItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  deleteBtn: {
    color: color.redColor,
    opacity: 0.6,
  },
});
