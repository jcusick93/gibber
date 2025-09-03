import { tokens } from "@/constants/tokens";
import { StyleSheet, Text, TextProps } from "react-native";

// props for the StyledText
interface StyledTextProps extends TextProps {
  children: React.ReactNode;
  variant?:
    | "display"
    | "input"
    | "overline"
    | "bodySmall"
    | "bodyLarge"
    | "action";
}

export const StyledText: React.FC<StyledTextProps> = ({
  children,
  variant = "body-large",
  ...rest
}) => {
  const variantStyle = variant
    ? variantStyles[variant as keyof typeof variantStyles]
    : {};

  return (
    <Text style={variantStyle} {...rest}>
      {children}
    </Text>
  );
};

const variantStyles = StyleSheet.create({
  display: {
    color: tokens.color.text.secondary,
    fontSize: tokens.text.display.fontSize,
    fontFamily: tokens.text.display.fontFamily,
    lineHeight: tokens.text.display.lineHeight,
    letterSpacing: tokens.text.display.letterSpacing,
  },
  input: {
    color: tokens.color.text.primary,
    fontFamily: tokens.text.input.fontFamily,
    lineHeight: tokens.text.input.lineHeight,
    fontWeight: tokens.text.input.fontWeight as any,
    fontSize: tokens.text.input.fontSize,
  },
  overline: {
    fontFamily: tokens.text.overline.fontFamily,
    fontSize: tokens.text.overline.fontSize,
    lineHeight: tokens.text.overline.lineHeight,
    color: tokens.color.text.primary,
    letterSpacing: tokens.text.overline.letterSpacing,
  },
  bodySmall: {
    fontSize: tokens.text.bodySmall.fontSize,
    fontFamily: tokens.text.bodySmall.fontFamily,
    color: tokens.color.text.highContrast,
  },
  bodyLarge: {
    color: tokens.color.text.highContrast,
    fontSize: tokens.text.bodyLarge.fontSize,
    fontFamily: tokens.text.bodyLarge.fontFamily,
    lineHeight: tokens.text.bodyLarge.lineHeight,
  },
});
