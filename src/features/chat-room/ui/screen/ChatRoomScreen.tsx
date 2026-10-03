import { useRef } from "react";
import { View, ScrollView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "@/src/i18n";
import { ShakeeBottomSheetModal, CommonText } from "@/src/shared/components";
import { ChatRoomHeader, InputBar, LineCut, Message } from "../components";

export const ChatRoomScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { username } = useLocalSearchParams<{ username?: string }>();
  const optionsSheetRef = useRef<BottomSheetModal>(null);
  let dateTime = new Date();

  return (
    <View className="flex-1">
      <ChatRoomHeader
        username={username ?? "Unknown user"}
        onBackPress={() => router.back()}
        onOptionsPress={() => optionsSheetRef.current?.present()}
      />

      <ScrollView className="flex-1 px-3">
        <View className="h-[80px]" />

        <Message
          sentAt={dateTime}
          content="Can I get your number?"
          fromOposite
          avatarUrl="https://i.pinimg.com/736x/91/2c/87/912c87fb67b1761052c341ed655f714f.jpg"
        />

        <Message
          sentAt={dateTime}
          content="My number is +84 090 101 43 68, please call me and talk with me every night haha."
          fromOposite={false}
        />

        <LineCut
          cutAt={dateTime}
        />
      </ScrollView>

      <InputBar
        value=""
        onChangeText={() => { }}
        onSend={() => { }}
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
