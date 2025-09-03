import { BodyView } from "@/components/Body/BodyView";
import { Header } from "@/components/Header/Header";
import { SearchField } from "@/components/SearchField";
import { AnimatedText } from "@/components/Text/AnimatedText";
import { fontConfig } from "@/constants/fonts";
import { Term, terms } from "@/constants/terms";
import { tokens } from "@/constants/tokens";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...fontConfig,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTerm, setSelectedTerm] = useState<Term | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Load a random default term when component mounts
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * terms.length);
    setSelectedTerm(terms[randomIndex]);
  }, []);

  const handleTermSelect = (term: Term) => {
    setSelectedTerm(term);
  };

  if (!loaded) {
    return null;
  }

  return (
    <BodyView>
      <StatusBar style="auto" />

      {/* header */}
      <Header
        onHeightChange={(height) => {
          setHeaderHeight(height);
        }}
      >
        <SearchField
          placeholder="Search a term..."
          value={searchTerm}
          onChangeText={setSearchTerm}
          onTermSelect={handleTermSelect}
          selectedTermId={selectedTerm?.id}
        />
      </Header>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { marginTop: headerHeight - 8 },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {selectedTerm && (
          <View
            style={{
              backgroundColor: tokens.color.background.container,
              padding: 16,
              borderRadius: 24,
            }}
          >
            <AnimatedText
              variant="display"
              duration={500}
              delay={50}
              key={`term-${selectedTerm.id}`}
            >
              {selectedTerm.term}
            </AnimatedText>
            <AnimatedText
              duration={500}
              delay={100}
              key={`definition-${selectedTerm.id}`}
            >
              {selectedTerm.definition}
            </AnimatedText>
          </View>
        )}
      </ScrollView>
    </BodyView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
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
