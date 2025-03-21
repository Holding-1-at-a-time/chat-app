// apps/notification-engine/app/api/sendNotification/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";

const sendNotificationSchema = z.object({
    tenantId: z.string(),
    userId: z.string(),
    message: z.string(),
    type: z.enum(["EMAIL", "SMS", "IN_APP"]),
});

/**
 * POST /api/sendNotification
 * Forward the notification request to the Convex action.
 */
export async function POST(request: NextRequest) {
    try {
        const json = await request.json();
        const data = sendNotificationSchema.parse(json);

        // In production, use a Convex client to call the mutation:
        // const result = await convex.mutate("sendNotification", data);
        console.log("Sending notification:", data);
        return NextResponse.json({ success: true, payload: data });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: (error as Error).message },
            { status: 400 }
        );
    }
}
