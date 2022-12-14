import React, { useState, useEffect, useCallback } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text as TextR,
  TouchableOpacity,
} from "react-native";
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
import getContactList from "../../services/contact/getContactList";
import deleteContact from "../../services/contact/deleteContact";
import getUserIdStored from "../../services/user/getUserIdStored";

StyleInit();

const FindFarmers = ({ navigation, route }) => {
  // get UserID from SecureStore
  const [userId, setUserId] = useState();
  getUserIdStored().then((value) => {
    setUserId(value);
  });
  useEffect(
    () => console.log("FindFarmners - User ID from SecureStore: ", userId),
    [userId]
  );

  const [contactArray, setContactArray] = useState([]);
  const [isShowContact, setIsShowContact] = useState(true);

  // call API to get Contact list to show as default
  const getContactArray = useCallback(async () => {
    try {
      const data = await getContactList(userId);
      // console.log("Contacts - Contact list: ", data);
      setContactArray(data);
    } catch (err) {
      console.log("Contacts - Error while getting Contact list.");
    }
  }, [userId]);

  useEffect(() => {
    getContactArray();
  }, [getContactArray]);

  // recall API to get list after adding
  useEffect(() => {
    if (route.params?.hasNewContact) {
      getContactArray();
    }
  }, [route.params?.hasNewContact]);

  // delete a Contact
  const handleDelete = (id) => {
    Alert.alert(
      "Xóa liên hệ?",
      "Nếu xóa liên hệ, thông tin liên lạc của người dùng này sẽ không thể tự động hiển thị với bạn.",
      [
        {
          text: "Quay lại",
          style: "cancel",
        },
        {
          text: "Đồng ý",
          onPress: async () => {
            try {
              let dataAPI = await deleteContact(id);
              if (dataAPI) {
                ToastAndroid.show("Đã xóa người liên hệ", ToastAndroid.SHORT);
              }
              getContactArray();
            } catch (err) {
              console.log("Contacts - Error while deleting Contact.");
            }
          },
        },
      ]
    );
  };

  // find Farmers by Name
  const [farmerArray, setFarmerArray] = useState([]);

  const findByName = async (farmerName) => {
    setIsShowContact(false);

    try {
      const data = await findFarmerByName(farmerName);
      // console.log("FindFarmners - Farmer list by Name: ", data);
      setFarmerArray(data);
    } catch (err) {
      console.log("FindFarmners - Error while finding Farmers by Name.");
    }
  };

  // find Farmers by Address
  const [isFindByAddress, setIsFindByAddress] = useState(false);
  const [address, setAddress] = useState({});
  const [isReset, setIsReset] = useState(false);

  const findByAddress = async () => {
    setIsShowContact(false);

    try {
      // console.log("FindFarmers by Address: ", address);
      const data = await findFarmerByAddress(
        address.province,
        address.town,
        address.commune,
        address.village
      );
      // console.log("FindFarmers by Address - Data API: ", data);
      setFarmerArray(data);
    } catch (err) {
      console.log(
        "FindFarmers by Address - Error while finding Farmers by Address."
      );
    }
  };

  const reset = () => {
    setAddress({});
    setIsReset(!isReset);
    console.log("FindFarmers - Reset completed.");
  };

  return (
    <ScrollView>
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

          <View center row>
            <Text text70>Tìm theo địa chỉ</Text>
            <Switch
              // width={50}
              // height={10}
              // thumbSize={14}
              onColor={color.greenColor}
              offColor={color.greyColor}
              value={isFindByAddress}
              onValueChange={() => setIsFindByAddress(!isFindByAddress)}
              marginL-20
            />
          </View>

          {!isFindByAddress && (
            <SearchBar
              placeholder="Nhập tên nông dân..."
              handleSearch={(name) => findByName(name)}
            />
          )}

          {isFindByAddress && (
            <View>
              <AddressInputWithoutRequire
                handleAddress={(address) => setAddress(address)}
                isReset={isReset}
              />
              <View row center>
                <CustomButton
                  label="Nhập lại"
                  onPress={reset}
                  style={{ width: 120 }}
                />
                <CustomButton
                  label="Tìm"
                  onPress={findByAddress}
                  style={{ width: 120, marginLeft: 20 }}
                />
              </View>
            </View>
          )}

          <View marginT-20>
            {isShowContact &&
              contactArray?.map((item, index) => (
                <View
                  style={styles.farmerItem}
                  padding-5
                  marginV-8
                  marginH-16
                  key={index}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(nameList.farmerInfo, {
                        idFarmer: item.userId2,
                      })
                    }
                  >
                    <TextR style={styles.farmerName}>{item.userName2}</TextR>
                    <Text text80>
                      {item.userNickname2.length <= 40
                        ? `${item.userNickname2}`
                        : `${item.userNickname2.substring(0, 39)}...`}
                    </Text>
                  </TouchableOpacity>

                  <View flex style={styles.subContainer}>
                    <View flex right style={styles.controllContainer}>
                      <Text
                        green
                        text70
                        onPress={() =>
                          navigation.navigate(nameList.farmerInfo, {
                            idFarmer: item.userId2,
                          })
                        }
                      >
                        Xem
                      </Text>

                      <Text
                        text70
                        onPress={() => handleDelete(item._id)}
                        style={styles.deleteBtn}
                      >
                        Xóa
                      </Text>
                    </View>
                  </View>
                </View>
              ))}

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
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(nameList.farmerInfo, {
                        idFarmer: item._id,
                      })
                    }
                  >
                    <TextR style={styles.farmerName}>
                      {item.name} ({item.nickname})
                    </TextR>

                    <Text text80>
                      {address.length <= 35
                        ? address
                        : `${address.substring(0, 34)}...`}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.subContainer}>
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
    </ScrollView>
  );
};
export default FindFarmers;

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
  },
  farmerItem: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
