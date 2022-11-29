import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Incubator, Picker, View } from "react-native-ui-lib";

import color from "../../config/color";
import { StyleInit } from "../../config/StyleInit";

import getAddressAPIData from "../../services/address/getAddressAPIData";

StyleInit();

const { TextField } = Incubator;

const AddressInputWithoutRequire = ({ handleAddress, isReset }) => {
  const initState = {
    province: "",
    town: "",
    commune: "",
    village: "",
  };
  const [address, setAddress] = useState(initState);

  // call API to get Address data
  const [addressAPI, setAddressAPI] = useState([]);
  const getAddressAPI = useCallback(async () => {
    try {
      const data = await getAddressAPIData();
      // console.log("AddressInputWithoutRequire - AddressAPI data: ", data);
      setAddressAPI(data);
    } catch (err) {
      console.log(
        "AddressInputWithoutRequire - Error while getting AddressAPI data."
      );
    }
  }, []);

  useEffect(() => {
    getAddressAPI();
  }, [getAddressAPI]);

  const getTownList = (provinceName) => {
    if (!provinceName) {
      return [];
    }
    return (
      addressAPI.find((element) => element.name === provinceName)?.districts ||
      []
    );
  };

  const getCommuneList = (provinceName, townName) => {
    if (!provinceName || !townName) {
      return [];
    }
    return (
      getTownList(provinceName).find((element) => element.name === townName)
        ?.wards || []
    );
  };

  useEffect(() => {
    handleAddress(address);
  }, [address]);

  useEffect(() => {
    setAddress(initState);
  }, [isReset]);

  return (
    <View marginT-20 style={styles.addressContainer}>
      {/* Province */}
      <View marginH-20 style={styles.addressItem}>
        <Picker
          migrateTextField
          text70
          placeholder={"Chọn tỉnh"}
          value={address.province}
          onChange={(text) => {
            console.log(text.value);
            setAddress({
              ...address,
              province: text.value,
              town: "",
              commune: "",
              village: "",
            });
          }}
          style={styles.textField}
        >
          {addressAPI.map((item, index) => (
            <Picker.Item key={index} value={item.name} label={item.name} />
          ))}
        </Picker>
      </View>

      {/* Town */}
      {address.province && (
        <View marginH-20 style={styles.addressItem}>
          <Picker
            migrateTextField
            text70
            placeholder={"Chọn huyện"}
            value={address.town}
            onChange={(text) => {
              console.log(text.value);
              setAddress({
                ...address,
                town: text.value,
                commune: "",
                village: "",
              });
            }}
            style={styles.textField}
          >
            {getTownList(address.province).map((item, index) => (
              <Picker.Item key={index} value={item.name} label={item.name} />
            ))}
          </Picker>
        </View>
      )}

      {/* Commune */}
      {address.town && (
        <View marginH-20 style={styles.addressItem}>
          <Picker
            migrateTextField
            text70
            placeholder={"Chọn xã"}
            value={address.commune}
            onChange={(text) => {
              console.log(text.value);
              setAddress({
                ...address,
                commune: text.value,
                village: "",
              });
            }}
            style={styles.textField}
          >
            {getCommuneList(address.province, address.town).map(
              (item, index) => (
                <Picker.Item key={index} value={item.name} label={item.name} />
              )
            )}
          </Picker>
        </View>
      )}

      {/* Village */}
      {address.commune && (
        <View marginH-20 style={styles.addressItem}>
          <TextField
            text70
            grey10
            value={address.village}
            onChangeText={(text) => {
              setAddress({
                ...address,
                village: text,
              });
            }}
            placeholder="Ấp"
            containerStyle={{ marginBottom: 10 }}
            style={[styles.addressItem, styles.textField]}
            autoCapitalize="words"
          />
        </View>
      )}
    </View>
  );
};
export default AddressInputWithoutRequire;

const styles = StyleSheet.create({
  textField: {
    borderBottomWidth: 0.5,
    borderColor: color.lightGreyColor,
    paddingBottom: 5,
  },
  addressContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  addressItem: {
    width: 120,
  },
});
