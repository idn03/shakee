import { View, Text } from "react-native";

interface HeaderProps {
  title: string;
  className?: string;
}

export const AuthHeader: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <View className={`h-[40px] w-full items-center justify-center ${className}`}>
      <Text className="text-xl font-bold text-white">{title}</Text>
    </View>
  );
};