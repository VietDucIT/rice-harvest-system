import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceFieldList from "../../services/riceField/getRiceFieldList";
import deleteRiceField from "../../services/riceField/deleteRiceField";

StyleInit();

const RiceFields = ({ navigation }) => {
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
      const data = await getRiceFieldList();
      // console.log("Rice Fields data: ", data);
      setRiceFieldArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Field list.");
    }
  }, []);

  useEffect(() => {
    getRiceFieldArray();
  }, [getRiceFieldArray]);

  // delete a Rice Field
  const handleDelete = (id) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa mẫu ruộng này?", [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          try {
            // setLoading(true);
            let dataAPI = await deleteRiceField(id);
            // console.log("Data API: ", dataAPI);

            // SET STATUS FOR THIS ???
            Alert.alert("Thông báo", "Đã xóa mẫu ruộng này.", [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);
            navigation.navigate(nameList.riceFields);
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
        <UserOptionModal />

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
            handleSearch={(name) => setFieldName(name)}
          />

          <View marginT-20>
            {riceFieldArray.map((item) => (
              <View
                flex
                style={styles.fieldItem}
                padding-5
                marginV-8
                marginH-16
                key={item.id}
              >
                <Text text70>Mẫu ruộng số {item.id}</Text>
                <View flex right style={styles.controllContainer}>
                  <Text
                    green
                    text70
                    onPress={() =>
                      navigation.navigate(nameList.riceFieldInfo, {
                        idRiceField: item.id,
                      })
                    }
                  >
                    Xem
                  </Text>
                  <Text text70 onPress={handleDelete} style={styles.deleteBtn}>
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
