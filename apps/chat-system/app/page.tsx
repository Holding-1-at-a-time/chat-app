// apps/chat-system/app/page.tsx
import * as React from "react";
import Chat from "../../components/chat";
/**
 * Chat UI page for real-time messaging.
 */
export default function ChatPage() {
    return (
        <div className="container mx-auto p-8 h-screen">
            <h1 className="text-2xl font-bold mb-4">Real-Time Chat</h1>
            <div className="border rounded h-full">
                <Chat />
            </div>
        </div>
    );
}