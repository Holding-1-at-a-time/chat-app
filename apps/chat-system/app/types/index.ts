// apps/chat-system/types/index.ts
/**
 * Represents a chat message.
 *
 * Note: content is encrypted at rest and should be decrypted on the client or server as needed.
 */
export interface ChatMessage {
    id: string;
    tenantId: string;
    conversationId: string;
    sender: string;
    content: string;
    timestamp: number;
    read: boolean;
}
