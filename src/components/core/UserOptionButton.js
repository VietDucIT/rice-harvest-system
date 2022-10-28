import React from "react";
import { Button, View } from "react-native-ui-lib";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import nameList from "../../json/nameList";

import color from "../../config/color";

const UserOptionButton = ({ navigation }) => {
  return (
    <View right marginR-10 marginT-10>
      <Button
        link
        onPress={() => navigation.navigate(nameList.userOptionModal)}
      >
        <FontAwesome5 name="users-cog" size={25} color={color.greenColor} />
      </Button>
    </View>
  );
};

export default UserOptionButton;
