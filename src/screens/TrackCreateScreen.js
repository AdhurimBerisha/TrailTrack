import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";
import { layout, spacing, colors } from "../theme";

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [err] = useLocation(isFocused || recording, callback);

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.screen}>
      <View style={styles.headerWrap}>
        <Text h2 style={styles.header}>
          Create a Track
        </Text>
        <Text style={styles.subtitle}>Record your path and save it</Text>
      </View>
      <Map />
      {err ? (
        <Text style={styles.error}>Please enable location services</Text>
      ) : null}
      <TrackForm />
    </SafeAreaView>
  );
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <FontAwesome name="plus" size={20} color="#fff" />,
};

const styles = StyleSheet.create({
  screen: {
    ...layout.screen,
    paddingHorizontal: spacing.lg,
  },
  headerWrap: {
    marginBottom: spacing.md,
  },
  header: {
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  error: {
    color: colors.error,
    marginVertical: spacing.sm,
  },
});

export default withNavigationFocus(TrackCreateScreen);
