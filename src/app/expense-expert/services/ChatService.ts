import { SYSTEM_PROMPT, CHAT_OPTIONS } from "../constants";

export interface ChatRequest {
    messages: {
        role: string;
        content: string;
    }[];
    systemPrompt?: string;
    options?: {
        temperature: number;
        maxTokens: number;
    };
}

export interface ChatResponse {
    success: boolean;
    response: string;
    toolCalls?: any[];
}

export class ChatService {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async sendMessage(userInput: string): Promise<ChatResponse> {
        const requestBody: ChatRequest = {
            messages: [
                {
                    role: "user",
                    content: userInput
                }
            ],
            systemPrompt: SYSTEM_PROMPT,
            options: CHAT_OPTIONS
        };

        const response = await fetch(`${this.baseUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }
}
