"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { addThemeTransitionStyles } from "@/app/expense-expert/utils";
import { Sun, Moon } from "lucide-react";

// Simplified lightweight cross-fade class injection
const ensureLightweightThemeStyles = () => {
    if (document.getElementById('lightweight-theme-transition')) return;
    const style = document.createElement('style');
    style.id = 'lightweight-theme-transition';
    style.textContent = `
    .theme-fade-transition * { transition: background-color .35s ease, color .35s ease, border-color .35s ease; }
    .theme-toggle-icon { will-change: transform, opacity; }
  `;
    document.head.appendChild(style);
};

const ENABLE_ADVANCED_EFFECT = true;

const ensureAdvancedThemeCSS = () => {
    if (document.getElementById('advanced-theme-toggle-css')) return;
    const style = document.createElement('style');
    style.id = 'advanced-theme-toggle-css';
    style.textContent = `
    .theme-advanced-overlay { position:fixed; top:0; left:0; width:100vw; height:100vh; pointer-events:none; z-index:9999; overflow:hidden; }
    .theme-advanced-circle { position:absolute; will-change:transform, opacity; border-radius:50%; filter:blur(0.2px); }
    .theme-advanced-glow { position:fixed; inset:0; pointer-events:none; z-index:9998; background:radial-gradient(circle at center, var(--tg-glow-color) 0%, transparent 70%); mix-blend-mode:overlay; opacity:0; will-change:opacity; }
    @media (prefers-reduced-motion: reduce){ .theme-advanced-overlay, .theme-advanced-glow { display:none !important; } }
  `;
    document.head.appendChild(style);
};

