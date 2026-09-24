import { View, Pressable } from "react-native";
import { LogOut, CirclePlus } from "lucide-react-native";
import { useTranslation } from "@/src/i18n";
import { CommonText } from "@/src/shared/components";

interface HomeHeaderProps {
  handleLogout: () => Promise<void>;
  openAddContact: () => void;
  isSigningOut: boolean;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  handleLogout,
  openAddContact,
  isSigningOut,
}) => {
  const { t } = useTranslation();

  return (
    <View className="w-full flex-row items-center justify-between px-6 py-4">
      <CommonText
        value={t("home.title")}
        className="!text-2xl font-bold"
      />

      <View className="flex-row gap-2">
        <Pressable
          className={`rounded-full p-2 ${isSigningOut ? "opacity-50" : ""}`}
          onPress={handleLogout}
          disabled={isSigningOut}
          accessibilityRole="button"
          accessibilityLabel={t("auth.signOut")}
        >
          <LogOut size={20} color="#FFFFFF" />
        </Pressable>

        <Pressable
          className="rounded-full p-2"
          onPress={openAddContact}
          accessibilityRole="button"
          accessibilityLabel={t("home.addContact")}
        >
          <CirclePlus size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};
