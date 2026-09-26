import { useMemo, useRef } from "react";
import { Text, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "@/src/i18n";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useLogOut } from "@/src/features/chatbook/hooks/useLogOut";
import { getMockChatList } from "@/src/features/chatbook/temp/mockChatList";
import { ShakeeBottomSheetModal } from "@/src/shared/components";
import { ChatList, EmptyInbox, HomeHeader, SearchInput } from "../components";

export const HomeScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { handleSignOut, isSigningOut } = useLogOut();
  const addContactSheetRef = useRef<BottomSheetModal<unknown>>(null);
  const chatList = useMemo(() => getMockChatList(user?.uid), [user?.uid]);

  const handleOpenAddContact = () => {
    addContactSheetRef.current?.present();
  };

  return (
    <View className="flex-1">
        <HomeHeader
          handleLogout={handleSignOut}
          openAddContact={handleOpenAddContact}
          isSigningOut={isSigningOut}
        />

        <View className="flex-1 px-3">
          <SearchInput
            value=""
            onChangeText={() => { }}
            onSearch={() => { }}
          />
          {chatList.length > 0 ? (
            <ChatList list={chatList} />
          ) : (
            <EmptyInbox />
          )}
        </View>

      <ShakeeBottomSheetModal
        ref={addContactSheetRef}
        enableDynamicSizing
        enablePanDownToClose
        headerTitle={t("home.addContact")}
      >
        <Text className="text-base leading-6 text-neutral-300 mb-4">
          This is an example bottom sheet. Add your contact form fields here.
        </Text>
      </ShakeeBottomSheetModal>
    </View>
  );
};
