// apps/notification-engine/app/layout.tsx
import React, { JSX } from "react";
import "../../styles/globals.css";

/**
 * Root layout for the Notification Engine.
 *
 * @param props - React children.
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en">
            <head>
                <title>Auto Detailer - Notification Engine</title>
            </head>
            <body>{children}</body>
        </html>
    );
}
