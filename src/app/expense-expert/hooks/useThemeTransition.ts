import { useTheme } from 'next-themes';
import { useState } from 'react';
import { createThemeTransition } from '../utils';

interface ThemeTransitionOptions {
    origin?: { x: number; y: number };
    duration?: number;
    particleCount?: number;
    showParticles?: boolean;
    animateElements?: boolean;
    useElasticEasing?: boolean;
    fadeOutAtEnd?: boolean; // new option
    easing?: string; // custom easing
    opacityCurve?: 'standard' | 'cinematic' | 'pulse' | 'spring';
}

export default function useThemeTransition() {
    const { theme } = useTheme();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const triggerThemeTransition = async (
        targetElement: HTMLElement,
        options: ThemeTransitionOptions = {}
    ) => {
        if (isTransitioning) return;
        const {
            fadeOutAtEnd = true,
            duration = 600,
            easing = 'cubic-bezier(.83,0,.17,1)', // dramatic ease-in-out
            opacityCurve = 'cinematic'
        } = options;

        setIsTransitioning(true);

        const supportsWAAPI = typeof targetElement.animate === 'function';

        // Prepare opacity animation strategy
        const applyFadeOut = () => {
            if (!fadeOutAtEnd) return;
            if (supportsWAAPI) {
                const keyframes: Keyframe[] = (() => {
                    switch (opacityCurve) {
                        case 'pulse':
                            return [
                                { opacity: 1, offset: 0 },
                                { opacity: 0.85, offset: 0.25 },
                                { opacity: 1, offset: 0.45 },
                                { opacity: 0.4, offset: 0.75 },
                                { opacity: 0, offset: 1 }
                            ];
                        case 'spring':
                            return [
                                { opacity: 1, transform: 'scale(1)' },
                                { opacity: 1, transform: 'scale(1.035)', offset: 0.25 },
                                { opacity: 1, transform: 'scale(0.985)', offset: 0.45 },
                                { opacity: 0.6, transform: 'scale(1.01)', offset: 0.75 },
                                { opacity: 0, transform: 'scale(0.98)', offset: 1 }
                            ];
                        case 'cinematic':
                            return [
                                { opacity: 1, offset: 0 },
                                { opacity: 0.92, offset: 0.35 },
                                { opacity: 0.75, offset: 0.55 },
                                { opacity: 0.35, offset: 0.82 },
                                { opacity: 0, offset: 1 }
                            ];
                        case 'standard':
                        default:
                            return [
                                { opacity: 1 },
                                { opacity: 0 }
                            ];
                    }
                })();
                targetElement.animate(keyframes, { duration: Math.min(duration, 900), easing, fill: 'forwards' });
            } else {
                const prevTransition = targetElement.style.transition;
                if (!prevTransition?.includes('opacity')) {
                    targetElement.style.transition = (prevTransition ? prevTransition + ', ' : '') + `opacity ${Math.min(duration, 900)}ms ${easing}`;
                }
                requestAnimationFrame(() => targetElement.style.opacity = '0');
            }
        };

        // Ensure element visible at start
        targetElement.style.opacity = '1';

        try {
            await createThemeTransition(theme === 'dark', targetElement);
            await new Promise(r => setTimeout(r, 50));
            applyFadeOut();
            // wait for fade out to finish if using WAAPI
            await new Promise(r => setTimeout(r, Math.min(duration, 900) + 40));
        } finally {
            setIsTransitioning(false);
        }
    };

    const prepareElementsForTransition = () => {
        const elements = document.querySelectorAll('[data-animate-on-theme-change]');
        elements.forEach((element) => {
            const el = element as HTMLElement;
            el.style.transition = el.style.transition
                ? el.style.transition + ', opacity 300ms ease'
                : 'opacity 300ms ease';
        });
    };

    return {
        triggerThemeTransition,
        prepareElementsForTransition,
        isTransitioning,
        currentTheme: theme,
        easings: {
            dramatic: 'cubic-bezier(.83,0,.17,1)',
            smooth: 'cubic-bezier(.4,0,.2,1)',
            spring: 'cubic-bezier(.34,1.56,.64,1)',
            glide: 'cubic-bezier(.25,.46,.45,.94)'
        }
    };
}
