import { View } from "react-native";
import { CommonText, AvatarCircle } from "@/src/shared/components";

interface MessageProps {
  sentAt: Date;
  content: string;
  fromOposite: boolean;
  avatarUrl?: string;
}

export const Message: React.FC<MessageProps> = ({ sentAt, content, fromOposite, avatarUrl }) => {
  return (
    <View>
      
    </View>
  );
};