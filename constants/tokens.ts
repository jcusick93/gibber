import { fontNames } from "./fonts";
const bodyMultiplier = 1.5;
const titleMultiplier = 1.2;

export const tokens = {
  // text styles
  text: {
    // the main word on the screen
    display: {
      fontFamily: fontNames.bold,
      fontSize: 48,
      lineHeight: 56,
      fontWeight: 700,
      letterSpacing: 1,
    },
    // used for the text input
    input: {
      fontFamily: fontNames.medium,
      fontSize: 32,
      fontWeight: 500,
      lineHeight: 40,
      letterSpacing: 0,
    },

    // large chunks of text
    bodyLarge: {
      fontFamily: fontNames.regular,
      fontSize: 24,
      lineHeight: 24 * bodyMultiplier,
    },
    // captions
    bodySmall: {
      fontFamily: fontNames.regular,
      fontSize: 16,
      lineHeight: 24, // 16 * 1.5
      fontWeight: 400,
      letterSpacing: 0,
    },
    // interactive components like chips
    action: {
      fontFamily: fontNames.bold,
      fontSize: 16,
      lineHeight: 24, // 16 * 1.5
      fontWeight: 700,
      letterSpacing: 0,
    },
    // secondary info like a badge or subtitle
    overline: {
      fontFamily: fontNames.regular,
      fontSize: 15,
      lineHeight: 20,
      fontWeight: 400,
      letterSpacing: 1,
    },
  },
  // colors
  color: {
    // Text colors
    text: {
      primary: "rgba(255, 102, 255, 1)", // Pink/magenta for main text
      secondary: "rgba(52, 255, 255, 1)", // Cyan for secondary text
      tertiary: "rgba(153, 255, 50, 1)", // Green for tertiary text
      neutralHigh: "rgba(255, 255, 255, 1)", // White for high contrast text
      highContrast: "rgba(255, 255, 255, 1)",
      mediumContrast: "rgba(255, 255, 255, 0.8)",
      lowContrast: "rgba(255, 255, 255, 0.5)",
      placeholder: "rgba(255, 255, 255, 0.3)",
    },
    // Background colors
    background: {
      app: "rgba(16, 18, 26, 1)", // Main app background
      container: "rgba(20, 29, 44, 1)", // Card/container background
      primary: "rgba(255, 102, 255, 0.12)", // Pink background with opacity
      secondary: "rgba(52, 255, 255, 0.12)", // Cyan background with opacity
      tertiary: "rgba(153, 255, 50, 0.12)", // Green background with opacity
      darken: "rgba(0, 0, 0, 0.3)", // Dark overlay for buttons
    },
    // Border colors
    border: {
      primary: "rgba(255, 102, 255, 0.6)", // Pink border
      secondary: "rgba(52, 255, 255, 0.6)", // Cyan border
      tertiary: "rgba(153, 255, 50, 0.6)", // Green border
      neutralHigh: "rgba(255, 255, 255, 0.6)", // White border
      // lowContrast: "rgba(255, 255, 255, 0.2)",
    },
  },
};
