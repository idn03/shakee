import { View, Text } from "react-native";
import { AuthHeader } from "../components";

export const LoginScreen = () => {
  return (
    <View className="flex-1">
      <AuthHeader title="Login" />
      <Text className="text-white font-bold text-center mt-1">Welcome to Shakee!</Text>
    </View>
  );
};