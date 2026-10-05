import { View } from "react-native";
import { CommonText, AvatarCircle } from "@/src/shared/components";
import { useTranslation } from "@/src/i18n";

interface MessageProps {
  sentAt: Date;
  content: string;
  fromOposite: boolean;
  avatarUrl?: string;
}

export const Message: React.FC<MessageProps> = ({ sentAt, content, fromOposite, avatarUrl }) => {
  const { locale } = useTranslation();
  const extractedSentAt = Number.isNaN(sentAt.getTime())
    ? ""
    : new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(sentAt);

  if (fromOposite) {
    return (
      <View className="flex-row mb-6">
        <AvatarCircle
          avatarUri={avatarUrl || ""}
          size="md"
          className="absolute z-10 mt-[-20px]"
        />
        <View className="ml-2 p-2 bg-white rounded-lg max-w-[300px]">
          <CommonText
            value={extractedSentAt}
            className="!text-black self-end"
          />

          <CommonText
            value={content}
            className="!text-black"
          />
        </View>
      </View>
    );
  }
  else {
    return (
      <View className="flex-row justify-end mb-6">
        <View className="rounded-lg bg-[#252021] shadow-sm p-2 max-w-[300px]">
          <CommonText
            value={extractedSentAt}
            className="self-end"
          />

          <CommonText
            value={content}
          />
        </View>
      </View>
    );
  }
};
