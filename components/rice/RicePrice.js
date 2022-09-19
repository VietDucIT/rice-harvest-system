import React from "react";
import { ScrollView, Image, StyleSheet } from "react-native";
import { View, Text, Button } from "react-native-ui-lib";
import { Table, Row, Rows } from "react-native-table-component";

import CustomButton from "../core/CustomButton";
import { StyleInit } from "../../config/StyleInit";

StyleInit();

const RicePrice = ({ navigation }) => {
  const state = {
    tableHead: ["Giống lúa", "Giá (đồng/kg)"],
    tableData: [
      ["OM18", "3000"],
      ["OM5451", "4000"],
      ["ST24", "20000"],
      ["ST25", "30000"],
    ],
  };
  return (
    <ScrollView>
      {/* <View flex paddingH-25 paddingT-120> */}
      <View flex marginV-50>
        {/* <View left paddingL-10>
          <Button link green>
            <FontAwesome5 name="home" size={30} color="green" />
          </Button>
        </View> */}

        <View paddingT-30>
          <View center>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
          </View>
          <View center marginV-20>
            <Text text50 green>
              Cập nhật giá lúa
            </Text>
            <Text text80 marginT-10>
              Ngày 19/9/2022
            </Text>
          </View>
        </View>

        <View style={styles.container}>
          <Table borderStyle={{ borderWidth: 1 }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.heading}
            />
            <Rows data={state.tableData} textStyle={styles.text} />
          </Table>
        </View>

        <View right marginR-10>
          <Text text80 marginT-10>
            (theo Báo Công thương)
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};
export default RicePrice;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },

  container: { flex: 1, padding: 16, paddingTop: 30 },
  head: { height: 40 },
  heading: { margin: 8, textAlign: "center", color: "green" },
  text: { margin: 6, textAlign: "center" },
});
