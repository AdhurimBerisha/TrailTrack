import React, { useContext } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { Context } from "../context/AuthContext";
import { colors, layout, spacing } from "../theme";

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  useFocusEffect(
    React.useCallback(() => {
      clearErrorMessage();
      return () => {};
    }, [clearErrorMessage])
  );

  return (
    <View style={styles.container}>
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Don't have an account? Sign up instead"
        routeName="Signup"
      />
    </View>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({
  container: {
    ...layout.screen,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
    paddingBottom: 250,
  },
});

export default SigninScreen;
