import React, { useState, useEffect, useCallback } from "react";
import { Image, Linking, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Table, Row, Rows } from "react-native-table-component";

import UserOptionModal from "../user/UserOptionModal";

import { StyleInit } from "../../config/StyleInit";

import getDayTime from "../../services/time/getDayTime";
import getRicePrice from "../../services/rice/getRicePrice";

StyleInit();
const { getDateString } = getDayTime();

const url = "https://congthuong.vn/chu-de/gia-lua-gao-hom-nay.topic";

const RicePrice = ({ navigation }) => {
  const [ricePriceData, setRicePriceData] = useState([]);

  const date = getDateString(new Date()); // "19/09/2022"
  const state = {
    tableHead: ["Giống lúa", "Giá (đồng/kg)"],
    // tableData: [
    //   ["OM 18", "5.700 – 5.900"],
    //   ["OM 5451", "5.500 – 5.600"],
    //   ["ST 24", "7.000 - 7.500"],
    //   ["IR 504", "5.400 – 5.500"],
    //   ["Đài thơm 8", "5.600 – 5.800"],
    //   ["Nàng hoa 9", "5.600 – 5.800"],
    //   ["Nếp An Giang", "5.900 – 6.100"],
    //   ["Nếp Long An", "6.200 – 6.500"],
    //   ["...", "..."],
    // ],
    tableData: [],
  };

  // gọi API lấy dữ liệu
  const getRicePriceData = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRicePrice();
      // console.log("Rice Price data: ", data);
      setRicePriceData(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Rice Price data.");
    }
  }, []);

  useEffect(() => {
    getRicePriceData();
  }, [getRicePriceData]);

  for (let i = 0; i < ricePriceData.length; i++) {
    const rowData = [];
    rowData.push(ricePriceData[i].rice, ricePriceData[i].price);
    tableData.push(rowData);
  }

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionModal />

        <View paddingT-30>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View center marginV-20>
              <Text text50 green>
                Cập nhật giá lúa
              </Text>
              <Text text80 marginT-10>
                Ngày {date}
              </Text>
            </View>
          </View>

          <View flex style={styles.container} padding-16 paddingT-30>
            <Table borderStyle={{ borderWidth: 1 }}>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.heading}
              />
              <Rows data={state.tableData} textStyle={styles.text} />
            </Table>
          </View>

          <View right marginR-15 marginT-10>
            <Text text80>
              (theo{" "}
              <Text green onPress={() => Linking.openURL(url)}>
                Báo Công thương
              </Text>
              )
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default RicePrice;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  container: {
    //   flex: 1,
    //   padding: 16,
    //   paddingTop: 30
  },
  head: {
    height: 40,
  },
  heading: {
    margin: 8,
    textAlign: "center",
    color: "green",
  },
  text: {
    margin: 6,
    textAlign: "center",
  },
});
