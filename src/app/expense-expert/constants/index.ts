import { CardColor } from "../types";

export const CARD_COLORS: CardColor[] = [
    {
        bg: 'bg-blue-50 dark:bg-blue-950/30',
        border: 'border-blue-200 dark:border-blue-800/50',
        accent: 'blue',
        dot: 'bg-blue-500',
        text: 'text-blue-700 dark:text-blue-300'
    },
    {
        bg: 'bg-green-50 dark:bg-green-950/30',
        border: 'border-green-200 dark:border-green-800/50',
        accent: 'green',
        dot: 'bg-green-500',
        text: 'text-green-700 dark:text-green-300'
    },
    {
        bg: 'bg-purple-50 dark:bg-purple-950/30',
        border: 'border-purple-200 dark:border-purple-800/50',
        accent: 'purple',
        dot: 'bg-purple-500',
        text: 'text-purple-700 dark:text-purple-300'
    },
    {
        bg: 'bg-orange-50 dark:bg-orange-950/30',
        border: 'border-orange-200 dark:border-orange-800/50',
        accent: 'orange',
        dot: 'bg-orange-500',
        text: 'text-orange-700 dark:text-orange-300'
    },
    {
        bg: 'bg-pink-50 dark:bg-pink-950/30',
        border: 'border-pink-200 dark:border-pink-800/50',
        accent: 'pink',
        dot: 'bg-pink-500',
        text: 'text-pink-700 dark:text-pink-300'
    },
    {
        bg: 'bg-cyan-50 dark:bg-cyan-950/30',
        border: 'border-cyan-200 dark:border-cyan-800/50',
        accent: 'cyan',
        dot: 'bg-cyan-500',
        text: 'text-cyan-700 dark:text-cyan-300'
    },
    {
        bg: 'bg-yellow-50 dark:bg-yellow-950/30',
        border: 'border-yellow-200 dark:border-yellow-800/50',
        accent: 'yellow',
        dot: 'bg-yellow-500',
        text: 'text-yellow-700 dark:text-yellow-300'
    },
    {
        bg: 'bg-indigo-50 dark:bg-indigo-950/30',
        border: 'border-indigo-200 dark:border-indigo-800/50',
        accent: 'indigo',
        dot: 'bg-indigo-500',
        text: 'text-indigo-700 dark:text-indigo-300'
    }
];

export const QUICK_SUGGESTIONS = [
    "Mua cà phê 45,000₫",
    "Taxi về nhà 120,000₫",
    "Ăn trưa 85,000₫",
    "Xem phim 180,000₫"
];

export const DEFAULT_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export const SYSTEM_PROMPT = "You are a Vietnamese expense tracking assistant. Analyze user's expense description and help categorize it with amount estimation. Respond in Vietnamese. Today is Aug 19, 2025.";

export const CHAT_OPTIONS = {
    temperature: 0.7,
    maxTokens: 1000
};
