import { View, Text } from 'react-native';
import { Link } from 'expo-router';
export default function HomeScreen() {
  return (
    <View>
      <Text>Welcome to Shakee!</Text>
      <Link href="/profile">Go to Profile</Link>
    </View>
  );
}