import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import { layout, spacing } from "../theme";

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign Up for TrailTrack"
        errorMessage={state.errorMessage}
        submitButtonText="Sign Up"
        onSubmit={({ email, password }) => signup({ email, password })}
      />
      <NavLink
        routeName="Signin"
        text="Already have an account? Sign in instead"
      />
    </View>
  );
};

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;
