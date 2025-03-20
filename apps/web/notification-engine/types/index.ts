// apps/notification-engine/types/index.ts

export type NotificationType = "EMAIL" | "SMS" | "IN_APP";

export interface Notification {
    id: string;
    tenantId: string;
    userId: string;
    message: string;
    type: NotificationType;
    status: "Delivered" | "Failed" | "Pending";
    deliveredAt?: number;
}

export interface UserSettings {
    emailEnabled: boolean;
    smsEnabled: boolean;
    inAppEnabled: boolean;
}

export interface User {
    id: string;
    tenantId: string;
    email: string;
    phone: string;
    settings: UserSettings;
}
