import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PieChart, TrendingUp } from "lucide-react";
import { MOCK_EXPENSE_CATEGORIES } from "../data/mockData";

export const ExpenseCategories: React.FC = () => {
    return (
        <Card className="glass-effect border border-white/10 hover-lift">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-mono">
                    <PieChart className="w-5 h-5 text-primary" />
                    Danh Mục Chi Tiêu
                </CardTitle>
                <CardDescription>Phân tích chi tiêu theo từng danh mục</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {MOCK_EXPENSE_CATEGORIES.map((category, index) => (
                        <div key={index} className="flex items-center justify-between p-4 glass-effect border border-white/5 rounded-xl hover:border-primary/30 transition-all duration-300 group">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${category.color}`}>
                                    {React.cloneElement(category.icon as React.ReactElement, { className: `w-4 h-4 ${category.iconColor}` })}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-foreground">{category.category}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                                            {category.percent}% tổng chi tiêu
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-foreground font-mono">{category.amount}</p>
                                <div className="flex items-center gap-1 mt-1">
                                    <TrendingUp className="w-3 h-3 text-green-500" />
                                    <span className="text-xs text-green-500 font-medium">+{category.percent}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-6 pt-4 border-t border-white/10">
                    <Button className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-medium transition-all duration-300 hover:scale-[1.02]">
                        Xem Tất Cả Danh Mục
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
