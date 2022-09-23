import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Image,
  StyleSheet,
  Alert,
  Text as TextR,
} from "react-native";
import { View, TextField, Text, Typography } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
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
      <View flex marginB-50>
        <UserOptionModal />

        <View paddingT-30>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Chỉnh sửa thông tin
              </Text>
            </View>
          </View>

          <View marginH-25 marginT-20>
            {/* Address */}
            <View>
              <TextR text70 style={styles.label}>
                Địa chỉ:
              </TextR>
              <TextField
                text70
                grey10
                validate={"required"}
                onChangeText={setAddress}
                value={address}
                title="Địa chỉ:"
                titleStyle={{ fontSize: Typography.text70.fontSize }}
              />
            </View>

            {/* Coordinate */}
            <View>
              <TextR text70 style={styles.label}>
                Tọa độ:
              </TextR>
              <TextField
                text70
                grey10
                validate={"required"}
                onChangeText={setD1}
                value={d1}
                placeholder="Điểm 1"
              />
              <TextField
                text70
                grey10
                validate={"required"}
                onChangeText={setD2}
                value={d2}
                placeholder="Điểm 2"
              />
              <TextField
                text70
                grey10
                validate={"required"}
                onChangeText={setD3}
                value={d3}
                placeholder="Điểm 3"
              />
              <TextField
                text70
                grey10
                validate={"required"}
                onChangeText={setD4}
                value={d4}
                placeholder="Điểm 4"
              />
            </View>

            {/* Description */}
            <View>
              <TextR text70 style={styles.label}>
                Mô tả:
              </TextR>
              <TextField
                text70
                grey10
                multiline
                numberOfLines={3}
                validate={"required"}
                onChangeText={setDescription}
                value={description}
              />
            </View>
          </View>

          <View flex marginT-30 center style={styles.btnContainer}>
            <CustomButton label="Nhập lại" onPress={reset} />
            <CustomButton label="Lưu" onPress={showAlert} />
          </View>
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
  label: {
    fontSize: 18,
    fontWeight: "500",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
