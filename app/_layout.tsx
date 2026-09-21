import "../global.css";

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colorScheme } from "nativewind";
import { View } from "react-native";

colorScheme.set("dark");

export default function RootLayout() {
  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      <Slot />
    </View>
  );
}
