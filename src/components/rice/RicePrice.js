import React, { useState, useEffect, useCallback } from "react";
import { Image, Linking, LogBox, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import { Table, Row, Rows } from "react-native-table-component";

import UserOptionButton from "../core/UserOptionButton";
import CustomButton from "../core/CustomButton";
import LoaderPart from "../core/LoaderPart";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getDayTime from "../../services/time/getDayTime";
import getRicePrice from "../../services/ricePrice/getRicePrice";
import getPricePrediction from "../../services/ricePrice/getPricePrediction";

LogBox.ignoreLogs([
  "Warning: Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.",
]);

StyleInit();
const { getDateString } = getDayTime();

const url = "https://congthuong.vn/chu-de/gia-lua-gao-hom-nay.topic";

const RicePrice = ({ navigation }) => {
  const [ricePriceData, setRicePriceData] = useState([]);
  const [pricePredictionData, setPricePredictionData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowPredict, setIsShowPredict] = useState(false);

  const date = getDateString(new Date());
  // table present Rice Price of today
  const table1 = {
    tableHead: ["Giống lúa", "Giá (đồng/kg)"],
    tableData: [],
  };
  // table present Rice Price Prediction
  const table2 = {
    tableHead: [],
    tableTitle: [],
    tableData: [],
  };

  // call API to get Rice Price of today
  const getRicePriceData = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getRicePrice();
      // console.log("RicePrice - Rice Price data: ", data);
      await data.sort((a, b) => a.rice.localeCompare(b.rice));
      setRicePriceData(data);
      // setLoading(false);
    } catch (err) {
      console.log("RicePrice - Error while getting Rice Price data.");
    }
  }, []);

  useEffect(() => {
    getRicePriceData();
  }, [getRicePriceData]);

  for (let i = 0; i < ricePriceData.length; i++) {
    const rowData = [];
    rowData.push(ricePriceData[i].rice, ricePriceData[i].price);
    table1.tableData.push(rowData);
  }

  // call API to get Price Prediction
  const getPricePredictionData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getPricePrediction();
      console.log("RicePrice - Price Prediction data: ", data);
      setPricePredictionData(data);
      setIsLoading(false);
    } catch (err) {
      console.log("RicePrice - Error while getting Price Prediction data.");
    }
  }, []);

  useEffect(() => {
    getPricePredictionData();
  }, [getPricePredictionData]);

  const handlePrediction = () => {
    getPricePredictionData();
    setIsShowPredict(!isShowPredict);
  };

  // ???
  // for (let i = 0; i < pricePredictionData.length; i++) {
  //   const rowData = [];
  //   rowData.push(pricePredictionData[i].rice, pricePredictionData[i].price);
  //   table2.tableData.push(rowData);
  // }

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionButton navigation={navigation} />

        <View paddingT-30>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View center marginV-20>
              <Text text50 green>
                Thông tin giá lúa
              </Text>
              <Text text80 marginT-10>
                Ngày {date}
              </Text>
            </View>
          </View>

          <View flex padding-16 paddingT-30>
            <Table borderStyle={{ borderWidth: 1 }}>
              <Row
                data={table1.tableHead}
                style={styles.head}
                textStyle={styles.heading}
              />
              <Rows data={table1.tableData} textStyle={styles.text} />
            </Table>
          </View>

          <View right marginR-15 marginT-10>
            <Text text80>
              (Nguồn:{" "}
              <Text green onPress={() => Linking.openURL(url)}>
                Báo Công Thương
              </Text>
              )
            </Text>
          </View>
        </View>

        <View marginT-40>
          {/* <Button link onPress={() => setIsShowPredict(!isShowPredict)} left>
            <Text green style={styles.link}>
              Xem dự báo giá lúa
            </Text>
          </Button> */}
          <View center>
            <CustomButton
              label="Xem dự báo giá lúa"
              onPress={handlePrediction}
              style={styles.predictBtn}
            />
          </View>

          {isShowPredict && isLoading && <LoaderPart />}

          {isShowPredict && !isLoading && (
            <View marginT-20>
              <Text>Đây là dự báo giá lúa.</Text>

              {/* <View right marginR-15 marginT-10>
                <Text text80>(Đơn vị tính: đồng/kg)</Text>
              </View>

              <ScrollView flex padding-16 paddingT-30 horizontal>
                <Table borderStyle={{ borderWidth: 1 }}>
                  <Row
                    data={table2.tableHead}
                    style={styles.head}
                    textStyle={styles.heading}
                  />
                  <Rows data={table2.tableData} textStyle={styles.text} />
                </Table>
              </ScrollView> */}
            </View>
          )}
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
  head: {
    height: 40,
  },
  heading: {
    margin: 8,
    textAlign: "center",
    color: color.greenColor,
  },
  text: {
    margin: 6,
    textAlign: "center",
  },
  predictBtn: {
    width: 220,
  },
});
