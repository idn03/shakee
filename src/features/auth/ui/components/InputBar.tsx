import { TextInput, View, Pressable } from "react-native";
import { Eye, EyeClosed } from "lucide-react-native";
import { CommonText } from "@/src/shared/components/CommonText";

interface InputBarProps {
  placeholder: string;
  icon: React.ReactNode;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
  helperText?: string;
  isShowHelperText?: boolean;
}

export const InputBar: React.FC<InputBarProps> = ({ placeholder, icon, isPassword, showPassword = false, onTogglePassword, value, onChangeText, className, helperText, isShowHelperText }) => {
  return (
    <View className="gap-1">
      <View className={`flex-row gap-2 items-center ${className}`}>
        {icon}
        <TextInput
          className="flex-1 border border-white h-10 rounded-[20px] bg-gray-500/20 px-4 text-white"
          placeholder={placeholder}
          secureTextEntry={isPassword && !showPassword}
          value={value}
          onChangeText={onChangeText}
        />
        {isPassword && (
          <Pressable
            className="absolute right-[12px]"
            onPress={onTogglePassword}
            accessibilityRole="button"
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <Eye color={'#FFFFFF'} size={20} />
            ) : (
              <EyeClosed color={'#FFFFFF'} size={20} />
            )}
          </Pressable>
        )}
      </View>
      {isShowHelperText && (
        <CommonText value={`! ${helperText}`} className="text-sm text-gray-500" />
      )}
    </View>
  );
};
