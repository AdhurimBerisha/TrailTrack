import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/Spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import { layout, colors, spacing } from "../theme";

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.screen}>
      <Text style={styles.title}>Account</Text>
      <Text style={styles.subtitle}>Manage preferences and sign out</Text>
      <Spacer>
        <Button title="Sign Out" onPress={signout} />
      </Spacer>
    </SafeAreaView>
  );
};

// title and icon handled by v6 tab options in App.js

const styles = StyleSheet.create({
  screen: {
    ...layout.screen,
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: 38,
    color: colors.textPrimary,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: spacing.lg,
  },
});

export default AccountScreen;
