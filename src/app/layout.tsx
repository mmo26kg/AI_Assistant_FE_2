import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
    title: "KATCHX - Your Intuitive AI Companion",
    description: "The AI that catches the subtle signals of what you need and delivers solutions before you even ask. Catch what matters with KATCHX.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                    document.documentElement.classList.add('dark')
                                } else {
                                    document.documentElement.classList.remove('dark')
                                }
                            } catch (_) {}
                        `,
                    }}
                />
            </head>
            <body className="min-h-screen bg-background text-foreground font-inter" suppressHydrationWarning>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem={true}
                    storageKey="ai-assistant-theme"
                >
                    <Navigation />
                    <div>
                        {children}
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
