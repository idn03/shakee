import { View, Pressable } from "react-native";
import { ChevronLeft, Ellipsis } from "lucide-react-native/icons";
import { CommonText } from "@/src/shared/components";

interface ChatRoomHeaderProps {
  username: string;
  onBackPress: () => void;
  onOptionsPress: () => void;
}

export const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({
  username,
  onBackPress,
  onOptionsPress,
}) => {
  return (
    <View className="absolute left-0 right-0 top-0 z-10 w-full flex-row items-center justify-between bg-[#252021]/85 px-6 py-4">
      <View className="flex-row items-center">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBackPress}
        >
          <ChevronLeft size={24} color="#FFFFFF" />
        </Pressable>
        <CommonText
          value={username}
          className="!text-lg font-bold"
        />
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open chat room options"
        onPress={onOptionsPress}
      >
        <Ellipsis size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
};
