'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from 'next-themes';
import { Sun, Moon, Palette, Sparkles, ArrowRight, Play } from 'lucide-react';

// Simple theme transition for demo
const createDemoTransition = (fromDark: boolean, triggerElement: HTMLElement) => {
    const duration = 1500; // Thời gian dài hơn cho demo
    const rect = triggerElement.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    const maxRadius = Math.sqrt(
        Math.pow(Math.max(originX, window.innerWidth - originX), 2) +
        Math.pow(Math.max(originY, window.innerHeight - originY), 2)
    );

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        background: ${fromDark ? '#ffffff' : '#0f172a'};
        clip-path: circle(0px at ${originX}px ${originY}px);
        transition: clip-path ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
        will-change: clip-path;
    `;

    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            overlay.style.clipPath = `circle(${maxRadius * 1.5}px at ${originX}px ${originY}px)`;
        });
    });

    return new Promise<void>((resolve) => {
        setTimeout(() => {
            overlay.remove();
            resolve();
        }, duration + 100);
    });
};

export default function ThemeTransitionDemo() {
    const { theme, setTheme } = useTheme();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [demoStep, setDemoStep] = useState(0);

    const handleDemo = async (event: React.MouseEvent) => {
        if (isTransitioning) return;

        const button = event.currentTarget as HTMLElement;
        setIsTransitioning(true);

        try {
            // Thay đổi theme TRƯỚC khi chạy animation
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);

            // Đợi một chút để theme được apply
            await new Promise(resolve => setTimeout(resolve, 50));

            // Chạy animation
            await createDemoTransition(theme === 'dark', button);

            setDemoStep(prev => (prev + 1) % 3);
        } finally {
            setIsTransitioning(false);
        }
    };

    const demoFeatures = [
        {
            title: 'Radial Expansion',
            description: 'Hiệu ứng mở rộng hình tròn từ vị trí click',
            icon: <Sparkles className="w-5 h-5" />,
            color: 'bg-blue-500'
        },
        {
            title: 'Particle Effects',
            description: 'Các hạt bay lên tạo cảm giác magical',
            icon: <Palette className="w-5 h-5" />,
            color: 'bg-purple-500'
        },
        {
            title: 'Icon Morphing',
            description: 'Icon sun/moon chuyển đổi mượt mà',
            icon: theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />,
            color: 'bg-amber-500'
        }
    ];

    return (
        <Card className="w-full max-w-2xl mx-auto glass-effect border border-primary/20">
            <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl font-mono gradient-text">
                    <Sparkles className="w-6 h-6" />
                    Theme Transition Demo
                </CardTitle>
                <CardDescription className="text-base">
                    Trải nghiệm hiệu ứng chuyển đổi theme đẹp mắt với radial expansion
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Demo Button */}
                <div className="text-center space-y-4">
                    <Button
                        onClick={handleDemo}
                        disabled={isTransitioning}
                        size="lg"
                        className="relative px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        {isTransitioning ? (
                            <>
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                                Đang chuyển đổi...
                            </>
                        ) : (
                            <>
                                <Play className="w-5 h-5 mr-2" />
                                Thử hiệu ứng Theme Transition
                            </>
                        )}
                    </Button>

                    <div className="flex items-center justify-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                            Current: {theme === 'dark' ? 'Dark' : 'Light'} Mode
                        </Badge>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <Badge variant="outline" className="text-xs">
                            Click để chuyển đổi
                        </Badge>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {demoFeatures.map((feature, index) => (
                        <div
                            key={index}
                            className={`p-4 rounded-lg glass-effect border border-primary/10 hover:border-primary/20 transition-all duration-300 ${demoStep === index ? 'ring-2 ring-primary/50 scale-105' : ''
                                }`}
                        >
                            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${feature.color} text-white mb-3`}>
                                {feature.icon}
                            </div>
                            <h4 className="font-semibold text-sm mb-2">{feature.title}</h4>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Technical Details */}
                <div className="space-y-3 pt-4 border-t border-primary/10">
                    <h4 className="font-semibold text-sm flex items-center gap-2">
                        <Palette className="w-4 h-4" />
                        Thông số kỹ thuật
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="ml-2 font-mono">2000ms</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Easing:</span>
                            <span className="ml-2 font-mono">elastic</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Particles:</span>
                            <span className="ml-2 font-mono">50 count</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Animation:</span>
                            <span className="ml-2 font-mono">clip-path</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
