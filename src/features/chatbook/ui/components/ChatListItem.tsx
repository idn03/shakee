import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "@/src/i18n";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { CommonText, AvatarCircle } from "@/src/shared/components";
import { isDateInCurrentWeek } from "@/src/shared/utils/date";

export interface ChatListItemProps {
  oppositeId: string;
  avatarUri: string;
  username: string;
  lastMessageDate?: Date;
  lastMessageOwner?: string;
  lastMessageContent?: string;
  seen?: boolean;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  oppositeId,
  avatarUri,
  username,
  lastMessageDate,
  lastMessageOwner,
  lastMessageContent,
  seen,
}) => {
  const { locale, t } = useTranslation();
  const { user } = useAuth();

  const messageDate = lastMessageDate ? new Date(lastMessageDate) : null;
  const isThisWeek = messageDate ? isDateInCurrentWeek(messageDate) : false;
  const extractedDate = !messageDate || Number.isNaN(messageDate.getTime())
    ? ""
    : isThisWeek
      ? new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
          weekday: locale === "vi" ? "long" : "short",
        }).format(messageDate)
      : new Intl.DateTimeFormat(locale === "vi" ? "vi-VN" : "en-US", {
          month: "numeric",
          day: "numeric",
        }).format(messageDate);

  const isCurrentUserOwner = !!lastMessageOwner && user?.uid === lastMessageOwner;
  const extractedOwner = isCurrentUserOwner ? `${t("chat.you")}:` : "";

  return (
    <Pressable
      className="flex-row gap-2 items-center"
      onPress={() =>
        router.push({
          pathname: "/[room-id]",
          params: { "room-id": oppositeId },
        })
      }
    >
      <AvatarCircle avatarUri={avatarUri} size="md" />

      <View className="min-w-0 flex-1">
        <View className="flex-row gap-1">
          <CommonText value={username} className="font-bold" />
          {lastMessageContent ? <CommonText
            value="•"
            className={seen ? "!text-gray-500" : undefined}
          /> : null}
          <CommonText
            value={extractedDate}
            className={seen ? "!text-gray-500" : undefined}
          />
        </View>
        {lastMessageContent ? <View className="flex-row gap-1">
          {extractedOwner != "" && (<CommonText value={extractedOwner} className={seen ? "!text-gray-500" : undefined} />)}
          <CommonText
            value={lastMessageContent}
            className={`min-w-0 flex-1 ${seen ? "!text-gray-500" : ""}`}
            numberOfLines={1}
          />
        </View> : null}
      </View>
    </Pressable>
  );
};
