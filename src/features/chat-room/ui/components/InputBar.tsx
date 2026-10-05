import { ActivityIndicator, View, Pressable, TextInput } from "react-native";
import { ArrowUp } from "lucide-react-native";

interface InputBarProps {
  value: string;
  disabled?: boolean;
  onChangeText: (message: string) => void;
  onSend: (message: string) => void;
}

export const InputBar: React.FC<InputBarProps> = ({ value, disabled = false, onChangeText, onSend }) => {
  return (
    <View className="absolute left-0 right-0 bottom-0 z-10 w-full px-6 pt-4">
      <View className="h-10 flex-row items-center">
        <TextInput
          className="w-full border border-white h-10 rounded-[20px] bg-gray-500/20 pl-4 pt-2 pr-10 text-white"
          value={value}
          onChangeText={onChangeText}
          multiline
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send message"
          disabled={disabled || !value.trim()}
          onPress={() => onSend(value)}
          className="absolute right-[6px] self-center bg-white p-1 rounded-full disabled:opacity-50"
        >
          <ArrowUp size={18} color="#000000" />
        </Pressable>
      </View>
    </View>
  );
};
