import type { ChatListItemProps } from "../ui/components/ChatListItem";

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 60 * 60 * 1000);
const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

export const getMockChatList = (
  currentUserUid = "u-current-user",
): ChatListItemProps[] => [
  {
    avatarUri: "https://i.pinimg.com/736x/d6/91/be/d691bec4aac6b04f20b9530751146610.jpg",
    username: "Alex Morgan",
    lastMessageDate: hoursAgo(1),
    lastMessageOwner: currentUserUid,
    lastMessageContent: "Sounds good, see you then! I will prepare breakfast for all of us.",
    seen: true,
  },
  {
    avatarUri: "https://i.pinimg.com/736x/2f/c4/8a/2fc48aac05bca2d8e578fa943dbdd295.jpg",
    username: "Amelia Clark",
    lastMessageDate: hoursAgo(4),
    lastMessageOwner: "u-ameliac",
    lastMessageContent: "Did you get the photos?",
    seen: true,
  },
  {
    avatarUri: "https://i.pinimg.com/736x/23/d2/ba/23d2ba9c5851d2cd90f06ae36d6bb715.jpg",
    username: "Daniel Kim",
    lastMessageDate: daysAgo(2),
    lastMessageOwner: "u-danielkim",
    lastMessageContent: "Thanks for your help yesterday.",
    seen: true,
  },
  {
    avatarUri: "https://i.pinimg.com/736x/f4/94/6d/f4946dcfaec117ff04067071c2d451d8.jpg",
    username: "Linh Nguyen",
    lastMessageDate: hoursAgo(7),
    lastMessageOwner: "u-linhnguyen",
    lastMessageContent: "I sent you the address.",
    seen: false,
  },
  {
    avatarUri: "https://i.pinimg.com/1200x/a5/3c/1a/a53c1a6702a2da30cb218d54e9f7ded3.jpg",
    username: "Olivia Chen",
    lastMessageDate: daysAgo(1),
    lastMessageOwner: "u-oliviachen",
    lastMessageContent: "Are we still on for lunch?",
    seen: true,
  },
  {
    avatarUri: "https://i.pinimg.com/736x/81/cd/40/81cd40680c29a4bf79f99d3ebdb9d6c9.jpg",
    username: "Sofia Garcia",
    lastMessageDate: hoursAgo(2),
    lastMessageOwner: "u-sofiag",
    lastMessageContent: "Just arrived!",
    seen: false,
  },
  {
    avatarUri: "https://i.pinimg.com/1200x/97/3b/ac/973baccd23c790d2cf8e0b19bd0019dc.jpg",
    username: "Sona Taylor",
    lastMessageDate: daysAgo(14),
    lastMessageOwner: "u-sonataylor",
    lastMessageContent: "Talk soon 😊",
    seen: true,
  },
];
