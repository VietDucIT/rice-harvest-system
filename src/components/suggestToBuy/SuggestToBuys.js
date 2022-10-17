import React from "react";
import { Image, ScrollView, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import CustomButton from "../core/CustomButton";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getSuggestToBuyList from "../../services/suggestToBuy/getSuggestToBuyList";
import deleteSuggestToBuy from "../../services/suggestToBuy/deleteSuggestToBuy";

StyleInit();

const SuggestToBuys = ({ navigation }) => {
  // const suggestList = [
  //   {
  //     id: 1,
  //     farmerName: "Nguyễn Văn A",
  //     riceField: "Mẫu ruộng số 1",
  //   },
  //   {
  //     id: 2,
  //     farmerName: "Nguyễn Văn A",
  //     riceField: "Mẫu ruộng số 2",
  //   },
  //   {
  //     id: 3,
  //     farmerName: "Nguyễn Văn A",
  //     riceField: "Mẫu ruộng số 3",
  //   },
  //   {
  //     id: 4,
  //     farmerName: "Cao Thanh B",
  //     riceField: "Mẫu ruộng số 1",
  //   },
  //   {
  //     id: 5,
  //     farmerName: "Lâm C",
  //     riceField: "Mẫu ruộng số 2",
  //   },
  // ];

  const [suggestArray, setSuggestArray] = useState([]);

  // call API
  const getSuggestToBuyArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getSuggestToBuyList();
      // console.log("Suggest To Buy list: ", data);
      setSuggestArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Suggest To Buy list.");
    }
  }, []);

  useEffect(() => {
    getSuggestToBuyArray();
  }, [getSuggestToBuyArray]);

  // delete a Suggest To Buy
  const handleDelete = (id) => {
    Alert.alert("Thông báo", "Bạn có chắc chắn muốn xóa đề xuất thu mua này?", [
      {
        text: "Quay lại",
        style: "cancel",
      },
      {
        text: "Đồng ý",
        onPress: async () => {
          try {
            // setLoading(true);
            let dataAPI = await deleteSuggestToBuy(id);
            // console.log("Data API: ", dataAPI);

            // SET STATUS FOR THIS SUGGEST ???
            Alert.alert("Thông báo", "Đã xóa đề xuất thu mua này.", [
              {
                text: "Đóng",
                style: "cancel",
              },
            ]);
            navigation.navigate(nameList.suggestToBuys);
            // setLoading(false);
          } catch (err) {
            console.log("Error while deleting Suggest To Buy.");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <View flex marginB-60>
        <UserOptionModal />

        <View>
          <View center marginT-30>
            <Image
              style={styles.logo}
              source={require("../../assets/images/Logo.png")}
            />
            <View marginV-10>
              <Text text50 green>
                Quản lý đề xuất thu mua
              </Text>
            </View>
          </View>

          <SearchBar placeholder="Nhập tên nông dân" />

          <View marginT-20>
            {suggestList.map((item) => (
              <View
                style={styles.riceSeasonItem}
                padding-5
                marginV-8
                marginH-16
                key={item.id}
              >
                <TextR style={styles.farmerName}>{item.farmerName}</TextR>
                <View flex style={styles.subContainer}>
                  <Text text80>
                    {item.riceField.length <= 40
                      ? `${item.riceField}`
                      : `${item.riceField.substring(0, 39)}...`}
                  </Text>
                  <View flex right style={styles.controllContainer}>
                    <Text
                      green
                      text70
                      onPress={() =>
                        navigation.navigate(nameList.suggestToBuyInfo, {
                          idSuggestToBuy: item.id,
                        })
                      }
                    >
                      Xem
                    </Text>
                    <Text
                      text70
                      onPress={handleDelete}
                      style={styles.deleteBtn}
                    >
                      Xóa
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View marginT-30 center>
            <CustomButton
              label="Thêm"
              onPress={() => navigation.navigate(nameList.findFarmers)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default SuggestToBuys;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  riceSeasonItem: {
    borderBottomColor: color.greenColor,
    borderBottomWidth: 0.5,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: "600",
  },
  subContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  deleteBtn: {
    color: color.redColor,
    opacity: 0.6,
  },
});
