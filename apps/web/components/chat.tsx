// apps/chat-system/components/Chat.tsx
import React, { useState, useEffect, useRef } from "react";

import type { ChatMessage } from "@apps/web/types/chat.types";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
/**
 * Chat component for sending and receiving messages in real time.
 * Uses WebSockets to receive live updates.
 */
const Chat: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [newMessage, setNewMessage] = useState<string>("");
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Connect to the WebSocket endpoint.
        ws.current = new WebSocket("ws://localhost:3002/chat"); // Replace with production endpoint.
        ws.current.onopen = () => {
            console.log("WebSocket connected for chat");
        };
        ws.current.onmessage = (event: MessageEvent<string>) => {
            try {
                const message: ChatMessage = JSON.parse(event.data);
                setMessages((prev) => [...prev, message]);
            } catch (error) {
                console.error("Error parsing WebSocket message:", error);
            }
        };
        ws.current.onerror = (error: Event) => {
            console.error("WebSocket error:", error);
        };
        ws.current.onclose = () => {
            console.log("WebSocket disconnected");
        };
        return () => {
            ws.current?.close();
        };
    }, []);

    /**
     * Sends a new chat message via the API.
     */
    const sendMessage = async (): Promise<void> => {
        if (!newMessage.trim()) return;
        try {
            const response = await fetch("/api/chatMessage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tenantId: "tenant_abc",
                    conversationId: "conv_default",
                    sender: "Business", // In production, use the authenticated user's ID.
                    content: newMessage.trim(),
                }),
            });
            const data = await response.json();
            if (data.success) {
                setMessages((prev) => [...prev, data.message as ChatMessage]);
                setNewMessage("");
            }
        } catch (error) {
            console.error("Error sending chat message:", error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className="p-2 border rounded">
                        <div className="text-sm font-semibold">{msg.sender}</div>
                        <div className="text-sm">{msg.content}</div>
                        <div className="text-xs text-gray-500">
                            {new Date(msg.timestamp).toLocaleTimeString()}{" "}
                            {msg.read ? "✓ Read" : "• Unread"}
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 flex space-x-2">
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Enter your message..."
                />
                <Button onClick={sendMessage}>Send</Button>
            </div>
        </div>
    );
};

export default Chat;
