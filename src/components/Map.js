import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

const Map = () => {
  return (
    <MapView
      initialRegion={{
        latitude: 42.6629,
        longitude: 21.1655,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
      style={styles.map}
    />
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
});

export default Map;
