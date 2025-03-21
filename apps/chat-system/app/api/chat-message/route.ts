// apps/chat-system/app/api/chatMessage/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const chatMessageSchema = z.object({
    tenantId: z.string(),
    conversationId: z.string(),
    sender: z.string(),
    content: z.string(),
});

/**
 * POST /api/chatMessage
 * Processes a new chat message.
 */
export async function POST(request: NextRequest) {
    try {
        const json = await request.json();
        const data = chatMessageSchema.parse(json);

        // In production, call the Convex mutation (e.g., using convex.mutate("sendChatMessage", data))
        // Here we echo the message with a generated ID and timestamp.
        const message = {
            ...data,
            id: `${Date.now()}`,
            timestamp: Date.now(),
            read: false,
        };
        console.log("Received chat message:", message);
        return NextResponse.json({ success: true, message });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 400 }
        );
    }
}
