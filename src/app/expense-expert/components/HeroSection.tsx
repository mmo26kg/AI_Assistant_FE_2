import React from "react";
import { DollarSign, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
    onShowSettings?: () => void;
    onShowAddExpense?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ 
    onShowSettings,
    onShowAddExpense 
}) => {
    return (
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

                {/* Action Buttons */}
                {(onShowSettings || onShowAddExpense) && (
                    <div className="flex flex-wrap gap-4 justify-center">
                        {onShowAddExpense && (
                            <Button 
                                onClick={onShowAddExpense}
                                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 px-6 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Thêm Chi Tiêu
                            </Button>
                        )}
                        {onShowSettings && (
                            <Button 
                                onClick={onShowSettings}
                                variant="outline"
                                className="border-primary/30 text-primary hover:bg-primary/10 px-6 py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
                            >
                                <Settings className="w-5 h-5 mr-2" />
                                Cài Đặt
                            </Button>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};
