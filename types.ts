
export enum ItemMode {
  FREE = 'FREE',
  LOW_PRICE = 'LOW_PRICE',
  BARTER = 'BARTER'
}

export enum ItemStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  area: string;
  accountAge: string;
  kindnessScore: number;
  successfulExchanges: number;
  verified: boolean;
}

export interface KindStory {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  appreciations: number;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  mode: ItemMode;
  status: ItemStatus;
  price?: number;
  barterFor?: string;
  images: string[];
  owner: User;
  area: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface ChatThread {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  otherUser: User;
  lastMessage: string;
  messages: ChatMessage[];
  status: ItemStatus;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'request' | 'system' | 'nearby';
}
