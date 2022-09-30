import React, { useState, useEffect } from "react";
import { Alert, Image, StyleSheet, ScrollView } from "react-native";
import { Button, Text, View } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import ColumnItem from "./ColumnItem";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const Calculator = ({ navigation }) => {
  const [sum1, setSum1] = useState(0);
  const [sum2, setSum2] = useState(0);
  const [sum3, setSum3] = useState(0);
  const [sum4, setSum4] = useState(0);
  const [sum5, setSum5] = useState(0);
  const [sum6, setSum6] = useState(0);
  const [sum7, setSum7] = useState(0);
  const [sum8, setSum8] = useState(0);
  const [sum9, setSum9] = useState(0);
  const [sum10, setSum10] = useState(0);
  const [sum11, setSum11] = useState(0);
  const [sum12, setSum12] = useState(0);
  const [sum13, setSum13] = useState(0);
  const [sum14, setSum14] = useState(0);
  const [sum15, setSum15] = useState(0);
  const [sum16, setSum16] = useState(0);
  const [total, setTotal] = useState(0);

  // const addColumnItem = () => {
  //   console.log("Add a column");
  // };

  const calculateTotal = () => {
    setTotal(
      sum1 +
        sum2 +
        sum3 +
        sum4 +
        sum5 +
        sum6 +
        sum7 +
        sum8 +
        sum9 +
        sum10 +
        sum11 +
        sum12 +
        sum13 +
        sum14 +
        sum15 +
        sum16
    );
  };

  const reset = () => {
    Alert.alert(
      "Xác nhận",
      "Bạn có chắc chắn muốn xóa tất cả và Bắt đầu lại từ đầu?",
      [
        {
          text: "Xoá",
          onPress: () => {
            setTotal(0);
          },
        },
        {
          text: "Không",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <ScrollView>
      <View flex marginB-50>
        <UserOptionModal />

        <View paddingT-50>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View center marginV-10>
              <Text text50 green>
                Tính tổng sản lượng lúa
              </Text>
              <Text text80 marginT-5>
                (Kéo xuống dưới cùng để xem tổng sản lượng lúa)
              </Text>
            </View>
          </View>

          <View
            flex
            marginT-20
            marginB-50
            marginH-25
            style={styles.contentWrapper}
          >
            <View style={styles.calculatorContainer}>
              <ColumnItem handleTotal={(sum) => setSum1(sum)} />
              <ColumnItem handleTotal={(sum) => setSum2(sum)} />
              <ColumnItem handleTotal={(sum) => setSum3(sum)} />
              <ColumnItem handleTotal={(sum) => setSum4(sum)} />

              <ColumnItem handleTotal={(sum) => setSum5(sum)} />
              <ColumnItem handleTotal={(sum) => setSum6(sum)} />
              <ColumnItem handleTotal={(sum) => setSum7(sum)} />
              <ColumnItem handleTotal={(sum) => setSum8(sum)} />

              <ColumnItem handleTotal={(sum) => setSum9(sum)} />
              <ColumnItem handleTotal={(sum) => setSum10(sum)} />
              <ColumnItem handleTotal={(sum) => setSum11(sum)} />
              <ColumnItem handleTotal={(sum) => setSum12(sum)} />

              <ColumnItem handleTotal={(sum) => setSum13(sum)} />
              <ColumnItem handleTotal={(sum) => setSum14(sum)} />
              <ColumnItem handleTotal={(sum) => setSum15(sum)} />
              <ColumnItem handleTotal={(sum) => setSum16(sum)} />

              {/* <View
                style={styles.plusContainer}
                margin-10
                center
                onPress={() => console.log(123)}
              >
                <Button
                  link
                  text30
                  green20
                  label="+"
                  style={styles.heading}
                  onPress={addColumnItem}
                />
              </View> */}
            </View>

            <View flex marginT-20 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton label="Tính tổng" onPress={calculateTotal} />
            </View>

            <View center marginT-30 style={styles.totalContainer}>
              <Text text50 red>
                Tổng cộng: <Text green>{total}</Text> kg
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default Calculator;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  contentWrapper: {
    // flex: 1,
    // flexWrap: "wrap",
    // flexDirection: "row",
    // marginBottom: 50,
  },
  calculatorContainer: {
    width: "100%",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  plusContainer: {
    height: 325,
    width: 70,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: color.lightGreyColor,
  },
  totalContainer: {
    width: "100%",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
