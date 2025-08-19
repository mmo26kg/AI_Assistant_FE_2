import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { StatCard } from "../types";
import { MOCK_STATISTICS } from "../data/mockData";

export const StatisticsCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {MOCK_STATISTICS.map((stat, index) => (
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
    );
};
