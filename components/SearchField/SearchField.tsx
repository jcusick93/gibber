import { tokens } from "@/constants/tokens";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface SearchFieldProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  suggestions?: string[];
  onSuggestionPress?: (suggestion: string) => void;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value: controlledValue,
  onChangeText,
  placeholder = "Type something...",
  suggestions = ["Bussin'", "Hype", "Mogging"],
  onSuggestionPress,
}) => {
  const [internalValue, setInternalValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // Use controlled value if provided, otherwise use internal state
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleTextChange = (text: string) => {
    if (controlledValue !== undefined) {
      // Controlled mode - call parent's onChangeText
      onChangeText?.(text);
    } else {
      // Uncontrolled mode - update internal state
      setInternalValue(text);
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    if (controlledValue !== undefined) {
      // Controlled mode - call parent's onChangeText
      onChangeText?.(suggestion);
    } else {
      // Uncontrolled mode - update internal state
      setInternalValue(suggestion);
    }
    onSuggestionPress?.(suggestion);
  };

  const handleClear = () => {
    if (controlledValue !== undefined) {
      // Controlled mode - call parent's onChangeText
      onChangeText?.("");
    } else {
      // Uncontrolled mode - update internal state
      setInternalValue("");
    }
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
      </View>

      {/* Suggestions Section */}
      <View style={styles.suggestionsContainer}>
        <Text style={styles.suggestionsTitle}>SUGGESTIONS</Text>
        <View style={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionPill}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    justifyContent: "flex-start",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: tokens.color.border.lowContrast,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  textInput: {
    fontSize: tokens.text.input.fontSize,
    lineHeight: tokens.text.input.lineHeight,
    color: tokens.color.text.highContrast,
    fontWeight: tokens.text.input.fontWeight as any,
    fontFamily: "System",
    flex: 1,
    letterSpacing: -0.43,

    padding: 0,
    margin: 0,
    paddingTop: 12,
    paddingBottom: 12,
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
  suggestionsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    alignItems: "center",
  },
  suggestionPill: {
    backgroundColor: "rgba(120, 120, 128, 0.24)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
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
