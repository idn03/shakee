import { useState } from "react";
import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@/src/i18n";
import { useLogin } from "@/src/features/auth/hooks/useLogin";
import { Mail, KeyRound } from "lucide-react-native";
import { AuthHeader, InputBar, LoginButton } from "../components";
import { CommonText } from "@/src/shared/components/CommonText";

export const LoginScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    email,
    setEmail,
    password,
    setPassword,
    hasSubmitted,
    isLoggingIn,
    isEmailValid,
    isPasswordValid,
    handleLogin,
  } = useLogin();

  return (
    <View>
      <AuthHeader title={t("auth.login")} />
      <CommonText
        value={t("auth.welcome")}
        className="mt-1 text-center font-bold"
      />

      <View className="h-[80px]" />

      {/* Input Section */}
      <View className="mt-10 gap-10 px-8">
        <InputBar
          placeholder="Email"
          icon={<Mail size={20} color={"#FFFFFF"} />}
          isPassword={false}
          value={email}
          onChangeText={setEmail}
          helperText={t("auth.invalidEmail")}
          isShowHelperText={hasSubmitted && !isEmailValid}
        />

        <InputBar
          placeholder={t("password")}
          icon={<KeyRound size={20} color={"#FFFFFF"} />}
          isPassword
          showPassword={showPassword}
          onTogglePassword={() =>
            setShowPassword((currentValue) => !currentValue)
          }
          value={password}
          onChangeText={setPassword}
          helperText={t("auth.requiredPassword")}
          isShowHelperText={hasSubmitted && !isPasswordValid}
        />
      </View>

      {/* Submit Button */}
      <View className="mt-10 px-8 flex-row justify-between">
        <View className="flex-col gap-1 mt-[-10px]">
          <CommonText value={t("auth.dontHaveAccount")} />
          <Pressable onPress={() => router.push("/sign-up")}>
            <CommonText
              value={t("auth.pressHere")}
              className="font-bold underline"
            />
          </Pressable>
        </View>

        <LoginButton onPress={handleLogin} isDisabled={isLoggingIn} />
      </View>
    </View>
  );
};
