import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Spacer from "./Spacer";
import { colors } from "../theme";

const NavLink = ({ text, routeName }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Spacer>
        <Text style={styles.link}>{text}</Text>
      </Spacer>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    color: colors.accent,
    fontWeight: "600",
  },
});

export default NavLink;
