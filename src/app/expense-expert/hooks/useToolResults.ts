import { useState } from "react";
import { ToolResult } from "../types";

export const useToolResults = () => {
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

    const toggleCardExpansion = (cardId: string) => {
        setExpandedCards(prev => {
            const newSet = new Set(prev);
            if (newSet.has(cardId)) {
                newSet.delete(cardId);
            } else {
                newSet.add(cardId);
            }
            return newSet;
        });
    };

    const expandAllCards = (toolResults: ToolResult[]) => {
        const allCardIds = toolResults.map(result => result.id);
        setExpandedCards(new Set(allCardIds));
    };

    const collapseAllCards = () => {
        setExpandedCards(new Set());
    };

    return {
        expandedCards,
        setExpandedCards,
        toggleCardExpansion,
        expandAllCards,
        collapseAllCards
    };
};
