import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Button, ScrollView } from "react-native";
import { View, Text, TextField } from "react-native-ui-lib";

import { StyleInit } from "../../config/StyleInit";

StyleInit();

const Calculator = ({ navigation }) => {
  const [total, setTotal] = useState(0);
  const [sum, setSum] = useState(0);
  const [item, setItem] = useState(0);

  return (
    <ScrollView>
      <View flex paddingH-25 paddingT-60>
        <View center>
          <Image
            style={styles.logo}
            source={require("../../assets/images/Logo.png")}
          />
        </View>
        <View center marginV-10>
          <Text text50 green>
            Tính tổng sản lượng lúa
          </Text>
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.calculatorContainer}>
            <View style={styles.sumContainer} margin-10>
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <Text green text60 style={styles.sumItems}>
                250
              </Text>
            </View>
            <View style={styles.sumContainer} margin-10>
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <Text green text60 style={styles.sumItems}>
                250
              </Text>
            </View>
            <View style={styles.sumContainer} margin-10>
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <Text green text60 style={styles.sumItems}>
                250
              </Text>
            </View>
            <View style={styles.sumContainer} margin-10>
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <Text green text60 style={styles.sumItems}>
                250
              </Text>
            </View>
            <View style={styles.sumContainer} margin-10>
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <TextField
                text70
                grey10
                onChangeText={setItem}
                value={item}
                style={styles.item}
              />
              <Text green text60 style={styles.sumItems}>
                250
              </Text>
            </View>
            <View
              style={[styles.sumContainer, styles.plusContainer]}
              margin-10
              center
            >
              <Text green text50>
                +
              </Text>
            </View>
          </View>

          <View style={styles.totalContainer}>
            <Text text50 red>
              Tổng cộng: <Text green>{total}</Text> kg
            </Text>
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
    flex: 1,
    // flexWrap: "wrap",
    // flexDirection: "row",
    marginBottom: 50,
  },
  calculatorContainer: {
    width: "100%",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  sumContainer: {
    width: 70,
    marginBottom: 40,
  },
  item: {
    height: 20,
  },
  sumItems: {
    // fontSize: 20,
    // fontWeight: "500",
  },
  plusContainer: {
    borderWidth: 1,
    borderColor: "grey",
  },
  totalContainer: {
    width: "100%",
  },
});
