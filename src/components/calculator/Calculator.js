import React, { useState, useEffect } from "react";
import { Image, StyleSheet, ScrollView } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import Color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";
import ColumnItem from "./ColumnItem";

StyleInit();

const Calculator = ({ navigation }) => {
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(0);

  const addColumnItem = () => {
    console.log("Add a column");
  };

  const handleTotal = (sum1) => {
    setTotal(sum1);
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
              {/* <View style={styles.sumContainer} margin-10>
                <TextField
                  text65
                  centered
                  grey10
                  onChangeText={setItem}
                  value={item}
                  validate={"required"}
                  style={styles.item}
                />
                <TextField
                  text65
                  centered
                  grey10
                  onChangeText={setItem}
                  value={item}
                  validate={"required"}
                  style={styles.item}
                />
                <TextField
                  text65
                  centered
                  grey10
                  onChangeText={setItem}
                  value={item}
                  validate={"required"}
                  style={styles.item}
                />
                <TextField
                  text65
                  centered
                  grey10
                  onChangeText={setItem}
                  value={item}
                  validate={"required"}
                  style={styles.item}
                />
                <TextField
                  text65
                  centered
                  grey10
                  onChangeText={setItem}
                  value={item}
                  validate={"required"}
                  style={styles.item}
                />
                <Text green text60 center style={styles.sumItems}>
                  250
                </Text>
              </View> */}

              <View
                style={styles.plusContainer}
                margin-10
                center
                onPress={() => console.log(123)}
              >
                {/* <Text green text50>
                  +
                </Text> */}
                <Button
                  link
                  text30
                  green20
                  label="+"
                  // marginT-5
                  style={styles.heading}
                  onPress={addColumnItem}
                />
              </View>
            </View>

            <View right marginT-20 style={styles.totalContainer}>
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
    borderColor: Color.lightGreyColor,
  },
  totalContainer: {
    width: "100%",
  },
});
