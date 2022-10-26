import React, { useState, useEffect, useCallback } from "react";
import { Image, StyleSheet, Text as TextR } from "react-native";
import { Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionModal from "../user/UserOptionModal";
import SearchBar from "../core/SearchBar";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getFarmerListByName from "../../services/farmer/getFarmerListByName";
// import getFarmerListByAddress from "../../services/farmer/getFarmerListByAddress";

StyleInit();

const FindFarmers = ({ navigation }) => {
  const [farmerName, setFarmerName] = useState("");
  const [farmerArray, setFarmerArray] = useState(initFarmerArray);
  // const [isLoading, setLoading] = useState(false);

  const initFarmerArray = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      nickname: "Chín A",
      gender: 1,
      birthYear: 1960,
      address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
      phone: "0123 456 789",
      role: 0,
    },
    {
      id: 2,
      name: "Trần Thị B",
      nickname: "6 Bê",
      gender: 0,
      birthYear: 1950,
      address: "Mỹ An, Thiện Mỹ, Châu Thành, Sóc Trăng",
      phone: "0123 456 780",
      role: 0,
    },
    {
      id: 3,
      name: "Lê Trần Minh C",
      nickname: "Hai Xẹo",
      gender: 1,
      birthYear: 1966,
      address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
      phone: "0123 456 781",
      role: 0,
    },
    {
      id: 4,
      name: "Nguyễn Văn A",
      nickname: "Năm A",
      gender: 1,
      birthYear: 1960,
      address: "Mỹ Đức, Mỹ Hương, Mỹ Tú, Sóc Trăng",
      phone: "0123 456 782",
      role: 0,
    },
    {
      id: 5,
      name: "Nguyễn Minh D",
      nickname: "Tư Di",
      gender: 1,
      birthYear: 1960,
      address: "Mỹ Đức, Thiện Mỹ, Châu Thành, Sóc Trăng",
      phone: "0123 456 783",
      role: 0,
    },
  ];

  // call API
  const getFarmerArray = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await getFarmerListByName(farmerName);
      // const data2 = await getFarmerListByAddress(address);
      // console.log("Farmer list: ", data);
      setFarmerArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("Error while getting Farmer list.");
    }
  }, [farmerName]);

  useEffect(() => {
    getFarmerArray();
  }, [getFarmerArray]);

  return (
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
              Tìm kiếm nông dân
            </Text>
          </View>
        </View>

        <SearchBar
          placeholder="Nhập tên nông dân..."
          handleSearch={(name) => setFarmerName(name)}
        />

        {/* <View>Lọc</View> */}

        <View marginT-20>
          {farmerArray.map((item) => (
            <View
              style={styles.farmerItem}
              padding-5
              marginV-8
              marginH-16
              key={item._id}
            >
              <TextR style={styles.farmerName}>
                {item.name} ({item.nickname})
              </TextR>
              <View flex style={styles.subContainer}>
                <Text text80>
                  {item.address.length <= 40
                    ? `${item.address}`
                    : `${item.address.substring(0, 39)}...`}
                </Text>
                <Text
                  green
                  text70
                  onPress={() =>
                    navigation.navigate(nameList.farmerInfo, {
                      idFarmer: item._id,
                    })
                  }
                >
                  Xem
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};
export default FindFarmers;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },

  farmerItem: {
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
});
