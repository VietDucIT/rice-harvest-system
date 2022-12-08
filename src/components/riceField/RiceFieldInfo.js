import React, { useState, useEffect, useCallback } from "react";
import {
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  Text as TextR,
} from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import Map from "../map/Map";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceField from "../../services/riceField/getRiceField";

LogBox.ignoreLogs(["Input error!"]);

StyleInit();

const RiceFieldInfo = ({ navigation, route }) => {
  const { idRiceField } = route.params;
  const [fieldData, setFieldData] = useState({});

  // call API to get Rice Field data
  const getRiceFieldData = useCallback(async () => {
    try {
      const data = await getRiceField(idRiceField);
      // console.log("RiceFieldInfo - Rice Field data: ", data);
      setFieldData(data);
    } catch (err) {
      console.log("RiceFieldInfo - RError while getting Rice Field data.");
    }
  }, [idRiceField]);

  useEffect(() => {
    getRiceFieldData();
  }, [getRiceFieldData]);

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionButton navigation={navigation} />

        <View>
          <View center marginT-30>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Thông tin ruộng lúa
              </Text>
            </View>
          </View>

          <View flex marginH-25 marginV-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Mẫu ruộng: </TextR>
              <Text text70 style={styles.itemContent}>
                {fieldData.name}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Địa chỉ: </TextR>
              <Text text70 style={styles.itemContent}>
                {fieldData.village}, {fieldData.commune}, {fieldData.town},{" "}
                {fieldData.province}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tọa độ điểm: </TextR>
              <Text text70 style={styles.itemContent}>
                ({fieldData.x1}; {fieldData.y1}), ({fieldData.x2};{" "}
                {fieldData.y2}
                ), ({fieldData.x3}; {fieldData.y3}), ({fieldData.x4};{" "}
                {fieldData.y4})
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Mô tả: </TextR>
              <Text text70 style={styles.itemContent}>
                {fieldData.description}
              </Text>
            </View>

            {fieldData && (
              <View flex style={styles.mapContainer}>
                <Map fieldData={fieldData} />
              </View>
            )}
          </View>

          <View flex marginT-20 center>
            <CustomButton
              label="Sửa"
              onPress={() =>
                navigation.navigate(nameList.modifyRiceField, {
                  idRiceField: fieldData._id,
                })
              }
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceFieldInfo;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 10,
  },
  itemLabel: {
    fontSize: 17,
    fontWeight: "500",
  },
  itemContent: {
    width: "90%",
    paddingRight: 10,
  },
  mapContainer: {
    width: "100%",
    height: 400,
    marginTop: 20,
    borderWidth: 2,
    borderColor: color.greenColor,
  },
});
