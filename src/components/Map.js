import React, { useContext } from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";
import { colors, radius, shadows } from "../theme";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  const initialLocation = {
    longitude: -122.0312186,
    latitude: 37.33233141,
  };

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }

  return (
    <View style={styles.mapWrap}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...initialLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Circle
          center={currentLocation.coords}
          radius={30}
          strokeColor="rgba(14,124,134,0.9)"
          fillColor="rgba(14,124,134,0.25)"
        />
        <Polyline
          strokeColor={colors.accent}
          strokeWidth={3}
          coordinates={locations.map((loc) => loc.coords)}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapWrap: {
    borderRadius: radius.lg,
    overflow: "hidden",
    ...shadows.card,
  },
  map: {
    height: 300,
  },
});

export default Map;
