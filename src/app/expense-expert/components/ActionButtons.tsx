import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, TrendingUp, PieChart, Settings, Download, Bell } from "lucide-react";

interface ActionButtonsProps {
    onShowAddExpense: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({ onShowAddExpense }) => {
    const actionButtons = [
        { 
            icon: Plus, 
            label: "Thêm Chi Tiêu", 
            color: "bg-gradient-to-r from-green-500 to-emerald-500", 
            onClick: onShowAddExpense
        },
        { 
            icon: TrendingUp, 
            label: "Báo Cáo", 
            color: "bg-gradient-to-r from-blue-500 to-cyan-500",
            onClick: () => console.log("Show reports")
        },
        { 
            icon: PieChart, 
            label: "Phân Tích", 
            color: "bg-gradient-to-r from-purple-500 to-pink-500",
            onClick: () => console.log("Show analytics")
        },
        { 
            icon: Download, 
            label: "Xuất Dữ Liệu", 
            color: "bg-gradient-to-r from-orange-500 to-red-500",
            onClick: () => console.log("Export data")
        },
        { 
            icon: Bell, 
            label: "Thông Báo", 
            color: "bg-gradient-to-r from-yellow-500 to-orange-500",
            onClick: () => console.log("Show notifications")
        },
        { 
            icon: Settings, 
            label: "Cài Đặt", 
            color: "bg-gradient-to-r from-gray-500 to-slate-500",
            onClick: () => console.log("Show settings")
        }
    ];

    return (
        <Card className="glass-effect border border-white/10 hover-lift">
            <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {actionButtons.map((button, index) => (
                        <Button
                            key={index}
                            onClick={button.onClick}
                            className={`${button.color} hover:scale-105 transition-all duration-300 text-white border-0 h-16 flex flex-col items-center justify-center gap-2 group relative overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <button.icon className="w-5 h-5 relative z-10" />
                            <span className="text-xs font-medium relative z-10">{button.label}</span>
                        </Button>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};
