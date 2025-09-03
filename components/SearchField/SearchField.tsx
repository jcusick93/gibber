import { searchTerms, Term, terms } from "@/constants/terms";
import { tokens } from "@/constants/tokens";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { XCircleIcon } from "phosphor-react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
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
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize animation config to prevent recreation on every render
  const animationConfig = useMemo(
    () => ({
      duration: 300,
      delay: 50,
      easing: Easing.out(Easing.cubic),
    }),
    []
  );

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // Use external selectedTermId if provided, otherwise use internal state
  const currentSelectedTermId =
    externalSelectedTermId !== undefined
      ? externalSelectedTermId
      : selectedTermId;

  // Update suggestions when value changes, filtering out selected term
  useEffect(() => {
    let suggestionsToShow: Term[] = [];

    // Check if the current value matches the selected term
    const selectedTerm = currentSelectedTermId
      ? terms.find((term) => term.id === currentSelectedTermId)
      : null;
    const isShowingSelectedTerm =
      selectedTerm && value.toLowerCase() === selectedTerm.term.toLowerCase();

    if (value.trim() === "" || isShowingSelectedTerm) {
      // If no search value OR showing the selected term, show related terms
      if (currentSelectedTermId && selectedTerm?.related) {
        // Get related terms
        const relatedTerms = selectedTerm.related
          .map((relatedId) => terms.find((term) => term.id === relatedId))
          .filter((term): term is Term => term !== undefined);

        suggestionsToShow = relatedTerms;
      }

      // If no related terms or no selected term, show default suggestions
      if (suggestionsToShow.length === 0) {
        const defaultSuggestions = [
          "bussin",
          "hype",
          "mogging",
          "cap",
          "bet",
          "fire",
        ];
        suggestionsToShow = defaultSuggestions
          .map((id) => terms.find((term) => term.id === id))
          .filter((term): term is Term => term !== undefined);
      }
    } else {
      // If there's a different search value, show search results
      const filteredTerms = searchTerms(value);
      suggestionsToShow = filteredTerms.filter(
        (term) => term.id !== currentSelectedTermId
      );
      // Sort alphabetically by term name
      suggestionsToShow = suggestionsToShow.sort((a, b) =>
        a.term.toLowerCase().localeCompare(b.term.toLowerCase())
      );
    }

    setSuggestions(suggestionsToShow.slice(0, 12)); // Limit to 12 suggestions
  }, [value, currentSelectedTermId]);

  // Create animations for pills when suggestions change
  useEffect(() => {
    // Only animate if there's a value (not when clearing)
    const shouldAnimate = value.trim().length > 0;

    if (!shouldAnimate) {
      // When clearing, don't update animations if we already have the right number
      // This prevents unnecessary re-renders when clearing
      if (pillAnimations.length === suggestions.length) {
        return;
      }
      // Only create new animations if the count changed
      const staticAnimations = suggestions.map(() => new Animated.Value(1));
      setPillAnimations(staticAnimations);
      return;
    }

    // Create new animations for the entire array and animate them in
    const newAnimations = suggestions.map(() => new Animated.Value(0));
    setPillAnimations(newAnimations);

    // Animate all pills in with stagger
    newAnimations.forEach((animation, index) => {
      Animated.timing(animation, {
        toValue: 1,
        duration: animationConfig.duration,
        delay: index * animationConfig.delay,
        easing: animationConfig.easing,
        useNativeDriver: true,
      }).start();
    });
  }, [suggestions, currentSelectedTermId, animationConfig, value]);

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
    Haptics.selectionAsync();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const termText = term.term;

    // Update the search field with the selected term
    if (controlledValue !== undefined) {
      // Controlled mode - call parent's onChangeText
      onChangeText?.(termText);
    } else {
      // Uncontrolled mode - update internal state
      setInternalValue(termText);
    }

    // Set the selected term ID to filter it out
    setSelectedTermId(term.id);

    // Call the parent's onTermSelect callback
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
              <XCircleIcon
                color={tokens.color.text.primary}
                weight="duotone"
                size={24}
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
                ],
              };

              // Check if this is the selected term
              const isSelected = term.id === currentSelectedTermId;

              return (
                <AnimatedBlurView
                  key={term.id}
                  style={{
                    backgroundColor: tokens.color.background.darken,
                    overflow: "hidden",
                    borderRadius: 8,
                    padding: 4,
                    ...animatedStyle,
                  }}
                  intensity={8}
                  tint="dark"
                >
                  <TouchableOpacity
                    onPress={() => handleSuggestionPress(term)}
                    style={styles.pillButton}
                    activeOpacity={0.7}
                  >
                    <StyledText variant="action">{term.term}</StyledText>
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
  pillButton: {
    // backgroundColor: "rgba(120, 120, 128, 0.24)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0, // Prevent pills from shrinking
  },
  pillText: {
    fontSize: 15,
    fontFamily: "System",
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.7)",
    lineHeight: 20,
    letterSpacing: -0.23,
  },
  textBlur: {
    borderRadius: 4,
    padding: 2,
  },
  clearButton: {
    alignItems: "center",
    justifyContent: "center",
  },
});
