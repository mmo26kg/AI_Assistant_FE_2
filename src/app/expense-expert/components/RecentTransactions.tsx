import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";
import { MOCK_TRANSACTIONS } from "../data/mockData";

export const RecentTransactions: React.FC = () => {
    return (
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
                    {MOCK_TRANSACTIONS.map((transaction, index) => (
                        <div key={index} className="flex items-center justify-between p-4 glass-effect border border-white/5 rounded-xl hover:border-primary/30 transition-all duration-300 group">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${transaction.bgColor}`}>
                                    {React.cloneElement(transaction.icon as React.ReactElement, { className: `w-4 h-4 ${transaction.iconColor}` })}
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
    );
};
