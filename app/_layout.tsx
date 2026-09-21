import "../global.css";

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

colorScheme.set("dark");

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Slot />
    </SafeAreaView>
  );
}
