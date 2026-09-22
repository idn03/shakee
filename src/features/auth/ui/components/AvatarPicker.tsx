import { Image, Pressable, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "@/src/i18n";
import { CommonText } from "@/src/shared/components/CommonText";

const defaultAvatar = require("../../../../../assets/images/default-avatar.jpg");

interface AvatarPickerProps {
  avatarUri: string | null;
  onChangeAvatar: (uri: string) => void;
}

export const AvatarPicker: React.FC<AvatarPickerProps> = ({
  avatarUri,
  onChangeAvatar,
}) => {
  const { t } = useTranslation();

  const handlePickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      onChangeAvatar(result.assets[0].uri);
    }
  };

  return (
    <View className="items-center gap-5">
      <Image
        source={avatarUri ? { uri: avatarUri } : defaultAvatar}
        className="h-36 w-36 rounded-full border-2 border-white"
        accessibilityLabel={t("auth.avatarPreview")}
      />

      <Pressable
        className="rounded-lg border border-white px-5 py-3"
        onPress={handlePickAvatar}
      >
        <CommonText
          value={avatarUri ? t("auth.changeAvatar") : t("auth.chooseAvatar")}
          className="font-bold"
        />
      </Pressable>
    </View>
  );
};
