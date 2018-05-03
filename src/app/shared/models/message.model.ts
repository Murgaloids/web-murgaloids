export interface Message {
  id: number;
  conversationId: number;
  senderId: number;
  message: string;
  messageDate: string;
  isRead: boolean;
}