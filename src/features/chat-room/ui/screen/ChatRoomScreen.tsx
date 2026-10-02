import { useRef } from "react";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "@/src/i18n";
import { ShakeeBottomSheetModal, CommonText } from "@/src/shared/components";
import { ChatRoomHeader, InputBar } from "../components";

export const ChatRoomScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { username } = useLocalSearchParams<{ username?: string }>();
  const optionsSheetRef = useRef<BottomSheetModal>(null);

  return (
    <View className="flex-1">
      <ChatRoomHeader
        username={username ?? "Unknown user"}
        onBackPress={() => router.back()}
        onOptionsPress={() => optionsSheetRef.current?.present()}
      />
      <InputBar 
        value=""
        onChangeText={() => {}}
        onSend={() => {}}
      />

      <ShakeeBottomSheetModal
        enableDynamicSizing
        enablePanDownToClose
        headerTitle={t("home.addContactUnavailableTitle")}
      >
        <CommonText
          value={t("home.addContactUnavailableMessage")}
        />
      </ShakeeBottomSheetModal>
    </View>
  );
};
