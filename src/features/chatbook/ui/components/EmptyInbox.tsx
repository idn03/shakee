import { Image, View } from "react-native";
import { useTranslation } from "@/src/i18n";
import { CommonText } from "@/src/shared/components";

const emptyMailbox = require("@/assets/images/empty-inbox.png");

export const EmptyInbox = () => {
  const { t } = useTranslation();

  return (
    <View className="mt-10 flex-row items-center justify-center gap-6">
      <Image
        source={emptyMailbox}
        className="h-[90px] w-[90px]"
        accessibilityLabel={"empty-mailbox"}
      />
      <CommonText value={t("home.emptyInbox")} className="w-[260px]" />
    </View>
  );
};
