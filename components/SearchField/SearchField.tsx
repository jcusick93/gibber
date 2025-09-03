import { searchTerms, Term } from "@/constants/terms";
import { tokens } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StyledText } from "../Text/StyledText";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

interface SearchFieldProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onTermSelect?: (term: Term) => void;
  placeholder?: string;
  selectedTermId?: string | null; // Add this prop
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value: controlledValue,
  onChangeText,
  onTermSelect,
  placeholder = "Type something...",
  selectedTermId: externalSelectedTermId, // Add this parameter
}) => {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Term[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [pillAnimations, setPillAnimations] = useState<Animated.Value[]>([]);

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Use external selectedTermId if provided, otherwise use internal state
  const currentSelectedTermId =
    externalSelectedTermId !== undefined
      ? externalSelectedTermId
      : selectedTermId;

  // Update suggestions when value changes, filtering out selected term
  useEffect(() => {
    const filteredTerms = searchTerms(value);
    const filteredSuggestions = filteredTerms.filter(
      (term) => term.id !== currentSelectedTermId // Use the current selected term ID
    );
    // Sort alphabetically by term name
    const sortedSuggestions = filteredSuggestions.sort((a, b) =>
      a.term.toLowerCase().localeCompare(b.term.toLowerCase())
    );
    setSuggestions(sortedSuggestions.slice(0, 12)); // Limit to 12 suggestions
  }, [value, currentSelectedTermId]); // Update dependency

  // Create animations for pills when suggestions change
  useEffect(() => {
    const newAnimations = suggestions.map(() => new Animated.Value(0));
    setPillAnimations(newAnimations);

    // Animate pills in with stagger
    newAnimations.forEach((animation, index) => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 200,
        delay: index * 50, // 80ms stagger for subtle overlap
        useNativeDriver: true,
      }).start();
    });
  }, [suggestions.length]);

  const handleTextChange = (text: string) => {
    if (controlledValue !== undefined) {
      // Controlled mode - call parent's onChangeText
      onChangeText?.(text);
    } else {
      // Uncontrolled mode - update internal state
      setInternalValue(text);
    }
  };

  const handleSuggestionPress = (term: Term) => {
    // Add haptic feedback
    Haptics.selectionAsync(); // The "click" when selecting
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); // The "thud" when confirming

    const termText = term.term;

    if (controlledValue !== undefined) {
      // Controlled mode - call parent's onChangeText
      onChangeText?.(termText);
    } else {
      // Uncontrolled mode - update internal state
      setInternalValue(termText);
    }

    // Set the selected term ID to filter it out
    setSelectedTermId(term.id);

    // Notify parent of term selection
    onTermSelect?.(term);
  };

  const handleClear = () => {
    if (controlledValue !== undefined) {
      // Controlled mode - call parent's onChangeText
      onChangeText?.("");
    } else {
      // Uncontrolled mode - update internal state
      setInternalValue("");
    }

    // Clear the selected term when clearing input
    setSelectedTermId(null);
    Haptics.selectionAsync();
  };

  return (
    <View style={styles.container}>
      {/* Search Input Section */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={value}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            placeholderTextColor={tokens.color.text.primary}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            multiline={false}
            autoCapitalize="sentences"
            autoCorrect={false}
          />
          {/* Clear button with Expo icon */}
          {value.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons
                name="close-circle"
                size={24}
                color="rgba(120, 120, 128, 0.8)"
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Bottom border */}
        <View style={styles.inputBorder} />
      </View>

      {/* Suggestions Section - Always show title */}
      <View style={styles.suggestionsContainer}>
        {/* <Text style={styles.suggestionsTitle}>SUGGESTIONS</Text> */}
        <StyledText variant="overline">Suggestions</StyledText>
        {suggestions.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsScrollContent}
            style={styles.suggestionsScrollView}
          >
            {suggestions.map((term, index) => {
              const animation = pillAnimations[index];
              if (!animation) return null;

              const animatedStyle = {
                opacity: animation,
                transform: [
                  {
                    scale: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                  {
                    translateY: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [10, 0],
                    }),
                  },
                ],
              };

              return (
                // chips
                <AnimatedBlurView
                  key={term.id}
                  style={{
                    backgroundColor: tokens.color.background.darken,
                    overflow: "hidden",
                    borderRadius: 8,
                    padding: 4,
                    filter: "blur(2px)",
                    backdropFilter: "blur(2px)",
                    ...animatedStyle,
                  }}
                  intensity={50}
                  tint="dark"
                >
                  <TouchableOpacity
                    style={styles.suggestionPill}
                    onPress={() => handleSuggestionPress(term)}
                  >
                    <Text style={styles.suggestionText}>{term.term}</Text>
                  </TouchableOpacity>
                </AnimatedBlurView>
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
  inputContainer: {
    height: 56,
    justifyContent: "flex-start",
    paddingBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    fontFamily: tokens.text.input.fontFamily,
    fontSize: tokens.text.input.fontSize,
    fontWeight: tokens.text.input.fontWeight as any,
    color: tokens.color.text.primary,
    flex: 1,
    padding: 0,
    margin: 0,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  inputBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 0.33,
    backgroundColor: tokens.color.border.primary,
  },
  suggestionsContainer: {
    gap: 16,
  },

  suggestionsScrollView: {
    flexGrow: 0,
    paddingHorizontal: 16,
    marginHorizontal: -16,
  },
  suggestionsScrollContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingRight: 32, // Extra padding to account for the bleed
  },
  suggestionPill: {
    // backgroundColor: "rgba(120, 120, 128, 0.24)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0, // Prevent pills from shrinking
  },
  suggestionText: {
    fontSize: 15,
    fontFamily: "System",
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 20,
    letterSpacing: -0.23,
  },
  clearButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
