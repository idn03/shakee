import { useRef, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "@/src/i18n";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useChatRoom } from "@/src/features/chat-room/hooks/useChatRoom";
import { useMessage } from "@/src/features/chat-room/hooks/useMessage";
import { ShakeeBottomSheetModal, CommonText } from "@/src/shared/components";
import { ChatRoomHeader, InputBar, LineCut, Message } from "../components";

export const ChatRoomScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ username?: string; "room-id"?: string }>();
  const partnerId = params["room-id"];
  const username = params.username;
  const { roomId } = useChatRoom(user?.uid, partnerId);
  const { messages, isLoading, sendMessage } = useMessage(roomId ?? undefined, user?.uid);
  const [draft, setDraft] = useState("");
  const optionsSheetRef = useRef<BottomSheetModal>(null);

  return (
    <View className="flex-1">
      <ChatRoomHeader
        username={username ?? "Unknown user"}
        onBackPress={() => router.back()}
        onOptionsPress={() => optionsSheetRef.current?.present()}
      />

      <ScrollView className="flex-1 px-3">
        <View className="h-[80px]" />
        {isLoading ? <ActivityIndicator color="#FFFCE1" /> : messages.map((message) => (
          <Message
            key={message.id}
            sentAt={message.createdAt ?? new Date()}
            content={message.content}
            fromOposite={message.userId !== user?.uid}
          />
        ))}
        <LineCut cutAt={messages[messages.length - 1]?.createdAt ?? new Date()} />
      </ScrollView>

      <InputBar
        value={draft}
        onChangeText={setDraft}
        onSend={(content) => {
          void sendMessage(content).then(() => setDraft("")).catch((cause) => console.warn("Could not send message", cause));
        }}
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
