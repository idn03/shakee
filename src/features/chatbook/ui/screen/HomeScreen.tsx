import { View } from "react-native";
import { CommonText } from "@/src/shared/components/CommonText";

export const HomeScreen = () => {
  return (
    <View className="flex-1">
      <CommonText
        value="This is Home screen aka Chatbook"
        className="text-center"
      />
    </View>
  );
};
