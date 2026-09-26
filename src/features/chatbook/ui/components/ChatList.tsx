import { View } from "react-native";
import { CommonText } from "@/src/shared/components";
import { ChatListItem, type ChatListItemProps } from "./ChatListItem";

interface ChatListProps {
  list: ChatListItemProps[];
}

export const ChatList: React.FC<ChatListProps> = ({ list }) => {
  const sortedList = [...list].sort((first, second) =>
    first.username.localeCompare(second.username, "en", {
      sensitivity: "base",
    }),
  );

  const groupedItems = new Map<string, ChatListItemProps[]>();
  sortedList.forEach((item) => {
    const initial = item.username.trim().charAt(0).toLocaleUpperCase("en");
    const title = /^[A-Z]$/.test(initial) ? initial : "#";
    const group = groupedItems.get(title) ?? [];
    group.push(item);
    groupedItems.set(title, group);
  });
  const sections = [...groupedItems.entries()]
    .sort(([first], [second]) => {
      if (first === "#") return 1;
      if (second === "#") return -1;
      return first.localeCompare(second, "en");
    })
    .map(([title, data]) => ({ title, data }));

  return (
    <View className="gap-4">
      {sections.map(({ title, data }) => (
        <View key={title} className="gap-2">
          <View className="w-full p-2 bg-gray-500">
            <CommonText value={title} className="font-bold" />
          </View>
          <View className="gap-2">
            {data.map((item, index) => (
              <ChatListItem
                key={`${item.username}-${item.lastMessageDate.getTime()}-${index}`}
                {...item}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};
