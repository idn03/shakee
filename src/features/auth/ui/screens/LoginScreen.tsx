import { View, Text } from "react-native";
import { useTranslation } from "@/src/i18n";
import { AuthHeader } from "../components";

export const LoginScreen = () => {
  const { t } = useTranslation();

  return (
    <View className="flex-1">
      <AuthHeader title={t("auth.login")} />
      <Text className="text-white font-bold text-center mt-1">
        {t("auth.welcome")}
      </Text>
    </View>
  );
};
