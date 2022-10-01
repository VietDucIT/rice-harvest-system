import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const RiceSeasonInfo = ({ navigation }) => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const riceSeasonData = {
    id: 1,
    name: "Thu Đông 2022",
    riceField: "Mẫu ruộng số 1",
    rice: "OM 18",
    currentState: "Đã thu hoạch",
    timeStart: "19/9/2022",
    timeEnd: "19/12/2022",
    totalRice: 900,
  };

  const suggestList = [
    {
      id: 1,
      farmerName: "Nguyễn Văn A",
      riceField: "Mẫu ruộng số 1",
    },
    {
      id: 2,
      farmerName: "Nguyễn Văn A",
      riceField: "Mẫu ruộng số 2",
    },
    {
      id: 3,
      farmerName: "Nguyễn Văn A",
      riceField: "Mẫu ruộng số 3",
    },
    {
      id: 4,
      farmerName: "Cao Thanh B",
      riceField: "Mẫu ruộng số 1",
    },
    {
      id: 5,
      farmerName: "Lâm C",
      riceField: "Mẫu ruộng số 2",
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.riceSeasonItem} padding-5 marginV-8 marginH-16>
      <TextR style={styles.farmerName}>{item.farmerName}</TextR>
      <View flex style={styles.subContainer}>
        <Text text80>
          {item.riceField.length <= 40
            ? `${item.riceField}`
            : `${item.riceField.substring(0, 39)}...`}
        </Text>
        <Text
          green
          text70
          onPress={() => navigation.navigate(nameList.suggestToBuyInfo)}
        >
          Xem
        </Text>
      </View>
    </View>
  );

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

          <View style={styles.contentWrapper}>
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
              <TextR style={styles.itemLabel}>Tình trạng: </TextR>
              <Text text70>{riceSeasonData.currentState}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Thời gian sạ: </TextR>
              <Text text70>{riceSeasonData.timeStart}</Text>
            </View>

            <View flex style={styles.itemContainer} marginT-5>
              <TextR style={styles.itemLabel}>Thời gian gặt: </TextR>
              <Text text70>{riceSeasonData.timeEnd}</Text>
            </View>

            {styles.itemLabel === "Đã thu hoạch" && (
              <View flex style={styles.itemContainer} marginT-5>
                <TextR style={styles.itemLabel}>Sản lượng: </TextR>
                <Text text70>{riceSeasonData.totalRice} kg</Text>
              </View>
            )}
          </View>

          <View marginT-30 center>
            <CustomButton
              label="Sửa"
              onPress={() => navigation.navigate(nameList.modifyRiceSeason)}
            />
          </View>

          <View marginT-40>
            <Button link onPress={() => setIsShowMenu(!isShowMenu)} left>
              <Text green style={styles.link}>
                Xem đề xuất thu mua
              </Text>
            </Button>
            {isShowMenu && (
              <View marginT-20>
                {/* <FlatList
                data={suggestList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              /> */}
                {suggestList.map((item) => {
                  return (
                    <View
                      style={styles.riceSeasonItem}
                      padding-5
                      marginV-8
                      marginH-16
                      key={item.id}
                    >
                      <TextR style={styles.farmerName}>{item.farmerName}</TextR>
                      <View style={styles.subContainer}>
                        <Text text80>
                          {item.riceField.length <= 40
                            ? `${item.riceField}`
                            : `${item.riceField.substring(0, 39)}...`}
                        </Text>
                        <Text
                          green
                          text70
                          onPress={() =>
                            navigation.navigate(nameList.suggestToBuyInfo)
                          }
                        >
                          Xem
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
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
    marginHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  itemLabel: {
    fontSize: 17,
    fontWeight: "500",
  },
  link: {
    color: color.greenColor,
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
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
});
