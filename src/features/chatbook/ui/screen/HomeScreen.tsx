import { useState } from "react";
import { Alert, View } from "react-native";
import { useTranslation } from "@/src/i18n";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { EmptyInbox, HomeHeader } from "../components";

export const HomeScreen = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    try {
      await logout();
    } catch (error) {
      if (__DEV__) {
        console.error("[Auth] Sign out failed:", error);
      }

      Alert.alert(t("auth.signOutFailedTitle"), t("auth.signOutFailedMessage"));
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleOpenAddContact = () => {
    Alert.alert(
      t("home.addContactUnavailableTitle"),
      t("home.addContactUnavailableMessage"),
    );
  };

  return (
    <View className="flex-1">
      <HomeHeader
        handleLogout={handleSignOut}
        openAddContact={handleOpenAddContact}
        isSigningOut={isSigningOut}
      />
      <EmptyInbox />
    </View>
  );
};
