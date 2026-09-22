import { View } from "react-native";
import { Mail } from "lucide-react-native";
import { useTranslation } from "@/src/i18n";
import { InputBar } from "./InputBar";
import { CommonText } from "@/src/shared/components/CommonText";

interface SignUpStep1Props {
  email: string;
  onChangeEmail: (text: string) => void;
  emailError?: string;
}

export const SignUpStep1: React.FC<SignUpStep1Props> = ({
  email,
  onChangeEmail,
  emailError,
}) => {
  const { t } = useTranslation();

  return (
    <View className="gap-6">
      <CommonText value={t("auth.step1Alert")} />

      <InputBar
        placeholder="Email"
        icon={<Mail size={20} color={"#FFFFFF"} />}
        isPassword={false}
        value={email}
        onChangeText={onChangeEmail}
        helperText={emailError}
        isShowHelperText={Boolean(emailError)}
      />
    </View>
  );
};
