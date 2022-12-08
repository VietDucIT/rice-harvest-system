import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapForBuyingArea = ({ riceBuyingArea }) => {
  const address =
    riceBuyingArea.village +
    ", " +
    riceBuyingArea.commune +
    ", " +
    riceBuyingArea.town +
    ", " +
    riceBuyingArea.province;
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 9.66,
          longitude: 105.86,
          latitudeDelta: 0.05,
          longitudeDelta: 0.04,
        }}
      >
        <Marker
          coordinate={{ latitude: 9.65, longitude: 105.853 }}
          title={riceBuyingArea.name}
          description={address}
        />
      </MapView>
    </View>
  );
};
export default MapForBuyingArea;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
