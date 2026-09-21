import { View } from "react-native";
import { useTranslation } from "@/src/i18n";
import { AuthHeader } from "../components";

export const SignUpScreen = () => {
  const { t } = useTranslation();
  
  return (
    <View>
      <AuthHeader title={t("auth.signUp")} />
    </View>
  );
};