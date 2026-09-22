import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

import { I18nProvider } from "@/src/i18n";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { AuthContextProvider } from "@/src/features/auth/context/AuthContext";
import "../global.css";

colorScheme.set("dark");

const MainLayout = () => {
  const { isAuthenticated, isAuthReady } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (!isAuthReady) return;

    const inApp = segments[0] === "(app)";

    if (isAuthenticated && !inApp) {
      router.replace("/(app)");
    } else if (!isAuthenticated && inApp) {
      router.replace("/login");
    }
  }, [isAuthReady, isAuthenticated, router, segments]);

  if (!isAuthReady) {
    return null;
  }

  return <Slot />;
};

export default function RootLayout() {
  return (
    <I18nProvider>
      <SafeAreaView className="flex-1 bg-black">
        <StatusBar style="light" translucent backgroundColor="transparent" />
        <AuthContextProvider>
          <MainLayout />
        </AuthContextProvider>
      </SafeAreaView>
    </I18nProvider>
  );
}
