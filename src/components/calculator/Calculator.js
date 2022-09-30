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
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(0);

  // const addColumnItem = () => {
  //   console.log("Add a column");
  // };

  const handleTotal = (sum1) => {
    setTotal(sum1);
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
              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />

              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />

              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />

              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />
              <ColumnItem handleTotal={handleTotal} />

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

            <View right marginT-20 style={styles.totalContainer}>
              <Text text50 red>
                Tổng cộng: <Text green>{total}</Text> kg
              </Text>
            </View>

            <View center marginT-30>
              <CustomButton label="Nhập lại" onPress={reset} />
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
});
