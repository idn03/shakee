import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-2xl font-bold">Welcome to Shakee!</Text>
    </View>
  );
}