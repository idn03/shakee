import { useRef } from "react";
import { Alert, Text, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "@/src/i18n";
import { useLogOut } from "@/src/features/chatbook/hooks/useLogOut";
import { ShakeeBottomSheetModal } from "@/src/shared/components";
import { EmptyInbox, HomeHeader, SearchInput } from "../components";

export const HomeScreen = () => {
  const { t } = useTranslation();
  const { handleSignOut, isSigningOut } = useLogOut();
  const addContactSheetRef = useRef<BottomSheetModal<unknown>>(null);

  const handleOpenAddContact = () => {
    addContactSheetRef.current?.present();
  };

  const handleConfirmAddContact = () => {
    addContactSheetRef.current?.dismiss();
    Alert.alert(
      t("home.addContactUnavailableTitle"),
      t("home.addContactUnavailableMessage"),
    );
  };

  return (
    <View className="flex-1">
        <HomeHeader
          handleLogout={handleSignOut}
          openAddContact={handleOpenAddContact}
          isSigningOut={isSigningOut}
        />

        <View className="px-3">
          <SearchInput
            value=""
            onChangeText={() => { }}
            onSearch={() => { }}
          />
          <EmptyInbox />
        </View>

      <ShakeeBottomSheetModal
        ref={addContactSheetRef}
        enableDynamicSizing={false}
        snapPoints={["60%"]}
        enablePanDownToClose
        headerTitle={t("home.addContact")}
        isFooterShow
        footerButtonCancel={{
          label: "Cancel",
          onPress: () => addContactSheetRef.current?.dismiss(),
        }}
        footerButtonConfirm={{
          label: "Continue",
          onPress: handleConfirmAddContact,
        }}
      >
        <Text className="text-base leading-6 text-neutral-300">
          This is an example bottom sheet. Add your contact form fields here.
        </Text>
      </ShakeeBottomSheetModal>
    </View>
  );
};
