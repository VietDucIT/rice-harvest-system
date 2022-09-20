import React, { useState, useEffect } from "react";
import { ScrollView, Image, StyleSheet, Alert } from "react-native";
import { View, TextField, Text } from "react-native-ui-lib";

import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const ModifyRiceField = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [d1, setD1] = useState(0);
  const [d2, setD2] = useState(0);
  const [d3, setD3] = useState(0);
  const [d4, setD4] = useState(0);
  const [coordinate, setCoordinate] = useState({});

  const reset = () => {
    setAddress("");
    setD1(0);
    setD2(0);
    setD3(0);
    setD4(0);
    setCoordinate({});
    setDescription("");
    console.log("Reset completed.");
  };

  useEffect(() => {
    setCoordinate({ d1, d2, d3, d4 });
  }, [d1, d2, d3, d4]);

  const showAlert = () =>
    Alert.alert("Chỉnh sửa thông tin", "Đã lưu thông tin ruộng lúa.", [
      {
        text: "Đóng",
        // onPress: () => Alert.alert("Cancel Pressed"),
        style: "cancel",
      },
    ]);

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
            Chỉnh sửa thông tin
          </Text>
        </View>

        <View>
          <View>
            <Text text70 style={styles.label}>
              Địa chỉ:
            </Text>
          </View>
          <TextField text70 grey10 onChangeText={setAddress} value={address} />
        </View>

        <View>
          <View>
            <Text text70 style={styles.label}>
              Tọa độ:
            </Text>
          </View>
          <TextField
            text70
            grey10
            onChangeText={setD1}
            value={d1}
            placeholder="Điểm 1"
          />
          <TextField
            text70
            grey10
            onChangeText={setD2}
            value={d2}
            placeholder="Điểm 2"
          />
          <TextField
            text70
            grey10
            onChangeText={setD3}
            value={d3}
            placeholder="Điểm 3"
          />
          <TextField
            text70
            grey10
            onChangeText={setD4}
            value={d4}
            placeholder="Điểm 4"
          />
        </View>

        <View>
          <View>
            <Text text70 style={styles.label}>
              Mô tả:
            </Text>
          </View>
          <TextField
            text70
            grey10
            multiline={true}
            numberOfLines={3}
            onChangeText={setDescription}
            value={description}
          />
        </View>

        <View flex marginT-20 center>
          <CustomButton label="Lưu" onPress={showAlert} />
          <CustomButton label="Nhập lại" marginT-5 marginB-20 onPress={reset} />
        </View>
      </View>
    </ScrollView>
  );
};
export default ModifyRiceField;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  label: {},
});
