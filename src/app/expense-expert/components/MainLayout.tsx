import React from "react";
import { HeroSection } from "./HeroSection";
import { SettingsPanel } from "./SettingsPanel";
import { ChatInterface } from "./ChatInterface";
import { ToolResults } from "./ToolResults";
import { QuickAddExpense } from "./QuickAddExpense";
import { StatisticsCards } from "./StatisticsCards";
import { RecentTransactions } from "./RecentTransactions";
import { ExpenseCategories } from "./ExpenseCategories";
import { ActionButtons } from "./ActionButtons";
import { useChatManager } from "../hooks/useChatManager";
import { useToolResults } from "../hooks/useToolResults";

interface MainLayoutProps {
    showAddExpense: boolean;
    showSettings: boolean;
    baseUrl: string;
    onToggleAddExpense: () => void;
    onToggleSettings: () => void;
    onBaseUrlChange: (url: string) => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    showAddExpense,
    showSettings,
    baseUrl,
    onToggleAddExpense,
    onToggleSettings,
    onBaseUrlChange
}) => {
    const {
        chatMessages,
        isLoading,
        chatInput,
        setChatInput,
        handleSendMessage,
        toolResults
    } = useChatManager();

    const {
        expandedCards,
        toggleCardExpansion
    } = useToolResults();

    const handleQuickSuggestion = (suggestion: string) => {
        setChatInput(suggestion);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <g fill="none" fillRule="evenodd">
                        <g fill="#9C92AC" fillOpacity="0.05">
                            <path d="m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z" />
                        </g>
                    </g>
                </svg>
            </div>

            <div className="relative z-10">
                <HeroSection
                    onShowSettings={onToggleSettings}
                    onShowAddExpense={onToggleAddExpense}
                />

                {/* Settings Panel */}
                {showSettings && (
                    <SettingsPanel
                        baseUrl={baseUrl}
                        onClose={onToggleSettings}
                    />
                )}

                {/* Quick Add Expense */}
                {showAddExpense && (
                    <QuickAddExpense />
                )}

                <div className="container mx-auto px-4 pb-8">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-8">
                            {/* Chat Interface */}
                            <ChatInterface
                                messages={chatMessages}
                                isLoading={isLoading}
                                inputValue={chatInput}
                                onInputChange={setChatInput}
                                onSendMessage={handleSendMessage}
                                onQuickSuggestion={handleQuickSuggestion}
                            />

                            {/* Tool Results */}
                            <ToolResults
                                toolResults={toolResults}
                                expandedCards={expandedCards}
                                onToggleCard={toggleCardExpansion}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Statistics Cards */}
                            <StatisticsCards />

                            {/* Action Buttons */}
                            <ActionButtons onShowAddExpense={onToggleAddExpense} />

                            {/* Recent Transactions */}
                            <RecentTransactions />

                            {/* Expense Categories */}
                            <ExpenseCategories />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
