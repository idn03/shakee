import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#252021" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[room-id]" />
    </Stack>
  );
}
