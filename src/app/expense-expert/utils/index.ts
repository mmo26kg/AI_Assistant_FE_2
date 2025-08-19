import { CARD_COLORS } from "../constants";
import { ToolCall, ToolResult } from "../types";

export const getCardColor = (index: number) => {
    return CARD_COLORS[index % CARD_COLORS.length];
};

export const generateTimestamp = () => {
    return new Date().toLocaleTimeString();
};

export const processToolCalls = (toolCalls: ToolCall[]): ToolResult[] => {
    const extractedResults: ToolResult[] = [];

    // Only create separate cards if there are multiple tool calls
    if (toolCalls.length > 1) {
        // Multiple tool calls - each gets its own card
        toolCalls.forEach((tool: ToolCall, index: number) => {
            extractedResults.push({
                id: `${tool.id}-${index}`,
                toolName: tool.name,
                type: 'Tool Call Result',
                data: {
                    name: tool.name,
                    arguments: tool.arguments,
                    id: tool.id
                },
                timestamp: generateTimestamp()
            });
        });
    } else if (toolCalls.length === 1) {
        // Single tool call - check if it has multiple items in arguments
        const tool = toolCalls[0];
        let hasMultipleItems = false;

        // Check if any argument contains an array with multiple items
        if (tool.arguments) {
            Object.values(tool.arguments).forEach(value => {
                if (Array.isArray(value) && value.length > 1) {
                    hasMultipleItems = true;
                }
            });
        }

        if (hasMultipleItems) {
            // Single tool with multiple items - create one card with all content
            extractedResults.push({
                id: tool.id,
                toolName: tool.name,
                type: 'Tool Call Result',
                data: {
                    name: tool.name,
                    arguments: tool.arguments,
                    id: tool.id
                },
                timestamp: generateTimestamp()
            });
        }
        // If single tool with single items, don't create cards
    }

    return extractedResults;
};

export const scrollToBottom = (containerRef: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current) {
        containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
};
