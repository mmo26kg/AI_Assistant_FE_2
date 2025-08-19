// Types for Expense Expert application

export interface ToolCall {
    name: string;
    arguments: Record<string, any>;
    id: string;
}

export interface ChatMessage {
    id: number;
    type: "user" | "ai";
    message: string;
    timestamp: string;
    toolCalls?: ToolCall[];
}

export interface ToolResult {
    id: string;
    toolName: string;
    type: string;
    data: {
        name: string;
        arguments: Record<string, any>;
        id: string;
    };
    timestamp: string;
}

export interface CardColor {
    bg: string;
    border: string;
    accent: string;
    dot: string;
    text: string;
}

export interface Transaction {
    desc: string;
    amount: string;
    category: string;
    time: string;
    icon: React.ReactNode;
    iconColor: string;
    bgColor: string;
    badgeBg: string;
    badgeText: string;
}

export interface ExpenseCategory {
    category: string;
    amount: string;
    percent: number;
    color: string;
    icon: React.ReactNode;
    iconColor: string;
}

export interface StatCard {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down" | "neutral";
    icon: React.ReactNode;
    color: string;
}
