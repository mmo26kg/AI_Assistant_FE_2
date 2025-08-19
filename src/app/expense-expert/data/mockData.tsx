import React from "react";
import { Transaction, ExpenseCategory, StatCard } from "../types";
import { Coffee, Car, ShoppingBag, Film, Calendar, BarChart3, PieChart, Target, Utensils, Home } from "lucide-react";

export const MOCK_TRANSACTIONS: Transaction[] = [
    { 
        desc: "Cà phê sáng tại Highland", 
        amount: "45,000₫", 
        category: "Ăn uống", 
        time: "8:30 AM", 
        icon: React.createElement(Coffee, { className: "w-4 h-4" }), 
        iconColor: "text-amber-600", 
        bgColor: "bg-amber-100 dark:bg-amber-900/30", 
        badgeBg: "bg-amber-100 dark:bg-amber-900/30", 
        badgeText: "text-amber-700 dark:text-amber-300" 
    },
    { 
        desc: "Taxi về nhà từ công ty", 
        amount: "120,000₫", 
        category: "Di chuyển", 
        time: "6:45 PM", 
        icon: React.createElement(Car, { className: "w-4 h-4" }), 
        iconColor: "text-blue-600", 
        bgColor: "bg-blue-100 dark:bg-blue-900/30", 
        badgeBg: "bg-blue-100 dark:bg-blue-900/30", 
        badgeText: "text-blue-700 dark:text-blue-300" 
    },
    { 
        desc: "Mua đồ văn phòng tại Fahasa", 
        amount: "280,000₫", 
        category: "Mua sắm", 
        time: "2:15 PM", 
        icon: React.createElement(ShoppingBag, { className: "w-4 h-4" }), 
        iconColor: "text-green-600", 
        bgColor: "bg-green-100 dark:bg-green-900/30", 
        badgeBg: "bg-green-100 dark:bg-green-900/30", 
        badgeText: "text-green-700 dark:text-green-300" 
    },
    { 
        desc: "Xem phim CGV", 
        amount: "180,000₫", 
        category: "Giải trí", 
        time: "7:30 PM", 
        icon: React.createElement(Film, { className: "w-4 h-4" }), 
        iconColor: "text-purple-600", 
        bgColor: "bg-purple-100 dark:bg-purple-900/30", 
        badgeBg: "bg-purple-100 dark:bg-purple-900/30", 
        badgeText: "text-purple-700 dark:text-purple-300" 
    }
];

export const MOCK_EXPENSE_CATEGORIES: ExpenseCategory[] = [
    { 
        category: "Ăn uống", 
        amount: "2,450,000₫", 
        percent: 35, 
        color: "bg-gradient-to-r from-red-500 to-pink-500", 
        icon: React.createElement(Utensils, { className: "w-4 h-4" }), 
        iconColor: "text-red-600" 
    },
    { 
        category: "Di chuyển", 
        amount: "1,680,000₫", 
        percent: 25, 
        color: "bg-gradient-to-r from-blue-500 to-cyan-500", 
        icon: React.createElement(Car, { className: "w-4 h-4" }), 
        iconColor: "text-blue-600" 
    },
    { 
        category: "Mua sắm", 
        amount: "1,200,000₫", 
        percent: 18, 
        color: "bg-gradient-to-r from-green-500 to-emerald-500", 
        icon: React.createElement(ShoppingBag, { className: "w-4 h-4" }), 
        iconColor: "text-green-600" 
    },
    { 
        category: "Giải trí", 
        amount: "980,000₫", 
        percent: 15, 
        color: "bg-gradient-to-r from-purple-500 to-violet-500", 
        icon: React.createElement(Film, { className: "w-4 h-4" }), 
        iconColor: "text-purple-600" 
    },
    { 
        category: "Hóa đơn", 
        amount: "580,000₫", 
        percent: 7, 
        color: "bg-gradient-to-r from-orange-500 to-yellow-500", 
        icon: React.createElement(Home, { className: "w-4 h-4" }), 
        iconColor: "text-orange-600" 
    }
];

export const MOCK_STATISTICS: StatCard[] = [
    {
        title: "Chi Tiêu Hôm Nay",
        value: "245,000₫",
        change: "+12%",
        trend: "up",
        icon: React.createElement(Calendar, { className: "w-5 h-5" }),
        color: "from-red-500 to-pink-500"
    },
    {
        title: "Chi Tiêu Tuần Này",
        value: "1,650,000₫",
        change: "-5%",
        trend: "down",
        icon: React.createElement(BarChart3, { className: "w-5 h-5" }),
        color: "from-orange-500 to-yellow-500"
    },
    {
        title: "Chi Tiêu Tháng Này",
        value: "6,890,000₫",
        change: "Còn lại 3,110,000₫",
        trend: "neutral",
        icon: React.createElement(PieChart, { className: "w-5 h-5" }),
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Tiết Kiệm",
        value: "2,340,000₫",
        change: "+8%",
        trend: "up",
        icon: React.createElement(Target, { className: "w-5 h-5" }),
        color: "from-green-500 to-emerald-500"
    }
];
