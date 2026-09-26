import { useState } from "react";
import { Alert } from "react-native";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useTranslation } from "@/src/i18n";

export const useLogOut = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;

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

  return { handleSignOut, isSigningOut };
};
