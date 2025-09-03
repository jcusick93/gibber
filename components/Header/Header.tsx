import { tokens } from "@/constants/tokens";
import { BlurView } from "expo-blur";
import { View } from "react-native";

interface HeaderProps {
  children: React.ReactNode;
  onHeightChange?: (height: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ children, onHeightChange }) => {
  return (
    <View
      style={{
        padding: 16,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {/* todo: add corner smoothing */}
      <BlurView
        intensity={50}
        tint="default"
        style={{
          width: "100%",
          backgroundColor: tokens.color.background.primary,
          position: "absolute",
          top: 16,
          flex: 1,
          paddingVertical: 16,
          paddingHorizontal: 16,
          zIndex: 999,
          borderRadius: 24,
          overflow: "hidden",
        }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          onHeightChange?.(height);
        }}
      >
        {children}
      </BlurView>
    </View>
  );
};
