import React from "react";
import { StyleSheet, View } from "react-native";
import { LatLng, LeafletView } from "react-native-leaflet-view";

import color from "../../config/color";

const coordinate = {
  lat: 37.78825,
  lng: -122.4324,
};

const Map = () => {
  return (
    <View style={styles.container}>
      <LeafletView
        mapMarkers={[
          {
            position: {
              lat: 37.78825,
              lng: -122.4324,
            },
            icon: "📍",
            size: [32, 32],
          },
        ]}
        mapCenterPosition={{
          lat: 37.78825,
          lng: -122.4324,
        }}
      />
    </View>
  );
};
export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
