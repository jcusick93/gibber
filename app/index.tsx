import { BodyView } from "@/components/Body/BodyView";
import { StyledText } from "@/components/Text/StyledText";

import { SearchField } from "@/components/SearchField";
import { ScrollView, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <BodyView>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      > */}

      {/* header */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: 16,
          zIndex: 9,
          backgroundColor: "rgba(0,0,0,.9)",
          backdropFilter: "blur(100px)",
        }}
      >
        <SearchField placeholder="Search a term..." />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <StyledText variant="display">Bussin</StyledText>
        <StyledText variant="body-large">
          This refers to the act of pressing the tongue against the roof of the
          mouth to define the jawline. Originally popularized as a facial
          exercise, it's now a meme where people "mew" in photos to look their
          best. This refers to the act of pressing the tongue against the roof
          of the mouth to define the jawline. Originally popularized as a facial
          exercise, it's now a meme where people "mew" in photos to look their
          best.
        </StyledText>
      </ScrollView>
      {/* </KeyboardAvoidingView> */}
    </BodyView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 172, // Scroll bar appears under header
    paddingBottom: 32,
  },
  scrollContent: {},
  textInput: {
    height: 40,
    backgroundColor: "blue",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
});
