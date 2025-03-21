// apps/chat-system/app/layout.tsx
import React from "react";
import "../../styles/globals.css";
import { JSX } from "react/jsx-runtime";

/**
 * Root layout for the Chat System.
 *
 * @param props - React children.
 */
export default function ChatRootLayout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {
    return (
        <html lang="en">
            <head>
                <title>Auto Detailer Chat System</title>
            </head>
            <body>{children}</body>
        </html>
    );
}