const runAdvancedTransition = (triggerEl: HTMLElement, fromDark: boolean) => {
    if (!ENABLE_ADVANCED_EFFECT) return Promise.resolve();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve();
    ensureAdvancedThemeCSS();
    // Origin: horizontal aligned to button center, vertical centered in viewport
    const rect = triggerEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2; // button center X
    const cy = window.innerHeight / 2;     // viewport middle Y
    const maxR = Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy));
    const overlay = document.createElement('div');
    overlay.className = 'theme-advanced-overlay';
    const circle = document.createElement('div');
    circle.className = 'theme-advanced-circle';
    const baseColor = fromDark ? '#ffffff' : '#0f172a';
    circle.style.background = `radial-gradient(circle at center, ${baseColor} 0%, ${baseColor} 55%, ${baseColor}00 70%)`;
    const size = maxR * 2;
    circle.style.width = circle.style.height = size + 'px';
    circle.style.left = (cx - maxR) + 'px';
    circle.style.top = (cy - maxR) + 'px';
    circle.style.transform = 'scale(.05)';
    circle.style.opacity = '0.9';
    const glow = document.createElement('div');
    glow.className = 'theme-advanced-glow';
    glow.style.setProperty('--tg-glow-color', fromDark ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.18)');
    document.body.appendChild(glow);
    overlay.appendChild(circle);
    document.body.appendChild(overlay);
    const duration = 480; // ms
    const ease = 'cubic-bezier(.4,0,.2,1)';
    const start = performance.now();
    glow.animate([{ opacity: 0 }, { opacity: 1, offset: .35 }, { opacity: 0 }], { duration: duration + 140, easing: 'linear' });
    return new Promise<void>(resolve => {
        const step = (t: number) => {
            const p = Math.min(1, (t - start) / duration);
            const eased = p < .5 ? 2 * p * p : -1 + (4 - 2 * p) * p; // easeInOutQuad
            circle.style.transform = `scale(${.05 + eased * .95})`;
            circle.style.opacity = String(0.9 - p * 0.9);
            if (p < 1) requestAnimationFrame(step); else {
                overlay.remove();
                glow.remove();
                resolve();
            }
        };
        requestAnimationFrame(step);
    });
};

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const bulbOnRef = React.useRef<HTMLSpanElement>(null);
    const bulbOffRef = React.useRef<HTMLSpanElement>(null);
    const sunRef = bulbOnRef; // alias for clarity (light mode icon)
    const moonRef = bulbOffRef; // alias for clarity (dark mode icon)

    React.useEffect(() => {
        setMounted(true);
        addThemeTransitionStyles();
        ensureLightweightThemeStyles();
    }, []);

    if (!mounted) {
        return (
            <Button variant="outline" size="icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-[1.2rem] w-[1.2rem]" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    const toggleTheme = async () => {
        if (isTransitioning) return; // ignore rapid double clicks
        setIsTransitioning(true);
        const current = resolvedTheme || 'light';
        const fromDark = current === 'dark';
        const nextTheme = fromDark ? 'light' : 'dark';

        // Add a lightweight class to root for smooth color interpolation
        const root = document.documentElement;
        root.classList.add('theme-fade-transition');
        setTimeout(() => root.classList.remove('theme-fade-transition'), 500);

        // Advanced radial reveal (non-blocking theme switch)
        const triggerEl = buttonRef.current || document.body;
        const advancedPromise = runAdvancedTransition(triggerEl, fromDark);

        // Icon morph (sun <-> moon)
        const outgoing = fromDark ? moonRef.current : sunRef.current;
        const incoming = fromDark ? sunRef.current : moonRef.current;
        const duration = 360;
        const ease = 'cubic-bezier(.65,.05,.36,1)';
        if (outgoing && incoming) {
            // Prepare incoming
            incoming.style.opacity = '0';
            incoming.style.transformOrigin = '50% 50%';
            incoming.style.transform = 'scale(.4) rotate(-90deg)';
            // Animate outgoing (shrink & rotate giving morph feel)
            outgoing.animate([
                { opacity: 1, transform: 'scale(1) rotate(0deg)' },
                { opacity: .4, offset: .45, transform: 'scale(.85) rotate(40deg)' },
                { opacity: 0, transform: 'scale(.2) rotate(140deg)' }
            ], { duration, easing: ease });
            // Animate incoming (grow & unrotate)
            incoming.animate([
                { opacity: 0, transform: 'scale(.2) rotate(-120deg)' },
                { opacity: .6, offset: .55, transform: 'scale(.85) rotate(-25deg)' },
                { opacity: 1, transform: 'scale(1) rotate(0deg)' }
            ], { duration, easing: ease });
            // Final state cleanup
            setTimeout(() => {
                if (outgoing) { outgoing.style.opacity = '0'; outgoing.style.transform = ''; }
                if (incoming) { incoming.style.opacity = '1'; incoming.style.transform = ''; }
            }, duration + 40);
        }

        // Switch theme early to minimize mismatch
        setTimeout(() => setTheme(nextTheme), 60);

        // Button micro pulse
        if (buttonRef.current) {
            buttonRef.current.animate([
                { transform: 'scale(1)' },
                { transform: 'scale(1.06)' },
                { transform: 'scale(1)' }
            ], { duration: 300, easing: ease });
        }

        // Wait for advanced effect (if any) but cap total wait
        const timeout = new Promise(res => setTimeout(res, 520));
        await Promise.race([advancedPromise.catch(() => { }), timeout]);
        setIsTransitioning(false);
    };

    return (
        <Button
            ref={buttonRef}
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            disabled={isTransitioning}
            className="group relative overflow-hidden transition-colors duration-300 backdrop-blur-md bg-white/40 dark:bg-slate-900/30 border border-white/30 dark:border-white/10 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.25),0_0_0_1px_rgba(255,255,255,0.05)] hover:bg-white/55 dark:hover:bg-slate-900/45 hover:shadow-[0_6px_18px_-2px_rgba(0,0,0,0.35),0_0_0_1px_rgba(255,255,255,0.08)] focus-visible:ring-2 focus-visible:ring-amber-400/50 focus-visible:outline-none rounded-lg"
        >
            <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/40 via-transparent to-amber-300/10 dark:from-white/10 dark:to-amber-200/10" />
            <span className="relative block h-[1.4rem] w-[1.4rem]">
                <span
                    ref={sunRef}
                    className="theme-toggle-icon absolute inset-0 flex items-center justify-center text-primary dark:text-primary"
                    style={{ opacity: resolvedTheme === 'light' ? 1 : 0 }}
                >
                    <Sun className="h-full w-full" strokeWidth={1.5} />
                </span>
                <span
                    ref={moonRef}
                    className="theme-toggle-icon absolute inset-0 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                    style={{ opacity: resolvedTheme === 'dark' ? 1 : 0 }}
                >
                    <Moon className="h-full w-full" strokeWidth={1.5} />
                </span>
            </span>
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
