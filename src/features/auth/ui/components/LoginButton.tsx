import { View, Pressable } from "react-native";
import { Flag } from "lucide-react-native";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

interface LoginButtonProps {
  email: string;
  password: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ email, password }) => {
  const { login } = useAuth();

  const handleSubmit = async () => {
    if (!email.trim() || !password) {
      return;
    }

    await login(email.trim(), password);
  };

  return (
    <View className="h-[60px] w-[60px] rounded-[30px] border border-white flex justify-center items-center">
      <Pressable
        className="h-[52px] w-[52px] rounded-[26px] bg-white flex justify-center items-center"
        onPress={handleSubmit}
      >
        <Flag
          size={24} 
        />
      </Pressable>
    </View>
  );
};
