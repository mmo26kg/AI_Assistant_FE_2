'use client';

import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from 'react';
import { Bot, DollarSign } from 'lucide-react';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'glass-effect shadow-lg border-b border-white/20'
            : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between h-20">
                    <Link
                        href="/"
                        className="group flex items-center space-x-2 text-xl font-bold text-foreground hover:text-primary transition-all duration-300"
                    >
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary/90 to-primary rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-sm">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <span className="font-mono bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                            AI Assistant
                        </span>
                    </Link>

                    <div className="flex items-center space-x-8">
                        <div className="hidden md:flex items-center space-x-6">
                            <Link
                                href="/"
                                className="relative text-foreground/80 hover:text-primary transition-all duration-300 font-medium group"
                            >
                                Trang chủ
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link
                                href="/expense-expert"
                                className="relative text-foreground/80 hover:text-primary transition-all duration-300 font-medium group flex items-center gap-2"
                            >
                                <DollarSign className="w-4 h-4" />
                                Expense Expert
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <ThemeToggle />

                            {/* Mobile Menu Button */}
                            <button className="md:hidden relative w-6 h-6 flex flex-col justify-center items-center">
                                <span className="w-full h-0.5 bg-current transition-all duration-300"></span>
                                <span className="w-full h-0.5 bg-current transition-all duration-300 mt-1"></span>
                                <span className="w-full h-0.5 bg-current transition-all duration-300 mt-1"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}