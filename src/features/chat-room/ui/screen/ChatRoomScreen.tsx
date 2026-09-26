import { View } from "react-native";
import { CommonText } from "@/src/shared/components";

export const ChatRoomScreen = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <CommonText 
        value="This is chat room screen"
      />
    </View>
  );
};