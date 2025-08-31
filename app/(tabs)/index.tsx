import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const slangTerms = [
    "bussin",
    "lit",
    "slay",
    "cap",
    "no cap",
    "fr",
    "lowkey",
    "highkey",
    "sus",
    "vibe",
    "mood",
    "tea",
    "shade",
    "snatched",
    "bet",
  ];

  const filteredTerms = slangTerms.filter((term) =>
    term.toLowerCase().includes(query.toLowerCase())
  );

  const handleItemSelect = (item: string) => {
    setSelectedTerm(item);
    setQuery(item);
    setIsFocused(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={{ color: "white", marginBottom: 10 }}>
          Focus state: {isFocused.toString()}
        </Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a slang term..."
            placeholderTextColor={colors.placeholder}
            value={query}
            onChangeText={setQuery}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                setQuery("");
                setSelectedTerm("");
              }}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {isFocused && (
          <View style={styles.dropdownContainer}>
            <Text style={{ color: "white", padding: 10 }}>
              Debug: focused={isFocused.toString()}, items=
              {filteredTerms.length}
            </Text>
            <FlatList
              data={filteredTerms}
              keyExtractor={(item) => item}
              style={styles.dropdownList}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => handleItemSelect(item)}
                  style={styles.dropdownItem}
                  activeOpacity={0.7}
                >
                  <Text style={styles.dropdownText}>{item}</Text>
                  {index < filteredTerms.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </TouchableOpacity>
              )}
            />
            {selectedTerm && (
              <View style={styles.selectedContainer}>
                <Text style={styles.selectedText}>
                  Selected: {selectedTerm}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const colors = {
  backgroundBaseline: "black",
  backgroundRaised: "rgba(255, 255, 255, 0.1)",
  text: "white",
  placeholder: "rgba(255, 255, 255, 0.5)",
  borderColor: "rgba(255, 255, 255, 0.2)",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundBaseline,
    padding: 20,
  },
  inputContainer: {
    position: "relative",
    zIndex: 1,
    backgroundColor: "transparent",
    paddingVertical: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
  },
  textInput: {
    flex: 1,
    backgroundColor: "transparent",
    fontSize: 17,
    color: colors.text,
  },
  clearButton: {
    height: 24,
    width: 24,
  },
  clearButtonText: {
    fontSize: 20,
    color: "white",
  },
  dropdownContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: colors.backgroundRaised,
    marginTop: 8,
    zIndex: 999,
    borderRadius: 12,
    overflow: "hidden",
  },
  dropdownList: {
    maxHeight: 300,
  },
  dropdownItem: {
    minHeight: 40,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  dropdownText: {
    fontSize: 17,
    lineHeight: 20,

    color: colors.text,
    padding: 16,
  },
  selectedContainer: {
    zIndex: -1,
  },
  selectedText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.borderColor,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 16,
    // right: 0,
  },
});
