import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Incubator, Text, View } from "react-native-ui-lib";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const { TextField } = Incubator;

const ColumnItem = ({ handleTotal }) => {
  const [item1, setItem1] = useState(0);
  const [item2, setItem2] = useState(0);
  const [item3, setItem3] = useState(0);
  const [item4, setItem4] = useState(0);
  const [item5, setItem5] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => handleTotal(sum), [sum]);

  useEffect(
    () =>
      setSum(
        Number(item1) +
          Number(item2) +
          Number(item3) +
          Number(item4) +
          Number(item5)
      ),
    [item1, item2, item3, item4, item5]
  );

  // const reset = () = {}

  return (
    <View style={styles.sumContainer} margin-10>
      <TextField
        text65
        centered
        grey10
        onChangeText={setItem1}
        value={item1}
        style={styles.item}
      />
      <TextField
        text65
        centered
        grey10
        onChangeText={setItem2}
        value={item2}
        style={styles.item}
      />
      <TextField
        text65
        centered
        grey10
        onChangeText={setItem3}
        value={item3}
        style={styles.item}
      />
      <TextField
        text65
        centered
        grey10
        onChangeText={setItem4}
        value={item4}
        style={styles.item}
      />
      <TextField
        text65
        centered
        grey10
        onChangeText={setItem5}
        value={item5}
        style={styles.item}
      />
      <Text green text60 center marginT-20 style={styles.sumItems}>
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
  sumItems: {
    // fontSize: 20,
    // fontWeight: "500",
  },
});
