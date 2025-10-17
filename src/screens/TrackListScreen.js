import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { Context as TrackContext } from "../context/TrackContext";
import { colors, spacing, radius, shadows, layout } from "../theme";

const TrackListScreen = ({ navigation }) => {
  const { state, fetchTracks } = useContext(TrackContext);

  useFocusEffect(
    React.useCallback(() => {
      fetchTracks();
      return () => {};
    }, [fetchTracks])
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("TrackDetail", { _id: item._id })
              }
            >
              <View style={styles.card}>
                <View style={styles.row}>
                  <View style={styles.textWrapper}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>Tap to view details</Text>
                  </View>
                  <FontAwesome
                    name="chevron-right"
                    size={18}
                    color={colors.textSecondary}
                  />
                </View>
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

// v6 options are configured in navigators

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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    backgroundColor: "transparent",
  },
  textWrapper: {
    flexShrink: 1,
    paddingRight: spacing.md,
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
