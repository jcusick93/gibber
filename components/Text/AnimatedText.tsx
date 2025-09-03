import { tokens } from "@/constants/tokens";
import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

interface AnimatedTextProps {
  children: React.ReactNode;
  variant?: "display" | "bodyLarge";
  style?: any;
  duration?: number;
  delay?: number;
  onFinish?: () => void;
}

// Helper function to extract text from React children
const extractTextFromChildren = (children: React.ReactNode): string => {
  if (typeof children === "string") {
    return children;
  }

  if (typeof children === "number") {
    return children.toString();
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }

  if (React.isValidElement(children)) {
    return extractTextFromChildren((children.props as any).children);
  }

  return "";
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  variant = "body-large",
  style,
  duration = 300,
  delay = 50,
  onFinish,
}) => {
  const [words, setWords] = useState<string[]>([]);
  const [animations, setAnimations] = useState<Animated.Value[]>([]);
  const [lastText, setLastText] = useState<string>("");

  useEffect(() => {
    const text = extractTextFromChildren(children);
    if (text !== lastText) {
      setLastText(text);
      const wordArray = text.trim().split(" ");
      setWords(wordArray);
      const newAnimations = wordArray.map(() => new Animated.Value(0));
      setAnimations(newAnimations);
    }
  }, [children, lastText]);

  useEffect(() => {
    if (animations.length === 0) return;

    const animationsToRun = animations.map((animation, index) => {
      return Animated.timing(animation, {
        toValue: 1,
        duration,
        delay: index * (delay * 0.3),
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      });
    });

    Animated.parallel(animationsToRun).start(() => {
      onFinish?.();
    });
  }, [animations, duration, delay, onFinish]);

  if (words.length === 0) return null;

  // Get variant styles from tokens
  const variantStyles =
    variant === "display"
      ? {
          color: tokens.color.text.secondary,
          fontSize: tokens.text.display.fontSize,
          fontFamily: tokens.text.display.fontFamily,
          lineHeight: tokens.text.display.lineHeight,
          letterSpacing: tokens.text.display.letterSpacing,
          fontWeight: tokens.text.display.fontWeight,
        }
      : {
          fontFamily: tokens.text.bodyLarge.fontFamily,
          color: tokens.color.text.neutralHigh,
          fontSize: tokens.text.bodyLarge.fontSize,
          lineHeight: tokens.text.bodyLarge.lineHeight,
        };

  return (
    <View style={styles.container}>
      {words.map((word, index) => {
        const animation = animations[index];
        if (!animation) return null;

        return (
          <Animated.Text
            key={`${word}-${index}`}
            style={[
              variantStyles,
              style,
              {
                opacity: animation,
                transform: [
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            {word}
            {index < words.length - 1 ? " " : ""}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
