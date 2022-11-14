import React, { useState, useEffect, useCallback } from "react";
import { Image, StyleSheet, Text as TextR } from "react-native";
import { Switch, Text, View } from "react-native-ui-lib";

import nameList from "../../json/nameList";

import UserOptionButton from "../core/UserOptionButton";
import SearchBar from "../core/SearchBar";
import CustomButton from "../core/CustomButton";
import AddressInputWithoutRequire from "../core/AddressInputWithoutRequire";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import findFarmerByName from "../../services/farmer/findFarmerByName";
import findFarmerByAddress from "../../services/farmer/findFarmerByAddress";

StyleInit();

const FindFarmers = ({ navigation }) => {
  const [isFindByAddress, setIsFindByAddress] = useState(false);

  const [farmerArray, setFarmerArray] = useState([]);
  // const [isLoading, setLoading] = useState(false);

  // find Farmers by Name
  const [farmerName, setFarmerName] = useState("");

  const findByName = useCallback(async () => {
    try {
      // setLoading(true);
      const data = await findFarmerByName(farmerName);
      // const data2 = await findFarmerByAddress(address);
      // console.log("FindFarmner - Farmer list: ", data);
      setFarmerArray(data);
      // setLoading(false);
    } catch (err) {
      console.log("FindFarmner - Error while getting Farmer list.");
    }
  }, [farmerName]);

  useEffect(() => {
    findByName();
  }, [findByName]);

  // find Farmers by Address
  const [address, setAddress] = useState({});
  const [isReset, setIsReset] = useState(false);

  const handleFind = async () => {
    try {
      // setLoading(true);

      // console.log("FindFarmers by Address - Data: ", riceField);
      const data = await findFarmerByAddress(address);
      setFarmerArray(data);
      // console.log("FindFarmers by Address - Data API: ", data);
      // setLoading(false);
    } catch (err) {
      console.log(
        "FindFarmers by Address - Error while finding Farmers by Address."
      );
    }
  };

  const reset = () => {
    setAddress({});
    setIsReset(!isReset);
    console.log("AddRiceFieldWithoutRequire - Reset completed.");
  };

  return (
    <View flex marginB-60>
      <UserOptionButton navigation={navigation} />

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

        <View row>
          <Text text50 green>
            Tìm theo địa chỉ
          </Text>
          <Switch
            width={80}
            height={38}
            thumbSize={34}
            onColor={color.greenColor}
            offColor={color.greyColor}
            value={isFindByAddress}
            onValueChange={() => setIsFindByAddress(!isFindByAddress)}
            // style={{marginBottom: 20}}
          />
        </View>

        {!isFindByAddress && (
          <SearchBar
            placeholder="Nhập tên nông dân..."
            handleSearch={(name) => setFarmerName(name)}
          />
        )}

        {isFindByAddress && (
          <View>
            <AddressInputWithoutRequire
              handleAddress={(address) => setAddress(address)}
              isReset={isReset}
            />
            <CustomButton label="Nhập lại" onPress={reset} />
            <CustomButton label="Tìm" onPress={handleFind} />
          </View>
        )}

        <View marginT-20>
          {farmerArray?.map((item, index) => {
            const address =
              item.village +
              ", " +
              item.commune +
              ", " +
              item.town +
              ", " +
              item.province;
            return (
              <View
                style={styles.farmerItem}
                padding-5
                marginV-8
                marginH-16
                key={index}
              >
                <TextR style={styles.farmerName}>
                  {item.name} ({item.nickname})
                </TextR>
                <View flex style={styles.subContainer}>
                  <Text text80>
                    {address.length <= 40
                      ? address
                      : `${address.substring(0, 39)}...`}
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
            );
          })}
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
