import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Incubator, View } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import color from "../../config/color";

const { TextField } = Incubator;

const SearchBar = (props) => {
  const [name, setName] = useState("");

  const handleSearch = () => {};

  return (
    <View flex style={styles.container} center marginT-30 marginB-20 {...props}>
      <View style={styles.textField}>
        <TextField
          text70
          grey10
          placeholder={props.placeholder}
          value={name}
          onChangeText={setName}
        />
      </View>
      <Button style={styles.searchBtn} onPress={handleSearch}>
        <FontAwesome5 name="search" size={15} color="white" />
      </Button>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  textField: {
    width: 220,
    height: 40,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: color.lightGreyColor,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    paddingLeft: 10,
    paddingTop: 3,
  },
  searchBtn: {
    height: 40,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: color.lightGreyColor,
    borderRadius: 0,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: color.greenColor,
  },
});
