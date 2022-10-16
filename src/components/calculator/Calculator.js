import React, { useState } from "react";
import { Alert, Image, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import ColumnItem from "./ColumnItem";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const Calculator = ({ navigation }) => {
  const [sums, setSums] = useState({
    sum1: 0,
    sum2: 0,
    sum3: 0,
    sum4: 0,
    sum5: 0,
    sum6: 0,
    sum7: 0,
    sum8: 0,
    sum9: 0,
    sum10: 0,
    sum11: 0,
    sum12: 0,
    sum13: 0,
    sum14: 0,
    sum15: 0,
    sum16: 0,
  });
  const [total, setTotal] = useState(0);
  const [isReset, setIsReset] = useState(true);

  // const addColumnItem = () => {
  //   console.log("Add a column");
  // };

  const calculateTotal = () => {
    setTotal(
      sums.sum1 +
        sums.sum2 +
        sums.sum3 +
        sums.sum4 +
        sums.sum5 +
        sums.sum6 +
        sums.sum7 +
        sums.sum8 +
        sums.sum9 +
        sums.sum10 +
        sums.sum11 +
        sums.sum12 +
        sums.sum13 +
        sums.sum14 +
        sums.sum15 +
        sums.sum16
    );
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
            setIsReset(!isReset);
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
              <Text text80 marginT-5>
                (Kéo xuống dưới cùng để xem tổng sản lượng lúa)
              </Text>
            </View>
          </View>

          <View flex marginT-20 marginB-50 marginH-25>
            <View style={styles.calculatorContainer}>
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum1: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum2: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum3: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum4: sum })}
                isReset={isReset}
              />

              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum5: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum6: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum7: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum8: sum })}
                isReset={isReset}
              />

              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum9: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum10: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum11: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum12: sum })}
                isReset={isReset}
              />

              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum13: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum14: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum15: sum })}
                isReset={isReset}
              />
              <ColumnItem
                handleTotal={(sum) => setSums({ ...sums, sum16: sum })}
                isReset={isReset}
              />

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

            <View flex marginT-20 center style={styles.btnContainer}>
              <CustomButton label="Nhập lại" onPress={reset} />
              <CustomButton label="Tính tổng" onPress={calculateTotal} />
            </View>

            <View center marginT-30 style={styles.totalContainer}>
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
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
