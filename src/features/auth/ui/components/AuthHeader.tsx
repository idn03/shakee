import { View } from "react-native";
import { CommonText } from "@/src/shared/components/CommonText";

interface HeaderProps {
  title: string;
  className?: string;
}

export const AuthHeader: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <View className={`h-[60px] w-full items-center justify-center ${className}`}>
      <CommonText value={title} className="!text-2xl font-bold" />
    </View>
  );
};
