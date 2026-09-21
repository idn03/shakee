import { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "@/src/i18n";
import { Mail, KeyRound } from 'lucide-react-native';
import { AuthHeader, InputBar, LoginButton } from "../components";

export const LoginScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <AuthHeader title={t("auth.login")} />
      <Text className="text-white font-bold text-center mt-1">
        {t("auth.welcome")}
      </Text>

      {/* Input Section */}
      <View className="mt-10 gap-10 px-8">
        <InputBar
          placeholder="Email"
          icon={
            <Mail
              size={20}
              color={'#FFFFFF'}
            />
          }
          isPassword={false}
          value={email}
          onChangeText={setEmail}
        />

        <InputBar
          placeholder={t("password")}
          icon={
            <KeyRound
              size={20}
              color={'#FFFFFF'}
            />
          }
          isPassword
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {/* Submit Button */}
      <View className="mt-10 px-8 flex-row justify-between">
        <View className="flex-col gap-1 mt-[-10px]">
          <Text className="text-white">{t("auth.dontHaveAccount")}</Text>
          <Pressable 
            onPress={() => router.push("/sign-up")}
          >
            <Text className="text-white font-bold underline">{t("auth.pressHere")}</Text>
          </Pressable>
        </View>
        
        <LoginButton email={email} password={password} />
      </View>
    </View>
  );
};
