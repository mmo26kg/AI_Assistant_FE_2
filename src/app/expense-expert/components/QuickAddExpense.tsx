import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export const QuickAddExpense: React.FC = () => {
    return (
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
    );
};
