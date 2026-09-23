import { useState } from "react";
import { Alert } from "react-native";
import { useTranslation } from "@/src/i18n";
import { isEmail } from "@/src/shared/utils/validators";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const isEmailValid = isEmail(email);
  const isPasswordValid = password.length > 0;

  const handleLogin = async () => {
    if (isLoggingIn) {
      return;
    }

    setHasSubmitted(true);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setIsLoggingIn(true);

    try {
      await login(email.trim(), password);
    } catch (error) {
      if (__DEV__) {
        console.error("[Auth] Login failed:", error);
      }

      Alert.alert(t("auth.loginFailedTitle"), t("auth.loginFailedMessage"));
    } finally {
      setIsLoggingIn(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    hasSubmitted,
    isLoggingIn,
    isEmailValid,
    isPasswordValid,
    handleLogin,
  };
};
