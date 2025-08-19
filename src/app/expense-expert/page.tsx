"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, TrendingUp, TrendingDown, DollarSign, PieChart, Calendar, Target, Settings, BarChart3, Coffee, Car, ShoppingBag, Film, Home, FileText, Utensils, MessageSquare, Send, Bot, User, X, ChevronDown, ChevronUp } from "lucide-react";

// Define types for better TypeScript support
interface ToolCall {
    name: string;
    arguments: Record<string, any>;
    id: string;
}

interface ChatMessage {
    id: number;
    type: "user" | "ai";
    message: string;
    timestamp: string;
    toolCalls?: ToolCall[];
}

export default function ExpenseExpert() {
    const [chatInput, setChatInput] = useState("");
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [baseUrl, setBaseUrl] = useState("http://localhost:3000");
    const [toolResults, setToolResults] = useState<any[]>([]);
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
    const chatMessagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    // Utility function to safely create timestamp on client side
    const createTimestamp = () => {
        if (typeof window !== 'undefined') {
            return new Date().toLocaleTimeString();
        }
        return '';
    };

    // Initialize chat messages after component mount to avoid hydration mismatch
    useEffect(() => {
        if (!isInitialized) {
            setChatMessages([
                {
                    id: 1,
                    type: "ai",
                    message: "Xin chào! Tôi là AI Assistant của bạn. Hãy mô tả chi tiêu của bạn và tôi sẽ giúp phân tích và tự động thêm vào danh sách.",
                    timestamp: createTimestamp()
                }
            ]);
            setIsInitialized(true);
        }
    }, [isInitialized]);

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [chatMessages]);

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

    const expandAllCards = () => {
        const allCardIds = toolResults.map(result => result.id);
        setExpandedCards(new Set(allCardIds));
    };

    const collapseAllCards = () => {
        setExpandedCards(new Set());
    };

    // Color palette for cards
    const cardColors = [
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

    const getCardColor = (index: number) => {
        return cardColors[index % cardColors.length];
    };

    const handleSendMessage = async () => {
        if (!chatInput.trim()) return;

        const userInputContent = chatInput;

        // Add user message
        const userMessage: ChatMessage = {
            id: Date.now(),
            type: "user",
            message: userInputContent,
            timestamp: createTimestamp()
        };

        setChatMessages(prev => [...prev, userMessage]);
        setChatInput("");
        setIsLoading(true);

        try {
            // Call API
            const response = await fetch(`${baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: "user",
                            content: userInputContent
                        }
                    ],
                    systemPrompt: "You are a Vietnamese expense tracking assistant. Analyze user's expense description and help categorize it with amount estimation. Respond in Vietnamese. Today is Aug 19, 2025.",
                    options: {
                        temperature: 0.7,
                        maxTokens: 1000
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Extract AI response
            const aiResponseText = data.success ? data.response : "Xin lỗi, tôi không thể xử lý yêu cầu của bạn lúc này.";

            const aiResponse: ChatMessage = {
                id: Date.now() + 1,
                type: "ai",
                message: aiResponseText,
                timestamp: createTimestamp(),
                toolCalls: data.toolCalls || undefined
            };

            setChatMessages(prev => [...prev, aiResponse]);

            // Process tool calls and extract JSON data for cards
            if (data.toolCalls && data.toolCalls.length > 0) {
                const extractedResults: any[] = [];

                // Only create separate cards if there are multiple tool calls
                if (data.toolCalls.length > 1) {
                    // Multiple tool calls - each gets its own card
                    data.toolCalls.forEach((tool: ToolCall, index: number) => {
                        extractedResults.push({
                            id: `${tool.id}-${index}`,
                            toolName: tool.name,
                            type: 'Tool Call Result',
                            data: {
                                name: tool.name,
                                arguments: tool.arguments,
                                id: tool.id
                            },
                            timestamp: createTimestamp()
                        });
                    });
                } else if (data.toolCalls.length === 1) {
                    // Single tool call - check if it has multiple items in arguments
                    const tool = data.toolCalls[0];
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
                            timestamp: createTimestamp()
                        });
                    }
                    // If single tool with single items, don't create cards
                }

                setToolResults(extractedResults);
            }

        } catch (error) {
            console.error('API call failed:', error);

            // Fallback response in case of error
            const errorResponse: ChatMessage = {
                id: Date.now() + 1,
                type: "ai",
                message: `Xin lỗi, có lỗi xảy ra khi kết nối với server. Tuy nhiên, tôi có thể giúp bạn phân tích: "${userInputContent}" có vẻ như là một khoản chi tiêu. Bạn có thể thử lại hoặc nhập thủ công vào form bên dưới.`,
                timestamp: createTimestamp()
            };

            setChatMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-16">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 gradient-bg">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/4 via-muted/2 to-primary/5"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-16 h-16 bg-primary/8 rounded-full animate-float"></div>
                    <div className="absolute top-40 right-20 w-12 h-12 bg-primary/6 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-20 left-20 w-20 h-20 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-primary/20 mb-8 animate-pulse-soft">
                        <DollarSign className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-foreground/80">Smart Financial Management</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold font-mono mb-6">
                        <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            Expense Expert
                        </span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
                        Chuyên gia quản lý chi tiêu thông minh - Theo dõi, phân tích và tối ưu hóa tài chính cá nhân
                        với công nghệ AI tiên tiến
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 pb-12">
                {/* AI Chat Assistant - New Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
                    {/* Left Column: Settings & Quick Suggestions */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* API Configuration */}
                        <Card className="glass-effect border border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-mono text-sm">
                                    <Settings className="w-4 h-4 text-primary" />
                                    API Configuration
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Input
                                    placeholder="Base URL (VD: http://localhost:3000)"
                                    value={baseUrl}
                                    onChange={(e) => setBaseUrl(e.target.value)}
                                    className="text-xs glass-effect border-primary/20"
                                />
                            </CardContent>
                        </Card>

                        {/* Quick Suggestions */}
                        <Card className="glass-effect border border-primary/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 font-mono text-sm">
                                    <MessageSquare className="w-4 h-4 text-primary" />
                                    Gợi Ý Nhanh
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2">
                                    {[
                                        "Mua cà phê 45,000₫",
                                        "Taxi về nhà 120,000₫",
                                        "Ăn trưa 85,000₫",
                                        "Xem phim 180,000₫"
                                    ].map((suggestion, index) => (
                                        <Button
                                            key={index}
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setChatInput(suggestion)}
                                            className="text-xs border-primary/20 hover:bg-primary/5 justify-start w-full"
                                        >
                                            {suggestion}
                                        </Button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Center Column: Chat Interface */}
                    <div className="lg:col-span-3">
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
                                    ref={chatContainerRef}
                                    className="max-h-[60vh] overflow-y-auto mb-4 p-4 glass-effect border border-white/10 rounded-lg space-y-3 flex-1 scroll-smooth"
                                    style={{ scrollBehavior: 'smooth' }}
                                >
                                    {chatMessages.map((msg) => (
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
                                    {/* Auto scroll anchor */}
                                    <div ref={chatMessagesEndRef} />
                                </div>

                                {/* Chat Input */}
                                <div className="flex gap-2 mt-auto">
                                    <Input
                                        placeholder="Mô tả chi tiêu của bạn... (VD: Vừa mua cà phê highland 45k)"
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                        className="glass-effect border-primary/20"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        onClick={handleSendMessage}
                                        disabled={isLoading || !chatInput.trim()}
                                        className="bg-primary hover:bg-primary/90 px-4"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Tool Results */}
                    <div className="lg:col-span-2">
                        <Card className="glass-effect border border-primary/20 hover-lift h-full">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="flex items-center gap-2 font-mono">
                                            <Settings className="w-5 h-5 text-primary" />
                                            Tool Results
                                        </CardTitle>
                                        <CardDescription>Kết quả từ AI tool calls</CardDescription>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {toolResults.length > 0 && (
                                            <>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={expandedCards.size === toolResults.length ? collapseAllCards : expandAllCards}
                                                    className="text-xs border-primary/20 hover:bg-primary/5 px-2"
                                                    title={expandedCards.size === toolResults.length ? "Collapse All" : "Expand All"}
                                                >
                                                    {expandedCards.size === toolResults.length ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                        setToolResults([]);
                                                        setExpandedCards(new Set());
                                                    }}
                                                    className="text-xs border-primary/20 hover:bg-primary/5"
                                                >
                                                    Clear
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="max-h-[60vh] overflow-y-auto space-y-4 scroll-smooth">
                                    {toolResults.length === 0 ? (
                                        <div className="text-center text-muted-foreground py-8">
                                            <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                            <p className="text-sm">Chưa có kết quả tool nào</p>
                                            <p className="text-xs mt-1">Tool results sẽ hiển thị ở đây</p>
                                        </div>
                                    ) : (
                                        toolResults.map((result, index) => {
                                            const isExpanded = expandedCards.has(result.id);
                                            const cardColor = getCardColor(index);
                                            return (
                                                <Card key={result.id} className={`${cardColor.border} ${cardColor.bg} hover:shadow-md transition-all duration-200`}>
                                                    <CardHeader className="pb-2">
                                                        <div className="flex items-center justify-between">
                                                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                                                <div className={`w-2 h-2 ${cardColor.dot} rounded-full`}></div>
                                                                <span className={cardColor.text}>{result.toolName}</span>
                                                            </CardTitle>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs text-muted-foreground">{result.timestamp}</span>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => toggleCardExpansion(result.id)}
                                                                    className={`h-6 w-6 p-0 hover:bg-${cardColor.accent}-500/10`}
                                                                >
                                                                    {isExpanded ? (
                                                                        <ChevronUp className="w-3 h-3" />
                                                                    ) : (
                                                                        <ChevronDown className="w-3 h-3" />
                                                                    )}
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </CardHeader>
                                                    <CardContent className="pt-0">
                                                        {/* Compact View - Always Visible */}
                                                        <div className={`mb-3 p-2 bg-${cardColor.accent}-500/5 rounded-lg border border-${cardColor.accent}-500/10`}>
                                                            {/* Quick preview of arguments count */}
                                                            {result.data.arguments && (
                                                                <div className="text-xs text-muted-foreground">
                                                                    {Object.keys(result.data.arguments).length} argument(s)
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Expanded View - Conditionally Visible */}
                                                        {isExpanded && (
                                                            <div className="space-y-3">
                                                                {/* Arguments Content */}
                                                                {result.data.arguments && (
                                                                    <div className="space-y-3">
                                                                        <h4 className="text-xs font-semibold text-foreground">Arguments:</h4>
                                                                        {Object.entries(result.data.arguments).map(([key, value]) => (
                                                                            <div key={key} className="space-y-2">
                                                                                <div className="flex items-center gap-2">
                                                                                    <div className={`w-1 h-4 bg-${cardColor.accent}-500 rounded-full`}></div>
                                                                                    <span className="text-sm font-medium capitalize">{key}</span>
                                                                                </div>

                                                                                {Array.isArray(value) ? (
                                                                                    <div className="ml-3 space-y-2">
                                                                                        {value.map((item, index) => (
                                                                                            <div key={index} className={`bg-${cardColor.accent}-500/5 rounded-lg p-3 border border-${cardColor.accent}-500/10`}>
                                                                                                <div className="text-xs text-muted-foreground mb-2">Item {index + 1}</div>
                                                                                                {typeof item === 'object' ? (
                                                                                                    <div className="space-y-1">
                                                                                                        {Object.entries(item).map(([itemKey, itemValue]) => (
                                                                                                            <div key={itemKey} className="flex justify-between items-center">
                                                                                                                <span className="text-xs text-muted-foreground capitalize">{itemKey}:</span>
                                                                                                                <span className="text-sm font-mono">{String(itemValue)}</span>
                                                                                                            </div>
                                                                                                        ))}
                                                                                                    </div>
                                                                                                ) : (
                                                                                                    <span className="text-sm font-mono">{String(item)}</span>
                                                                                                )}
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                ) : typeof value === 'object' && value !== null ? (
                                                                                    <div className={`ml-3 bg-${cardColor.accent}-500/5 rounded-lg p-3 border border-${cardColor.accent}-500/10`}>
                                                                                        <div className="space-y-1">
                                                                                            {Object.entries(value).map(([objKey, objValue]) => (
                                                                                                <div key={objKey} className="flex justify-between items-center">
                                                                                                    <span className="text-xs text-muted-foreground capitalize">{objKey}:</span>
                                                                                                    <span className="text-sm font-mono">{String(objValue)}</span>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className={`ml-3 bg-${cardColor.accent}-500/5 rounded-lg p-2 border border-${cardColor.accent}-500/10`}>
                                                                                        <span className="text-sm font-mono">{String(value)}</span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                {/* Raw JSON (collapsible) */}
                                                                <details className="mt-4">
                                                                    <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                                                                        Raw JSON Data
                                                                    </summary>
                                                                    <div className={`mt-2 bg-${cardColor.accent}-500/5 rounded-lg p-3 border border-${cardColor.accent}-500/10`}>
                                                                        <pre className="text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                                                                            {JSON.stringify(result.data, null, 2)}
                                                                        </pre>
                                                                    </div>
                                                                </details>
                                                            </div>
                                                        )}
                                                    </CardContent>
                                                </Card>
                                            )
                                        })
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Quick Add Expense */}
                <Card className="mb-8 glass-effect border border-white/10 hover-lift">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 font-mono">
                            <Plus className="w-5 h-5 text-primary" />
                            Thêm Chi Tiêu Nhanh
                        </CardTitle>
                        <CardDescription>Ghi lại các khoản chi tiêu hàng ngày một cách dễ dàng</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <Input placeholder="Số tiền (VNĐ)" type="number" className="glass-effect border-primary/20" />
                            <Input placeholder="Mô tả chi tiêu" className="glass-effect border-primary/20" />
                            <select className="flex h-10 w-full rounded-lg border border-primary/20 glass-effect px-3 py-2 text-sm">
                                <option>Ăn uống</option>
                                <option>Di chuyển</option>
                                <option>Mua sắm</option>
                                <option>Giải trí</option>
                                <option>Hóa đơn</option>
                                <option>Khác</option>
                            </select>
                            <Button className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300">
                                <Plus className="w-4 h-4 mr-2" />
                                Thêm
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        {
                            title: "Chi Tiêu Hôm Nay",
                            value: "245,000₫",
                            change: "+12%",
                            trend: "up",
                            icon: <Calendar className="w-5 h-5" />,
                            color: "from-red-500 to-pink-500"
                        },
                        {
                            title: "Chi Tiêu Tuần Này",
                            value: "1,650,000₫",
                            change: "-5%",
                            trend: "down",
                            icon: <BarChart3 className="w-5 h-5" />,
                            color: "from-orange-500 to-yellow-500"
                        },
                        {
                            title: "Chi Tiêu Tháng Này",
                            value: "6,890,000₫",
                            change: "Còn lại 3,110,000₫",
                            trend: "neutral",
                            icon: <PieChart className="w-5 h-5" />,
                            color: "from-blue-500 to-cyan-500"
                        },
                        {
                            title: "Tiết Kiệm",
                            value: "2,340,000₫",
                            change: "+8%",
                            trend: "up",
                            icon: <Target className="w-5 h-5" />,
                            color: "from-green-500 to-emerald-500"
                        }
                    ].map((stat, index) => (
                        <Card key={index} className="glass-effect border border-white/10 hover-lift group">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">
                                        {stat.title}
                                    </CardTitle>
                                    <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                                        {stat.icon}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold font-mono gradient-text mb-1">
                                    {stat.value}
                                </div>
                                <div className="flex items-center text-xs">
                                    {stat.trend === "up" && <TrendingUp className="w-3 h-3 text-green-500 mr-1" />}
                                    {stat.trend === "down" && <TrendingDown className="w-3 h-3 text-red-500 mr-1" />}
                                    <span className={`${stat.trend === "up" ? "text-green-500" :
                                        stat.trend === "down" ? "text-red-500" :
                                            "text-muted-foreground"
                                        }`}>
                                        {stat.change}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Recent Transactions & Categories */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Recent Transactions */}
                    <Card className="glass-effect border border-white/10 hover-lift">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-mono">
                                <BarChart3 className="w-5 h-5 text-primary" />
                                Giao Dịch Gần Đây
                            </CardTitle>
                            <CardDescription>Theo dõi các khoản chi tiêu mới nhất của bạn</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { desc: "Cà phê sáng tại Highland", amount: "45,000₫", category: "Ăn uống", time: "8:30 AM", icon: <Coffee className="w-4 h-4" />, iconColor: "text-amber-600", bgColor: "bg-amber-100 dark:bg-amber-900/30", badgeBg: "bg-amber-100 dark:bg-amber-900/30", badgeText: "text-amber-700 dark:text-amber-300" },
                                    { desc: "Taxi về nhà từ công ty", amount: "120,000₫", category: "Di chuyển", time: "6:45 PM", icon: <Car className="w-4 h-4" />, iconColor: "text-blue-600", bgColor: "bg-blue-100 dark:bg-blue-900/30", badgeBg: "bg-blue-100 dark:bg-blue-900/30", badgeText: "text-blue-700 dark:text-blue-300" },
                                    { desc: "Mua đồ văn phòng tại Fahasa", amount: "280,000₫", category: "Mua sắm", time: "2:15 PM", icon: <ShoppingBag className="w-4 h-4" />, iconColor: "text-green-600", bgColor: "bg-green-100 dark:bg-green-900/30", badgeBg: "bg-green-100 dark:bg-green-900/30", badgeText: "text-green-700 dark:text-green-300" },
                                    { desc: "Xem phim CGV", amount: "180,000₫", category: "Giải trí", time: "7:30 PM", icon: <Film className="w-4 h-4" />, iconColor: "text-purple-600", bgColor: "bg-purple-100 dark:bg-purple-900/30", badgeBg: "bg-purple-100 dark:bg-purple-900/30", badgeText: "text-purple-700 dark:text-purple-300" },
                                ].map((transaction, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 glass-effect border border-white/5 rounded-xl hover:border-primary/30 transition-all duration-300 group">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${transaction.bgColor}`}>
                                                {React.cloneElement(transaction.icon, { className: `w-4 h-4 ${transaction.iconColor}` })}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-foreground">{transaction.desc}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="secondary" className={`text-xs ${transaction.badgeBg} ${transaction.badgeText}`}>
                                                        {transaction.category}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">{transaction.time}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-red-500 font-mono">-{transaction.amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Expense Categories */}
                    <Card className="glass-effect border border-white/10 hover-lift">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-mono">
                                <PieChart className="w-5 h-5 text-primary" />
                                Phân Tích Theo Danh Mục
                            </CardTitle>
                            <CardDescription>Xem phân bố chi tiêu theo từng danh mục</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {[
                                    { category: "Ăn uống", amount: "2,450,000₫", percent: 35, color: "bg-gradient-to-r from-red-500 to-pink-500", icon: <Utensils className="w-4 h-4" />, iconColor: "text-red-600" },
                                    { category: "Di chuyển", amount: "1,680,000₫", percent: 25, color: "bg-gradient-to-r from-blue-500 to-cyan-500", icon: <Car className="w-4 h-4" />, iconColor: "text-blue-600" },
                                    { category: "Mua sắm", amount: "1,200,000₫", percent: 18, color: "bg-gradient-to-r from-green-500 to-emerald-500", icon: <ShoppingBag className="w-4 h-4" />, iconColor: "text-green-600" },
                                    { category: "Giải trí", amount: "980,000₫", percent: 15, color: "bg-gradient-to-r from-purple-500 to-violet-500", icon: <Film className="w-4 h-4" />, iconColor: "text-purple-600" },
                                    { category: "Hóa đơn", amount: "580,000₫", percent: 7, color: "bg-gradient-to-r from-orange-500 to-yellow-500", icon: <Home className="w-4 h-4" />, iconColor: "text-orange-600" },
                                ].map((item, index) => (
                                    <div key={index} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <div className={`p-1.5 rounded-lg bg-white/10 ${item.iconColor}`}>
                                                    {item.icon}
                                                </div>
                                                <span className="font-medium text-foreground">{item.category}</span>
                                            </div>
                                            <span className="font-bold gradient-text font-mono">{item.amount}</span>
                                        </div>
                                        <div className="relative">
                                            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                                <div
                                                    className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out animate-pulse-soft`}
                                                    style={{ width: `${item.percent}%` }}
                                                ></div>
                                            </div>
                                            <div className="absolute right-0 -top-1 text-xs font-medium text-muted-foreground">
                                                {item.percent}%
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-center">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Xem Báo Cáo Chi Tiết
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold glass-effect">
                        <Settings className="w-5 h-5 mr-2" />
                        Cài Đặt Ngân Sách
                    </Button>
                    <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/5 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold glass-effect">
                        <Target className="w-5 h-5 mr-2" />
                        Mục Tiêu Tiết Kiệm
                    </Button>
                </div>
            </div>
        </div>
    );
}
