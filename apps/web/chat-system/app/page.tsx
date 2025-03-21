// apps/chat-system/app/page.tsx
import Chat from "@/components/chat";
import React, { JSX } from "react";

/**
 * Chat UI page for real-time messaging.
 */
export default function ChatPage(): JSX.Element {
    return (
        <div className="container mx-auto p-8 h-screen">
            <h1 className="text-2xl font-bold mb-4">Real-Time Chat</h1>
            <div className="border rounded h-full">
                <Chat />
            </div>
        </div>
    );
}
