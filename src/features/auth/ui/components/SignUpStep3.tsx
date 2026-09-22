import { View } from "react-native";
import { useTranslation } from "@/src/i18n";
import { CommonText } from "@/src/shared/components/CommonText";
import { AvatarPicker } from "./AvatarPicker";

interface SignUpStep3Props {
  avatarUri: string | null;
  onChangeAvatar: (uri: string) => void;
}

export const SignUpStep3: React.FC<SignUpStep3Props> = ({
  avatarUri,
  onChangeAvatar,
}) => {
  const { t } = useTranslation();

  return (
    <View className="gap-8">
      <CommonText value={t("auth.step3Alert")} />
      <AvatarPicker avatarUri={avatarUri} onChangeAvatar={onChangeAvatar} />
    </View>
  );
};
