import { searchTerms, Term } from "@/constants/terms";
import { tokens } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
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

interface SearchFieldProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onTermSelect?: (term: Term) => void;
  placeholder?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value: controlledValue,
  onChangeText,
  onTermSelect,
  placeholder = "Type something...",
}) => {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<Term[]>([]);
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  const [pillAnimations, setPillAnimations] = useState<Animated.Value[]>([]);

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Update suggestions when value changes, filtering out selected term
  useEffect(() => {
    const filteredTerms = searchTerms(value);
    const filteredSuggestions = filteredTerms.filter(
      (term) => term.id !== selectedTermId
    );
    setSuggestions(filteredSuggestions.slice(0, 12)); // Limit to 12 suggestions
  }, [value, selectedTermId]);

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
            placeholderTextColor={tokens.color.text.placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            multiline={false}
            autoCapitalize="none"
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
        <Text style={styles.suggestionsTitle}>SUGGESTIONS</Text>
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
                <Animated.View key={term.id} style={animatedStyle}>
                  <TouchableOpacity
                    style={styles.suggestionPill}
                    onPress={() => handleSuggestionPress(term)}
                  >
                    <Text style={styles.suggestionText}>{term.term}</Text>
                  </TouchableOpacity>
                </Animated.View>
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
    fontSize: 32,
    lineHeight: 40,
    flex: 1,
    letterSpacing: -0.43,
    fontFamily: "System",
    fontWeight: "400",
    color: tokens.color.text.highContrast,
    padding: 0,
    margin: 0,
    textAlignVertical: "center",
  },
  inputBorder: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 0.33,
    backgroundColor: "rgba(84, 84, 86, 0.6)",
  },
  suggestionsContainer: {
    gap: 16,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontFamily: "System",
    fontWeight: "600",
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 19.2,
  },
  suggestionsScrollView: {
    flexGrow: 0,
    marginRight: -16, // Bleed off the right side
  },
  suggestionsScrollContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    paddingRight: 32, // Extra padding to account for the bleed
  },
  suggestionPill: {
    backgroundColor: "rgba(120, 120, 128, 0.24)",
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
