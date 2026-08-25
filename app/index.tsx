import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#FFFCE1] px-6">
      <Text className="text-2xl font-bold text-[#0A0A0A]">Welcome to Shakee!</Text>
      <Link href="/profile" className="mt-4 text-base text-blue-600">
        Go to Profile
      </Link>
    </View>
  );
}