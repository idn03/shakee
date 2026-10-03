import { View } from "react-native";
import { CommonText, AvatarCircle } from "@/src/shared/components";

interface MessageProps {
  sentAt: Date;
  content: string;
  fromOposite: boolean;
  avatarUrl?: string;
}

export const Message: React.FC<MessageProps> = ({ sentAt, content, fromOposite, avatarUrl }) => {
  const extractedSentAt = "23:00"; // From sentAt: Date -> string with only hours, example "23:08"

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