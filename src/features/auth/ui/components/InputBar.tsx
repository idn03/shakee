import { TextInput, View, Text } from "react-native";

interface InputBarProps {
  placeholder: string;
  icon: React.ReactNode;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
  helperText?: string;
  isShowHelperText?: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ placeholder, icon, isPassword, value, onChangeText, className, helperText, isShowHelperText }) => {
  return (
    <View className="flex-1 gap-1">
      <View className={`flex-row items-center gap-2 ${className}`}>
        {icon}
        <TextInput className="flex-1" placeholder={placeholder} secureTextEntry={isPassword} value={value} onChangeText={onChangeText} />
      </View>
      {isShowHelperText && <Text className="text-sm text-gray-500">{`! ${helperText}`}</Text>}
    </View>
  );
};