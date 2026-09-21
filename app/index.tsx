import { Redirect } from "expo-router";
import { useAuth } from "@/src/features/auth/hooks/useAuth";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return <Redirect href={isAuthenticated ? "/(app)" : "/login"} />;
}
