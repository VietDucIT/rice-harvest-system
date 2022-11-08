import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-ui-lib";

import { StyleInit } from "../../config/StyleInit";

StyleInit();

const CustomButton = (props) => {
  return (
    // <TouchableOpacity>
    <Button
      text70
      white
      bg-green
      label={props.label}
      style={styles.btn}
      {...props}
    />
    // </TouchableOpacity>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  btn: {
    width: 150,
  },
});
