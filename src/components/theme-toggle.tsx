"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { createParticleEffect, addThemeTransitionStyles } from "@/app/expense-expert/utils";

// Advanced layered reveal transition
const ensureAdvancedThemeStyles = () => {
    if (document.getElementById('advanced-theme-transition-styles')) return;
    const style = document.createElement('style');
    style.id = 'advanced-theme-transition-styles';
    style.textContent = `
      @keyframes elementThemeReveal {from{opacity:0;transform:translateY(4px) scale(.985);}to{opacity:1;transform:translateY(0) scale(1);} }
      .theme-parallax-shift {transition:transform 900ms cubic-bezier(.25,.46,.45,.94);}
      .theme-parallax-anim {transform:translateY(2px) scale(.995);} 
      .theme-color-interp {transition: color 650ms cubic-bezier(.25,.46,.45,.94), background-color 650ms cubic-bezier(.25,.46,.45,.94), border-color 650ms cubic-bezier(.25,.46,.45,.94);}
      @media (prefers-reduced-motion: reduce){.reveal-overlay,.reveal-mask{transition:none !important;animation:none !important;}}
    `;
    document.head.appendChild(style);
};

const createAdvancedThemeTransition = (fromDark: boolean, nextTheme: string) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    ensureAdvancedThemeStyles();
    if (prefersReduced) return Promise.resolve();

    const duration = 1000;
    const easing = 'cubic-bezier(.25,.46,.45,.94)';
    const originX = window.innerWidth;
    const originY = 0;
    const maxRadius = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2) * 1.1;

    const mask = document.createElement('div');
    mask.className = 'reveal-mask';
    mask.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:80;mix-blend-mode:normal;` +
        `clip-path:circle(0px at ${originX}px ${originY}px);will-change:clip-path,opacity;` +
        `background:radial-gradient(circle at ${originX}px ${originY}px, rgba(${fromDark ? '255,255,240' : '20,32,54'},0.85) 0%, rgba(${fromDark ? '255,255,240' : '20,32,54'},0.55) 22%, rgba(${fromDark ? '255,255,240' : '20,32,54'},0.28) 48%, rgba(${fromDark ? '255,255,240' : '20,32,54'},0.12) 68%, rgba(${fromDark ? '255,255,240' : '20,32,54'},0.03) 80%, rgba(${fromDark ? '255,255,240' : '20,32,54'},0) 90%);`;

    const overlay = document.createElement('div');
    overlay.className = 'reveal-overlay';
    overlay.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:79;` +
        `background:${fromDark ? 'rgba(15,23,42,0.9)' : 'rgba(255,255,255,0.94)'};` +
        `backdrop-filter:blur(2px) saturate(1.05);` +
        `clip-path:circle(${maxRadius}px at ${originX}px ${originY}px);` +
        `will-change:opacity,filter;opacity:1;`;

    // Finishing veil to smooth final reveal (very low opacity)
    const finisher = document.createElement('div');
    finisher.style.cssText = `position:fixed;inset:0;pointer-events:none;z-index:81;` +
        `background:${fromDark ? 'rgba(255,255,255,0.08)' : 'rgba(15,23,42,0.08)'};opacity:0;transition:opacity 260ms ease;`;

    document.body.appendChild(overlay);
    document.body.appendChild(mask);
    document.body.appendChild(finisher);

    const supportsWAAPI = typeof overlay.animate === 'function' && typeof mask.animate === 'function';

    if (supportsWAAPI) {
        // Overlay staged fade to avoid abrupt final jump
        overlay.animate([
            { opacity: 1, filter: 'blur(2px) saturate(1.05)' },
            { opacity: 0.55, filter: 'blur(1.2px) saturate(1.02)', offset: 0.55 },
            { opacity: 0.28, filter: 'blur(.8px) saturate(1)', offset: 0.75 },
            { opacity: 0.15, filter: 'blur(.4px) saturate(.99)', offset: 0.9 },
            { opacity: 0.0, filter: 'blur(0px) saturate(1)', offset: 1 }
        ], { duration, easing: 'linear', fill: 'forwards' });
        mask.animate([
            { clipPath: `circle(0px at ${originX}px ${originY}px)` },
            { clipPath: `circle(${maxRadius * 0.6}px at ${originX}px ${originY}px)`, offset: 0.45 },
            { clipPath: `circle(${maxRadius * 0.88}px at ${originX}px ${originY}px)`, offset: 0.75 },
            { clipPath: `circle(${maxRadius}px at ${originX}px ${originY}px)`, offset: 1 }
        ], { duration, easing, fill: 'forwards' });
    } else {
        // Fallback simple transitions
        requestAnimationFrame(() => {
            mask.style.transition = `clip-path ${duration}ms ${easing}`;
            mask.style.clipPath = `circle(${maxRadius}px at ${originX}px ${originY}px)`;
            overlay.style.transition = `opacity ${duration}ms linear, filter ${duration}ms linear`;
            overlay.style.opacity = '0';
            overlay.style.filter = 'blur(0px) saturate(1)';
        });
    }

    // Bring in finisher at the last 180ms to smooth micro contrast jump
    setTimeout(() => { finisher.style.opacity = '1'; }, duration - 200);
    setTimeout(() => { finisher.style.opacity = '0'; }, duration - 40);

    return new Promise<void>(resolve => {
        setTimeout(() => { mask.remove(); overlay.remove(); finisher.remove(); resolve(); }, duration + 120);
    });
};

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    const [isTransitioning, setIsTransitioning] = React.useState(false);
    const buttonRef = React.useRef<HTMLButtonElement>(null); // optional now
    const sunRef = React.useRef<SVGSVGElement>(null);
    const moonRef = React.useRef<SVGSVGElement>(null);

    React.useEffect(() => { setMounted(true); addThemeTransitionStyles(); ensureAdvancedThemeStyles(); }, []);

    // SSR fallback (no ref here intentionally)
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

    const toggleTheme = async (targetEl?: HTMLElement | null) => {
        const current = resolvedTheme || 'light';
        if (isTransitioning) {
            setTheme(current === 'dark' ? 'light' : 'dark');
            return;
        }
        const fromDark = current === 'dark';
        const nextTheme = fromDark ? 'light' : 'dark';
        setIsTransitioning(true);
        let themeSwitched = false;
        try {
            // Icon morph (runs immediately for responsiveness)
            const outgoing = fromDark ? moonRef.current : sunRef.current;
            const incoming = fromDark ? sunRef.current : moonRef.current;
            const iconDuration = 520;
            const iconEase = 'cubic-bezier(.4,0,.2,1)';
            if (outgoing && incoming) {
                incoming.style.opacity = '0';
                incoming.style.transform = 'scale(.4) rotate(-90deg)';
                incoming.style.willChange = 'transform, opacity';
                outgoing.style.willChange = 'transform, opacity';
                outgoing.animate([
                    { transform: 'scale(1) rotate(0deg)', opacity: 1 },
                    { transform: 'scale(.35) rotate(90deg)', opacity: 0 }
                ], { duration: iconDuration, easing: iconEase, fill: 'forwards' });
                incoming.animate([
                    { transform: 'scale(.35) rotate(-90deg)', opacity: 0, offset: 0 },
                    { transform: 'scale(1.12) rotate(8deg)', opacity: 1, offset: 0.7 },
                    { transform: 'scale(1) rotate(0deg)', opacity: 1, offset: 1 }
                ], { duration: iconDuration + 100, easing: iconEase, fill: 'forwards', delay: 30 });
            }
            // Skip stagger & parallax per request
            const switchDelay = 300; // slightly later to let old palette persist longer
            const switchTimer = setTimeout(() => {
                setTheme(nextTheme);
                themeSwitched = true;
            }, switchDelay);
            await new Promise(r => setTimeout(r, 30));
            await createAdvancedThemeTransition(fromDark, nextTheme);
            if (!themeSwitched) { // safety fallback
                clearTimeout(switchTimer);
                setTheme(nextTheme);
            }
            // Elastic bounce on button near end
            if (buttonRef.current) {
                buttonRef.current.classList.add('elastic-bounce');
                setTimeout(() => buttonRef.current && buttonRef.current.classList.remove('elastic-bounce'), 450);
            }
        } finally {
            setIsTransitioning(false);
        }
    };

    return (
        <Button
            ref={buttonRef}
            variant="outline"
            size="icon"
            onClick={(e) => toggleTheme(e.currentTarget)}
            className="relative overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
        >
            <span className="relative block h-[1.2rem] w-[1.2rem]">
                <svg
                    ref={sunRef}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    fill="none"
                    className="absolute inset-0 h-full w-full text-yellow-400 dark:text-yellow-300"
                    style={{ opacity: resolvedTheme === 'light' ? 1 : 0 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
                <svg
                    ref={moonRef}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    fill="none"
                    className="absolute inset-0 h-full w-full text-slate-900 dark:text-slate-100"
                    style={{ opacity: resolvedTheme === 'dark' ? 1 : 0 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
            </span>
            <span className="sr-only">Toggle theme</span>
            {isTransitioning && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-blue-600/10" />
            )}
        </Button>
    );
}
