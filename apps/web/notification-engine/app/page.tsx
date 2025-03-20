// apps/notification-engine/app/page.tsx
import { Button } from "@workspace/ui/components/button";
import React, { JSX, useState } from "react";

/**
 * Dashboard page for sending appointment/payment alerts.
 *
 * In production, tenant and user IDs come from the authentication context.
 */
export default function NotificationDashboard(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Handler to send a notification via the API.
     */
    const handleSendAlert = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetch("/api/sendNotification", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tenantId: "tenant_abc",
                    userId: "user_123",
                    message: "Your appointment is confirmed. Please complete your payment.",
                    type: "EMAIL",
                }),
            });
            const data = await response.json();
            console.log("Notification response:", data);
        } catch (error) {
            console.error("Error sending alert:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-4">
                Notification Engine Dashboard
            </h1>
            <Button onClick={handleSendAlert} disabled={loading}>
                {loading ? "Sending Alert..." : "Send Alert Notification"}
            </Button>
        </div>
    );
}
