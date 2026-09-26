import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#413333" },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="[room-id]" />
    </Stack>
  );
}
