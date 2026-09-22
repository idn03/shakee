import { View } from "react-native";
import { User, KeyRound } from "lucide-react-native";
import { useTranslation } from "@/src/i18n";
import { InputBar } from "./InputBar";
import { CommonText } from "@/src/shared/components/CommonText";

interface SignUpStep2Props {
  username: string;
  onChangeUsername: (text: string) => void;
  password: string;
  onChangePassword: (text: string) => void;
}

export const SignUpStep2: React.FC<SignUpStep2Props> = ({ username, onChangeUsername, password, onChangePassword }) => {
  const { t } = useTranslation();

  return (
    <View className="gap-6">
      <View className="gap-1">
        <CommonText value={t("auth.step2Alert")} />
        <CommonText value={t("auth.usernameAlert")} />
        <CommonText value={t("auth.passwordAlert")} />
      </View>

      <InputBar
        placeholder={t("username")}
        icon={
          <User
            size={20}
            color={'#FFFFFF'}
          />
        }
        isPassword={false}
        value={username}
        onChangeText={onChangeUsername}
      />

      <InputBar
        placeholder={t("password")}
        icon={
          <KeyRound
            size={20}
            color={'#FFFFFF'}
          />
        }
        isPassword={true}
        value={password}
        onChangeText={onChangePassword}
      />
    </View>
  );
};