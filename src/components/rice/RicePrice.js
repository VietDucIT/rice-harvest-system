import React, { useState, useEffect, useCallback } from "react";
import { Image, Linking, LogBox, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";

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
    tableHead: ["Ngày", "OM 18", "OM 5451", "IR 504", "Đài Thơm 8"],
    tableTitle: [
      "05/12",
      "06/12",
      "07/12",
      "08/12",
      "09/12",
      "10/12",
      "11/12",
      "12/12",
      "13/12",
      "14/12",
    ],
    tableData: [
      ["6850", "6700", "6250", "6850"], // 05/12
      ["6850", "6500", "6250", "6850"], // 06/12
      ["6850", "6500", "6250", "6850"], // 07/12
      ["6750", "6300", "6157", "6780"], // 08/12
      ["6821", "6400", "6220", "6842"], // 09/12
      ["6850", "6550", "6250", "6850"], // 10/12
      ["6850", "6500", "6250", "6820"], // 11/12
      ["6870", "6574", "6260", "6850"], // 12/12
      ["6850", "6600", "6250", "6850"], // 13/12
      ["6900", "6600", "6250", "6850"], // 14/12
    ],
  };

  // call API to get Rice Price of today
  const getRicePriceData = useCallback(async () => {
    try {
      const data = await getRicePrice();
      // console.log("RicePrice - Rice Price data: ", data);
      setRicePriceData(data);
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
  const getPricePredictionData = async () => {
    try {
      setIsLoading(true);
      const data = await getPricePrediction();
      console.log("RicePrice - Price Prediction data: ", data);
      setPricePredictionData(data);
      setIsLoading(false);
    } catch (err) {
      console.log("RicePrice - Error while getting Price Prediction data.");
    }
  };

  const handlePrediction = () => {
    getPricePredictionData();
    setIsShowPredict(!isShowPredict);
  };

  // for (let i = 0; i < pricePredictionData.length; i++) {
  //   const rowData = [];
  //   rowData.push(pricePredictionData.om18[i].price, pricePredictionData.om5451[i].price, pricePredictionData.ir504[i].price, pricePredictionData.daiThom8[i].price);
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
                style={styles.tableHead}
                textStyle={styles.tableHeading}
              />
              <Rows data={table1.tableData} textStyle={styles.tableText} />
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
          <View center>
            <CustomButton
              label="Xem dự báo giá lúa"
              onPress={handlePrediction}
              style={styles.predictBtn}
            />
          </View>

          {isShowPredict && isLoading && <LoaderPart />}

          {isShowPredict &&
            !isLoading && ( //
              <View marginT-20>
                <View right marginR-15 marginT-10>
                  <Text text80>(Đơn vị tính: đồng/kg)</Text>
                </View>

                {/* <ScrollView flex padding-16 paddingT-30 horizontal> */}
                <View flex padding-16 paddingT-30>
                  <Table borderStyle={{ borderWidth: 1 }}>
                    <Row
                      data={table2.tableHead}
                      style={styles.tableHead}
                      textStyle={styles.tableHeading}
                      flexArr={[1, 1, 1, 1, 1]}
                    />
                    {/* <Rows data={table2.tableData} textStyle={styles.tableText} /> */}
                    <TableWrapper style={styles.tableWrapper}>
                      <Col
                        data={table2.tableTitle}
                        style={styles.tableTitle}
                        textStyle={styles.tableSubHeading}
                      />
                      <Rows
                        data={table2.tableData}
                        style={styles.tableRow}
                        textStyle={styles.tableText}
                        flexArr={[1, 1, 1, 1]}
                      />
                    </TableWrapper>
                  </Table>
                </View>
                {/* </ScrollView> */}
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
  tableHead: {
    height: 60,
  },
  tableHeading: {
    marginVertical: 8,
    marginHorizontal: 4,
    fontWeight: "600",
    textAlign: "center",
    color: color.greenColor,
  },
  tableSubHeading: {
    fontWeight: "600",
    textAlign: "center",
  },
  tableWrapper: { flexDirection: "row" },
  tableTitle: { flex: 1 },
  tableRow: { height: 40 },
  tableText: {
    margin: 6,
    textAlign: "center",
  },
  predictBtn: {
    width: 220,
  },
});
