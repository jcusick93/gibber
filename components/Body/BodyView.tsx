import { SafeAreaView, StyleSheet, View } from "react-native";

interface BodyViewProps {
  children?: React.ReactNode;
}

export const BodyView: React.FC<BodyViewProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  body: {
    flex: 1,

    padding: 16,
  },
});
