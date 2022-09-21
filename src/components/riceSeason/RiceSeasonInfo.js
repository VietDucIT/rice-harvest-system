import React, { useState, useEffect } from "react";
import { ScrollView, Image, StyleSheet, Text as TextR } from "react-native";
import { View, Text } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

import Map from "../Map/Map";

StyleInit();

const RiceSeasonInfo = ({ navigation }) => {
  const riceSeasonData = {
    id: 1,
    name: "Thu Đông 2022",
    riceField: "Mẫu ruộng số 1",
    rice: "OM 18",
    timeStart: "19/9/2022",
    timeEnd: "19/12/2022",
    totalRice: 900,
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
                Thông tin vụ mùa
              </Text>
            </View>
          </View>

          <View flex style={styles.contentWrapper} marginH-25 marginT-20>
            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Vụ mùa: </TextR>
              <Text text70>{riceSeasonData.name}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Ruộng lúa: </TextR>
              <Text text70>{riceSeasonData.riceField}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Giống lúa: </TextR>
              <Text text70>{riceSeasonData.rice}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Thời gian sạ: </TextR>
              <Text text70>{riceSeasonData.timeStart}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Thời gian gặt: </TextR>
              <Text text70>{riceSeasonData.timeEnd}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Sản lượng: </TextR>
              <Text text70>{riceSeasonData.totalRice} kg</Text>
            </View>
          </View>

          <View flex marginT-20 center>
            <CustomButton
              label="Sửa"
              onPress={() => navigation.navigate("ModifyRiceSeason")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RiceSeasonInfo;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
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
    fontSize: 17,
    fontWeight: "500",
  },
});
