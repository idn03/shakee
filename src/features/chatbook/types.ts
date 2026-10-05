export interface UserProfile {
  uid: string;
  username: string;
  avatarUrl: string | null;
  email: string | null;
  lastMessageContent?: string;
  lastMessageOwner?: string;
  lastMessageDate?: Date;
  seen?: boolean;
}
