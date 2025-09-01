import { tokens } from "@/constants/tokens";
import { StyleSheet, Text, TextProps } from "react-native";

// props for the StyledText
interface StyledTextProps extends TextProps {
  children: React.ReactNode;
  variant?: "display" | "input" | "overline" | "body-small" | "body-large";
}

export const StyledText: React.FC<StyledTextProps> = ({
  children,
  variant = "body-large",
  ...rest
}) => {
  const variantStyle = variant
    ? variantStyles[variant as keyof typeof variantStyles]
    : {};

  return <Text style={variantStyle}>{children}</Text>;
};

const variantStyles = StyleSheet.create({
  display: {
    color: tokens.color.text.highContrast,
    fontSize: tokens.text.display.fontSize,
    fontFamily: tokens.text.display.fontFamily,
    lineHeight: tokens.text.display.lineHeight,
    fontWeight: tokens.text.display.fontWeight as any,
    letterSpacing: tokens.text.display.letterSpacing,
  },
  input: {
    fontSize: 16,
  },
  overline: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  "body-small": {
    fontSize: 14,
    color: tokens.color.text.highContrast,
    fontWeight: "normal",
  },
  "body-large": {
    color: tokens.color.text.highContrast,
    fontSize: tokens.text.bodyLarge.fontSize,
    fontFamily: tokens.text.bodyLarge.fontFamily,
    lineHeight: tokens.text.bodyLarge.lineHeight,
    fontWeight: tokens.text.bodyLarge.fontWeight as any,
    letterSpacing: tokens.text.bodyLarge.letterSpacing,
  },
});
