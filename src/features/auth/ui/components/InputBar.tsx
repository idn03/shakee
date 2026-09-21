import { TextInput, View } from "react-native";

interface InputBarProps {
  placeholder: string;
  icon: React.ReactNode;
  isPassword?: boolean;
  value: string;
  onChangeText: (text: string) => void;
}

export const InputBar: React.FC<InputBarProps> = ({ placeholder, icon, isPassword, value, onChangeText }) => {
  return (
    <View className="flex-row items-center gap-2">
      {icon}
      <TextInput className="flex-1" placeholder={placeholder} secureTextEntry={isPassword} value={value} onChangeText={onChangeText} />
    </View>
  );
};