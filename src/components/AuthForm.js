import { useState } from "react";
import { Text, Button, Input } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import Spacer from "./Spacer";
import { colors, spacing } from "../theme";

const AuthForm = ({ headerText, errorMessage, onSubmit, submitButtonText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Spacer>
        <View style={styles.headerWrap}>
          <Text h3 style={styles.header}>
            {headerText}
          </Text>
          <Text style={styles.subheader}>
            Track your runs and hikes effortlessly
          </Text>
        </View>
      </Spacer>
      <Input
        leftIcon={{
          name: "mail",
          type: "feather",
          color: colors.textSecondary,
        }}
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoComplete="none"
        keyboardType="email-address"
      />
      <Spacer />
      <Input
        leftIcon={{
          name: "lock",
          type: "feather",
          color: colors.textSecondary,
        }}
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoComplete="none"
      />
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ email, password })}
        />
      </Spacer>
    </>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    gap: 6,
  },
  header: {
    color: colors.textPrimary,
  },
  subheader: {
    color: colors.textSecondary,
  },
  errorMessage: {
    fontSize: 16,
    color: colors.error,
    marginLeft: spacing.md,
    marginTop: spacing.md,
  },
});

export default AuthForm;
