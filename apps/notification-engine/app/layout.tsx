// apps/notification-engine/app/layout.tsx
import React, { JSX } from "react";
import "../../styles/globals.css";
import { Providers } from "../../components/providers";
import { ConvexClientProvider } from "../../components/ConvexClientProvider";

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
            <body>
                <Providers>
                    <ConvexClientProvider>
                        {children}
                    </ConvexClientProvider>
                </Providers>
            </body>
        </html>
    );
}
