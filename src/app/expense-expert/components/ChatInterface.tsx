import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, User, Send } from "lucide-react";
import { ChatMessage } from "../types";
import { QUICK_SUGGESTIONS } from "../constants";

interface ChatInterfaceProps {
    messages: ChatMessage[];
    inputValue: string;
    onInputChange: (input: string) => void;
    isLoading: boolean;
    onSendMessage: () => void;
    onQuickSuggestion?: (suggestion: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    messages,
    inputValue,
    onInputChange,
    isLoading,
    onSendMessage,
    onQuickSuggestion
}) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            onSendMessage();
        }
    };

    return (
        <div className="lg:col-span-4">{/* adjusted from 3 to 4 */}
            <Card className="glass-effect border border-primary/20 hover-lift h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-mono">
                        <Bot className="w-5 h-5 text-primary" />
                        AI Expense Assistant
                    </CardTitle>
                    <CardDescription>Mô tả chi tiêu bằng ngôn ngữ tự nhiên và để AI giúp bạn phân tích</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-full">
                    {/* Chat Messages */}
                    <div
                        className="max-h-[60vh] overflow-y-auto mb-4 p-4 glass-effect border border-white/10 rounded-lg space-y-3 flex-1 scroll-smooth"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.type === 'ai' && (
                                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                )}
                                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.type === 'user'
                                    ? 'bg-primary text-primary-foreground ml-auto'
                                    : 'bg-muted text-foreground'
                                    }`}>
                                    <p className="text-sm">{msg.message}</p>

                                    {/* Display tool calls if available */}
                                    {msg.toolCalls && msg.toolCalls.length > 0 && (
                                        <div className="mt-2 p-2 bg-primary/10 rounded text-xs">
                                            <p className="font-semibold text-primary mb-1">🛠️ Tool Actions:</p>
                                            {msg.toolCalls.map((tool, index) => (
                                                <div key={index} className="mb-1">
                                                    <span className="font-medium">{tool.name}:</span>
                                                    <div className="ml-2 opacity-80">
                                                        {tool.arguments && Object.entries(tool.arguments).map(([key, value]) => (
                                                            <div key={key}>
                                                                <span className="capitalize">{key}:</span> {
                                                                    Array.isArray(value) ? value.join(', ') : String(value)
                                                                }
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <span className="text-xs opacity-70 mt-1 block">{msg.timestamp}</span>
                                </div>
                                {msg.type === 'user' && (
                                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                                        <User className="w-4 h-4 text-foreground" />
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex gap-3 justify-start">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                    <Bot className="w-4 h-4 text-white" />
                                </div>
                                <div className="bg-muted px-4 py-2 rounded-lg">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chat Input */}
                    <div className="flex gap-2 mt-auto">
                        <Input
                            placeholder="Mô tả chi tiêu của bạn... (VD: Vừa mua cà phê highland 45k)"
                            value={inputValue}
                            onChange={(e) => onInputChange(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="glass-effect border-primary/20"
                            disabled={isLoading}
                        />
                        <Button
                            onClick={onSendMessage}
                            disabled={isLoading || !inputValue.trim()}
                            className="bg-primary hover:bg-primary/90 px-4"
                        >
                            <Send className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Quick Suggestions moved BELOW input */}
                    {onQuickSuggestion && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {QUICK_SUGGESTIONS.map(s => (
                                <Button
                                    key={s}
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onQuickSuggestion(s)}
                                    className="text-xs glass-effect border-primary/10 hover:border-primary/40 hover:bg-primary/10"
                                >
                                    {s}
                                </Button>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
