import { useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useTranslation } from "@/src/i18n";
import { useAuth } from "@/src/features/auth/hooks/useAuth";
import { useChatRoom } from "@/src/features/chat-room/hooks/useChatRoom";
import { useMessage, type ChatMessage } from "@/src/features/chat-room/hooks/useMessage";
import { ShakeeBottomSheetModal, CommonText } from "@/src/shared/components";
import { ChatRoomHeader, InputBar, LineCut, Message } from "../components";

type ChatRow =
  | { type: "message"; key: string; message: ChatMessage }
  | { type: "day-cut"; key: string; date: Date };

const getLocalDayKey = (date: Date | null) => {
  if (!date || Number.isNaN(date.getTime())) return "unknown-day";
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const ChatRoomScreen = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user } = useAuth();
  const params = useLocalSearchParams<{ username?: string; "room-id"?: string }>();
  const partnerId = params["room-id"];
  const username = params.username;
  const { roomId, createOrOpenChatRoom } = useChatRoom(user?.uid, partnerId);
  const { messages, isLoading, sendMessage } = useMessage(roomId ?? undefined, user?.uid);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const isSendingRef = useRef(false);
  const optionsSheetRef = useRef<BottomSheetModal>(null);
  const rows = useMemo(() => {
    const nextRows: ChatRow[] = [];
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      const message = messages[index];
      nextRows.push({ type: "message", key: message.id, message });
      const olderMessage = messages[index - 1];
      if (olderMessage && getLocalDayKey(message.createdAt) !== getLocalDayKey(olderMessage.createdAt)) {
        nextRows.push({
          type: "day-cut",
          key: `day-cut-${olderMessage.id}`,
          date: olderMessage.createdAt ?? new Date(0),
        });
      }
    }
    return nextRows;
  }, [messages]);

  const renderRow = ({ item }: { item: ChatRow }) => item.type === "day-cut" ? (
    <LineCut cutAt={item.date} />
  ) : (
    <Message
      sentAt={item.message.createdAt ?? new Date()}
      content={item.message.content}
      fromOposite={item.message.userId !== user?.uid}
    />
  );

  return (
    <View className="flex-1">
      <ChatRoomHeader
        username={username ?? "Unknown user"}
        onBackPress={() => router.back()}
        onOptionsPress={() => optionsSheetRef.current?.present()}
      />

      <FlatList
        className="flex-1 px-3"
        data={rows}
        renderItem={renderRow}
        keyExtractor={(item) => item.key}
        inverted
        contentContainerStyle={{ paddingTop: 40, flexGrow: 1 }}
        ListEmptyComponent={isLoading ? <View className="flex-1 items-center justify-center"><ActivityIndicator color="#FFFCE1" /></View> : null}
      />

      <InputBar
        value={draft}
        disabled={isSending}
        onChangeText={setDraft}
        onSend={(content) => {
          if (isSendingRef.current) return;
          isSendingRef.current = true;
          setIsSending(true);
          void createOrOpenChatRoom()
            .then(() => sendMessage(content))
            .then(() => setDraft(""))
            .catch((cause) => console.warn("Could not send message", cause))
            .finally(() => {
              isSendingRef.current = false;
              setIsSending(false);
            });
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
