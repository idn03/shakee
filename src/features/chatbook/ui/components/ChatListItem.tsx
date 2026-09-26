import { View } from "react-native";
import { useTranslation } from "@/src/i18n";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { CommonText, AvatarCircle } from "@/src/shared/components";
import { isDateInCurrentWeek } from "@/src/shared/utils/date";

export interface ChatListItemProps {
  avatarUri: string;
  username: string;
  lastMessageDate: Date;
  lastMessageOwner: string;
  lastMessageContent: string;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  avatarUri,
  username,
  lastMessageDate,
  lastMessageOwner,
  lastMessageContent
}) => {
  const { locale, t } = useTranslation();
  const { user } = useAuth();

  const messageDate = new Date(lastMessageDate);
  const isThisWeek = isDateInCurrentWeek(messageDate);
  const extractedDate = Number.isNaN(messageDate.getTime())
    ? ""
    : isThisWeek
      ? new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
          weekday: locale === "vi" ? "long" : "short",
        }).format(messageDate)
      : new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
          month: "numeric",
          day: "numeric",
        }).format(messageDate);

  const isCurrentUserOwner =
    Boolean(user) &&
    (user?.displayName === lastMessageOwner || user?.uid === lastMessageOwner);
  const extractedOwner = isCurrentUserOwner ? `${t("chat.you")}:` : "";

  return (
    <View className="flex-row gap-2 items-center">
      <AvatarCircle 
        avatarUri={avatarUri}
        size="md"
      />

      <View>
        <View className="flex-row gap-1">
          <CommonText 
            value={username}
            className="!text-xs font-bold"
          />
          <CommonText 
            value="•"
            className="text-gray-500"
          />
          <CommonText 
            value={extractedDate}
            className="text-gray-500"
          />
        </View>
        <View className="flex-row gap-1">
          <CommonText 
            value={extractedOwner}
            className="!text-xs font-bold"
          />
          <CommonText 
            value={lastMessageContent}
            className="text-gray-500"
          />
        </View>
      </View>
    </View>
  );
};
