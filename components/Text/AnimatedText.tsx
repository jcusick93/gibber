import React, { useEffect, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

interface AnimatedTextProps {
  text: string;
  style?: any;
  duration?: number;
  delay?: number;
  onFinish?: () => void;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  style,
  duration = 300,
  delay = 50,
  onFinish,
}) => {
  const [words, setWords] = useState<string[]>([]);
  const [animations, setAnimations] = useState<Animated.Value[]>([]);

  useEffect(() => {
    const wordArray = text.trim().split(" ");
    setWords(wordArray);

    // Create animations for each word
    const newAnimations = wordArray.map(() => new Animated.Value(0));
    setAnimations(newAnimations);
  }, [text]);

  useEffect(() => {
    if (animations.length === 0) return;

    // Animate words in with overlapping stagger and natural easing
    const animationsToRun = animations.map((animation, index) => {
      return Animated.timing(animation, {
        toValue: 1,
        duration,
        delay: index * (delay * 0.3),
        easing: Easing.out(Easing.cubic), // Natural deceleration
        useNativeDriver: true,
      });
    });

    // Start all animations
    Animated.parallel(animationsToRun).start(() => {
      onFinish?.();
    });
  }, [animations, duration, delay, onFinish]);

  if (words.length === 0) return null;

  return (
    <View style={styles.container}>
      {words.map((word, index) => {
        const animation = animations[index];
        if (!animation) return null;

        return (
          <Animated.Text
            key={`${word}-${index}`}
            style={[
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
