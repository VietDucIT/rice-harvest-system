import React, { useState, useEffect, useCallback } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import Map from "../map/Map";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getRiceField from "../../services/riceField/getRiceField";

StyleInit();

const RiceFieldInfo = ({ navigation, route }) => {
  const { idRiceField } = route.params;
  const [fieldData, setFieldData] = useState({});
  // let coordinate = {};

  // call API
  const getRiceFieldData = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRiceField(idRiceField);
      // console.log("RiceFieldInfo - Rice Field data: ", data);
      // coordinate = {
      //   x1: data.x1,
      //   y1: data.y1,
      //   x2: data.x2,
      //   y2: data.y2,
      //   x3: data.x3,
      //   y3: data.y3,
      //   x4: data.x4,
      //   y4: data.y4,
      // };
      setFieldData(data);
      // setLoading(false);
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
          <View center>
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
              <Text>{fieldData.name}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Địa chỉ: </TextR>
              <Text>
                {fieldData.village}, {fieldData.commune}, {fieldData.town},{" "}
                {fieldData.province}
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Tọa độ các điểm: </TextR>
              <Text>
                ({fieldData.x1};{fieldData.y1}), ({fieldData.x2};{fieldData.y2}
                ), ({fieldData.x3};{fieldData.y3}), ({fieldData.x4};
                {fieldData.y4})
              </Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Mô tả: </TextR>
              <Text>{fieldData.description}</Text>
            </View>

            <View flex style={styles.mapContainer}>
              <Map coordinate={fieldData} />
            </View>
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
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemLabel: {
    fontWeight: "500",
  },
  mapContainer: {
    width: "100%",
    height: 400,
    marginTop: 20,
    borderWidth: 2,
    borderColor: color.greenColor,
  },
});
