// apps/chat-system/convex/chat.ts
import { v } from "convex/values";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
// ENCRYPTION_KEY must be a 32-byte hexadecimal string.
const encryptionKey = process.env.ENCRYPTION_KEY;
if (!encryptionKey) {
    throw new Error("ENCRYPTION_KEY is not defined.");
}

/**
 * Encrypts a plaintext message using AES-256-CBC.
 *
 * @param text - The plaintext message.
 * @returns The encrypted message in the format "iv:ciphertext".
 */
function encryptText(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(encryptionKey, "hex"),
        iv
    );
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
}

/**
 * Convex action to store an encrypted chat message.
 * Enforces multi-tenant isolation.
 */
export const sendChatMessage = internalAction({
    args: {
        tenantId: v.string(),
        conversationId: v.string(),
        sender: v.string(),
        content: v.string(),
    },
    handler: async (ctx, { tenantId, conversationId, sender, content }) => {
        // Encrypt the chat content.
        const encryptedContent = encryptText(content);
        return await ctx.db.insert("chat_messages", {
            tenantId,
            conversationId,
            sender,
            content: encryptedContent,
            timestamp: Date.now(),
            read: false,
        });
    },
});
