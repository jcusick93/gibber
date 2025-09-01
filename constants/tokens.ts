const titleMultiplier = 1.2;
const bodyMultiplier = 1.5;

export const tokens = {
  // text styles
  text: {
    display: {
      fontFamily: "System",
      fontStyle: "normal",
      fontSize: 48,
      lineHeight: 48 * titleMultiplier,
      fontWeight: 800,
      letterSpacing: 0.4,
    },
    overline: {},
    input: {},
    bodyLarge: {
      fontFamily: "System", // SF Pro on iOS
      fontSize: 24,
      lineHeight: 24 * bodyMultiplier,
      fontStyle: "normal",
      fontWeight: 300,
      letterSpacing: -0.4,
    },
  },
  // colors
  color: {
    text: {
      highContrast: "rgba(255, 255, 255, 1)",
      mediumContrast: "rgba(255, 255, 255, 0.8)",
      lowContrast: "rgba(255, 255, 255, 0.5)",
      placeholder: "rgba(255, 255, 255, 0.3)",
    },
  },
};
