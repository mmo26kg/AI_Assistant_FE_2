import { useState, useEffect, useRef } from "react";
import { ChatMessage, ToolResult } from "../types";
import { ChatService } from "../services/ChatService";
import { generateTimestamp, processToolCalls, scrollToBottom } from "../utils";
import { DEFAULT_BASE_URL } from "../constants";

export const useChatManager = () => {
    const [chatInput, setChatInput] = useState("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: 1,
            type: "ai",
            message: "Xin chào! Tôi là AI Assistant của bạn. Hãy mô tả chi tiêu của bạn và tôi sẽ giúp phân tích và tự động thêm vào danh sách.",
            timestamp: generateTimestamp()
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL);
    const [toolResults, setToolResults] = useState<ToolResult[]>([]);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        scrollToBottom(chatContainerRef);
    }, [chatMessages]);

    const handleSendMessage = async () => {
        if (!chatInput.trim()) return;

        const userInputContent = chatInput;

        // Add user message
        const userMessage: ChatMessage = {
            id: Date.now(),
            type: "user",
            message: userInputContent,
            timestamp: generateTimestamp()
        };

        setChatMessages(prev => [...prev, userMessage]);
        setChatInput("");
        setIsLoading(true);

        try {
            const chatService = new ChatService(baseUrl);
            const data = await chatService.sendMessage(userInputContent);

            // Extract AI response
            const aiResponseText = data.success ? data.response : "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.";

            const aiResponse: ChatMessage = {
                id: Date.now() + 1,
                type: "ai",
                message: aiResponseText,
                timestamp: generateTimestamp(),
                toolCalls: data.toolCalls || undefined
            };

            setChatMessages(prev => [...prev, aiResponse]);

            // Process tool calls and extract JSON data for cards
            if (data.toolCalls && data.toolCalls.length > 0) {
                const extractedResults = processToolCalls(data.toolCalls);
                setToolResults(extractedResults);
            }

        } catch (error) {
            console.error('API call failed:', error);

            // Fallback response in case of error
            const errorResponse: ChatMessage = {
                id: Date.now() + 1,
                type: "ai",
                message: `Xin lỗi, có lỗi xảy ra khi kết nối với server. Tuy nhiên, tôi có thể giúp bạn phân tích: "${userInputContent}" có vẻ như là một khoản chi tiêu. Bạn có thể thử lại hoặc nhập thủ công vào form bên dưới.`,
                timestamp: generateTimestamp()
            };

            setChatMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        chatInput,
        setChatInput,
        chatMessages,
        isLoading,
        baseUrl,
        setBaseUrl,
        toolResults,
        setToolResults,
        chatContainerRef,
        handleSendMessage
    };
};
