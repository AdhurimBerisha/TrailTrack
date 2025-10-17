// Centralized theme for TrailTrack
export const colors = {
  primary: "#0E7C86",
  primaryDark: "#0A5960",
  background: "#0B0F14",
  surface: "#121821",
  card: "#16202B",
  textPrimary: "#E6EEF5",
  textSecondary: "#A3B1C2",
  accent: "#F2B705",
  error: "#FF6B6B",
  success: "#2ECC71",
  border: "#263241",
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 28,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const shadows = {
  card: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
};

export const rneTheme = {
  colors: {
    primary: colors.primary,
    secondary: colors.accent,
    error: colors.error,
  },
  Text: {
    style: { color: colors.textPrimary },
  },
  Input: {
    inputStyle: { color: colors.textPrimary },
    placeholderTextColor: colors.textSecondary,
    inputContainerStyle: {
      backgroundColor: colors.surface,
      borderBottomWidth: 0,
      paddingHorizontal: spacing.sm,
      borderRadius: radius.md,
    },
    containerStyle: { paddingHorizontal: 0 },
    labelStyle: { color: colors.textSecondary, marginBottom: spacing.xs },
  },
  Button: {
    buttonStyle: { borderRadius: radius.md, paddingVertical: spacing.sm },
    titleStyle: { fontWeight: "600" },
  },
  ListItem: {
    containerStyle: { backgroundColor: colors.card, borderRadius: radius.md },
  },
};

export const layout = {
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderColor: colors.border,
    borderWidth: 1,
  },
};

export default rneTheme;
