import { useMemo, useRef } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "@/src/i18n";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useLogOut } from "@/src/features/chatbook/hooks/useLogOut";
import { useOtherUsers } from "@/src/features/chatbook/hooks/useOtherUsers";
import { useSearch } from "@/src/features/chatbook/hooks/useSearch";
import { ShakeeBottomSheetModal } from "@/src/shared/components";
import { ChatList, EmptyInbox, HomeHeader, SearchInput } from "../components";

export const HomeScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { users, isLoading } = useOtherUsers(user?.uid);
  const { handleSignOut, isSigningOut } = useLogOut();
  const addContactSheetRef = useRef<BottomSheetModal<unknown>>(null);
  const chatList = useMemo(
    () =>
      users.map((profile) => ({
        oppositeId: profile.uid,
        avatarUri: profile.avatarUrl ?? "",
        username: profile.username,
        lastMessageDate: undefined,
        lastMessageOwner: "",
        lastMessageContent: "",
        seen: true,
      })),
    [users],
  );
  const { query, setQuery, filteredList } = useSearch(chatList);

  if (__DEV__) {
    console.info("[Home] Chat list data", {
      currentUserUid: user?.uid ?? null,
      userCount: users.length,
      chatListCount: chatList.length,
    });
  }

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
            value={query}
            onChangeText={setQuery}
          />
          {isLoading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#FFFCE1" />
            </View>
          ) : chatList.length === 0 ? (
            <EmptyInbox />
          ) : filteredList.length > 0 ? (
            <ChatList list={filteredList} />
          ) : (
            <Text className="mt-10 text-center text-white">
              {t("home.noSearchResults")}
            </Text>
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
