import { View, Pressable } from "react-native";
import { Flag } from "lucide-react-native";
interface LoginButtonProps {
  onPress: () => void;
  isDisabled?: boolean;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  isDisabled = false,
}) => {
  return (
    <View className="h-[60px] w-[60px] rounded-[30px] border border-white flex justify-center items-center">
      <Pressable
        className="h-[52px] w-[52px] rounded-[26px] bg-white flex justify-center items-center"
        onPress={onPress}
        disabled={isDisabled}
        accessibilityState={{ disabled: isDisabled }}
      >
        <Flag size={24} />
      </Pressable>
    </View>
  );
};
