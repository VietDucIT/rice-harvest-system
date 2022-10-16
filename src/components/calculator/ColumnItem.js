import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Incubator, Text, View } from "react-native-ui-lib";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const { TextField } = Incubator;

const ColumnItem = ({ handleTotal, isReset }) => {
  const [items, setItems] = useState({
    item1: 0,
    item2: 0,
    item3: 0,
    item4: 0,
    item5: 0,
  });
  const [sum, setSum] = useState(0);

  useEffect(() => {
    handleTotal(sum);
  }, [sum]);

  useEffect(() => {
    setItems({
      item1: 0,
      item2: 0,
      item3: 0,
      item4: 0,
      item5: 0,
      sum: 0,
    });
  }, [isReset]);

  useEffect(
    () =>
      setSum(
        Number(items.item1) +
          Number(items.item2) +
          Number(items.item3) +
          Number(items.item4) +
          Number(items.item5)
      ),
    [items]
  );

  return (
    <View style={styles.sumContainer} margin-10>
      <TextField
        text65
        grey10
        centered
        value={items.item1}
        onChangeText={(num) => setItems({ ...items, item1: num })}
        keyboardType="numeric"
        style={styles.item}
      />
      <TextField
        text65
        grey10
        centered
        value={items.item2}
        onChangeText={(num) => setItems({ ...items, item2: num })}
        keyboardType="numeric"
        style={styles.item}
      />
      <TextField
        text65
        grey10
        centered
        value={items.item3}
        onChangeText={(num) => setItems({ ...items, item3: num })}
        keyboardType="numeric"
        style={styles.item}
      />
      <TextField
        text65
        grey10
        centered
        value={items.item4}
        onChangeText={(num) => setItems({ ...items, item4: num })}
        keyboardType="numeric"
        style={styles.item}
      />
      <TextField
        text65
        grey10
        centered
        value={items.item5}
        onChangeText={(num) => setItems({ ...items, item5: num })}
        keyboardType="numeric"
        style={styles.item}
      />
      <Text green text60 center marginT-20>
        {sum}
      </Text>
    </View>
  );
};
export default ColumnItem;

const styles = StyleSheet.create({
  sumContainer: {
    width: 70,
    marginBottom: 40,
  },
  item: {
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: color.lightGreyColor,
    paddingBottom: 5,
  },
});
