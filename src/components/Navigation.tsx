'use client';

import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Radar, DollarSign, Info } from 'lucide-react';

export default function Navigation() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const handleScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > 10);
        };

        // Use requestAnimationFrame to ensure proper timing
        const initScroll = () => {
            requestAnimationFrame(() => {
                handleScroll();
            });
        };

        // Initialize scroll state
        initScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMounted]);

    // Reset scroll state when pathname changes
    useEffect(() => {
        if (!isMounted) return;

        // Use requestAnimationFrame for better timing
        const updateScroll = () => {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                setIsScrolled(scrollY > 10);
            });
        };

        const timer = setTimeout(updateScroll, 100);
        return () => clearTimeout(timer);
    }, [pathname, isMounted]);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'glass-effect shadow-lg border-b border-white/20'
            : 'bg-transparent'
            }`}>
            <div className="container mx-auto px-6">
                <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14' : 'h-20'}`}>
                    <Link
                        href="/"
                        className="group flex items-center space-x-2 text-xl font-bold text-foreground hover:text-primary transition-all duration-300"
                    >
                        <div className="relative">
                            <div className={`bg-gradient-to-br from-primary/90 to-primary rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-sm ${isScrolled ? 'w-8 h-8' : 'w-10 h-10'}`}>
                                <Radar className={`text-white transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-6 h-6'}`} />
                            </div>
                        </div>
                        <span className={`font-mono bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent transition-all duration-300 ${isScrolled ? 'text-lg' : 'text-xl'}`}>
                            KATCHX
                        </span>
                    </Link>

                    <div className="flex items-center space-x-8">
                        <div className={`hidden md:flex items-center transition-all duration-300 ${isScrolled ? 'space-x-4' : 'space-x-6'}`}>
                            <Link
                                href="/"
                                className={`relative text-foreground/80 hover:text-primary transition-all duration-300 font-medium group ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                Home
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link
                                href="/about"
                                className={`relative text-foreground/80 hover:text-primary transition-all duration-300 font-medium group flex items-center gap-2 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                <Info className={`transition-all duration-300 ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
                                <span className={isScrolled ? 'hidden lg:inline' : ''}>About</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link
                                href="/expense-expert"
                                className={`relative text-foreground/80 hover:text-primary transition-all duration-300 font-medium group flex items-center gap-2 ${isScrolled ? 'text-sm' : 'text-base'}`}
                            >
                                <DollarSign className={`transition-all duration-300 ${isScrolled ? 'w-3 h-3' : 'w-4 h-4'}`} />
                                <span className={isScrolled ? 'hidden lg:inline' : ''}>Expense Expert</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className={`transition-all duration-300 ${isScrolled ? 'scale-90' : 'scale-100'}`}>
                                <ThemeToggle />
                            </div>

                            {/* Mobile Menu Button */}
                            <button className={`md:hidden relative flex flex-col justify-center items-center transition-all duration-300 ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`}>
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