import "../global.css";

import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { I18nProvider } from "@/src/i18n";

colorScheme.set("dark");

export default function RootLayout() {
  return (
    <I18nProvider>
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <Slot />
      </SafeAreaView>
    </I18nProvider>
  );
}
