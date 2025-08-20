"use client";

import React, { useState } from "react";
import { HeroSection } from "./components/HeroSection";
import { SettingsPanel } from "./components/SettingsPanel";
import { ChatInterface } from "./components/ChatInterface";
import { ToolResults } from "./components/ToolResults";
import { QuickAddExpense } from "./components/QuickAddExpense";
import { StatisticsCards } from "./components/StatisticsCards";
import { useChatManager } from "./hooks/useChatManager";
import { useToolResults } from "./hooks/useToolResults";
import { DEFAULT_BASE_URL } from "./constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Coffee, Car, ShoppingBag, Film, PieChart, Utensils, Home, Target, Settings } from "lucide-react";

export default function ExpenseExpert() {
    const [showSettings, setShowSettings] = useState(true);
    const [baseUrl] = useState(DEFAULT_BASE_URL);

    const { chatMessages, isLoading, chatInput, setChatInput, handleSendMessage, toolResults } = useChatManager();
    const { expandedCards, toggleCardExpansion } = useToolResults();

    const handleQuickSuggestion = (s: string) => setChatInput(s);

    return (
        <div className="min-h-screen pt-16">
            <HeroSection />
            <div className="container mx-auto px-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-8">
                    <div className="lg:col-span-1 space-y-6">
                        {showSettings && <SettingsPanel baseUrl={baseUrl} />}
                    </div>

                    <ChatInterface
                        messages={chatMessages}
                        isLoading={isLoading}
                        inputValue={chatInput}
                        onInputChange={setChatInput}
                        onSendMessage={handleSendMessage}
                        onQuickSuggestion={handleQuickSuggestion}
                    />

                    <ToolResults
                        toolResults={toolResults}
                        expandedCards={expandedCards}
                        onToggleCard={toggleCardExpansion}
                    />
                </div>

                <QuickAddExpense />
                <StatisticsCards />

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
                                                    <Badge variant="secondary" className={`text-xs ${transaction.badgeBg} ${transaction.badgeText}`}>{transaction.category}</Badge>
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
                                                <div className={`p-1.5 rounded-lg bg-white/10 ${item.iconColor}`}>{item.icon}</div>
                                                <span className="font-medium text-foreground">{item.category}</span>
                                            </div>
                                            <span className="font-bold gradient-text font-mono">{item.amount}</span>
                                        </div>
                                        <div className="relative">
                                            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                                                <div className={`${item.color} h-3 rounded-full transition-all duration-1000 ease-out animate-pulse-soft`} style={{ width: `${item.percent}%` }} />
                                            </div>
                                            <div className="absolute right-0 -top-1 text-xs font-medium text-muted-foreground">{item.percent}%</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

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
