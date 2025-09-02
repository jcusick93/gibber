import { SearchField } from "@/components/SearchField";
import { AnimatedText } from "@/components/Text/AnimatedText";
import { Term } from "@/constants/terms";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);

  const handleTermSelect = (term: Term) => {
    setSelectedTerm(term);
  };

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar style="auto" />

      {/* header */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: 16,
          zIndex: 999,
          backgroundColor: "rgba(0,0,0,.9)",
          backdropFilter: "blur(100px)",
        }}
      >
        <SearchField
          placeholder="Search a term..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onTermSelect={handleTermSelect}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {selectedTerm && (
          <>
            <AnimatedText
              text={selectedTerm.term}
              style={styles.titleText}
              duration={500}
              delay={25}
            />
            <AnimatedText
              text={selectedTerm.definition}
              style={styles.definitionText}
              duration={450}
              delay={20}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 172, // Scroll bar appears under header
    paddingBottom: 32,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titleText: {
    fontSize: 48,
    lineHeight: 58,
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "System",
    fontWeight: "800",
    letterSpacing: 0.4,
    marginBottom: 16,
  },
  definitionText: {
    fontSize: 24,
    lineHeight: 36,
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "System",
    fontWeight: "300",
    letterSpacing: -0.4,
  },
});
