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
    <View className="gap-1">
      <View className={`flex-row gap-2 items-center ${className}`}>
        {icon}
        <TextInput className="flex-1 border border-white h-10 rounded-[20px] bg-gray-500/20 px-4" placeholder={placeholder} secureTextEntry={isPassword} value={value} onChangeText={onChangeText} />
      </View>
      {isShowHelperText && <Text className="text-sm text-gray-500">{`! ${helperText}`}</Text>}
    </View>
  );
};