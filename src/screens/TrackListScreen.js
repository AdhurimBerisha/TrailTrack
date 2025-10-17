import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import { ListItem } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { colors, spacing, radius, shadows, layout } from "../theme";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  return (
    <View style={styles.screen}>
      <NavigationEvents onWillFocus={fetchTracks} />
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <View style={styles.card}>
                <ListItem containerStyle={styles.listItem}>
                  <ListItem.Content key={`content-${item._id}`}>
                    <ListItem.Title style={styles.title}>
                      {item.name}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitle}>
                      Tap to view details
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron
                    key={`chevron-${item._id}`}
                    color={colors.textSecondary}
                  />
                </ListItem>
              </View>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={styles.listContent}
        style={styles.list}
      />
    </View>
  );
};

TrackListScreen.navigationOptions = {
  title: "Tracks",
  headerStyle: { backgroundColor: colors.surface },
  headerTintColor: colors.textPrimary,
  headerTitleStyle: { color: colors.textPrimary },
};

const styles = StyleSheet.create({
  screen: {
    ...layout.screen,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: spacing.lg,
    paddingTop: spacing.lg,
  },
  card: {
    marginBottom: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadows.card,
  },
  listItem: {
    backgroundColor: "transparent",
  },
  title: {
    color: colors.textPrimary,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 2,
  },
});

export default TrackListScreen;
