import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ThemeProvider } from "react-native-elements";
import rneTheme, { colors } from "./src/theme";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { navigationRef } from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";
import { FontAwesome } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TrackListStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.textPrimary,
      contentStyle: { backgroundColor: colors.background },
    }}
  >
    <Stack.Screen
      name="TrackList"
      component={TrackListScreen}
      options={{ title: "Tracks" }}
    />
    <Stack.Screen name="TrackDetail" component={TrackDetailScreen} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.surface },
      headerTintColor: colors.textPrimary,
      tabBarActiveTintColor: "#fff",
      tabBarInactiveTintColor: "#fff",
      tabBarStyle: { backgroundColor: colors.surface },
    }}
  >
    <Tab.Screen
      name="Tracks"
      component={TrackListStack}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="th-list" color={color} size={size ?? 20} />
        ),
      }}
    />
    <Tab.Screen
      name="TrackCreate"
      component={TrackCreateScreen}
      options={{
        title: "Add Track",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="plus" color={color} size={size ?? 20} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="gear" color={color} size={size ?? 20} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default () => {
  return (
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <ThemeProvider theme={rneTheme}>
            <NavigationContainer ref={navigationRef}>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="ResolveAuth"
                  component={ResolveAuthScreen}
                />
                <Stack.Screen name="loginFlow">
                  {() => (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="Signup" component={SignupScreen} />
                      <Stack.Screen name="Signin" component={SigninScreen} />
                    </Stack.Navigator>
                  )}
                </Stack.Screen>
                <Stack.Screen name="mainFlow" component={MainTabs} />
              </Stack.Navigator>
            </NavigationContainer>
          </ThemeProvider>
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  );
};
