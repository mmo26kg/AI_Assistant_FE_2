"use client";
import React, { useEffect, useRef } from 'react';

/* Ultra–minimal cursor reactive field
   Changes:
   - Removed soft diffusion + aura parallax layers.
   - Single subtle radial gradient spotlight.
   - Lower alpha + smaller radius for minimalist look.
   - No dynamic layer building; very light computations.
   - Respects prefers-reduced-motion (static center glow).
   - Keeps same prop API for compatibility.
*/
export const HeroCursorField: React.FC<{ sensitivity?: number; maxParallax?: number; layers?: number; quality?: 'auto' | 'high' | 'low'; }> = ({ sensitivity = 0.18, maxParallax = 24, layers = 1, quality = 'auto' }) => {
    const spotRef = useRef<HTMLDivElement | null>(null);
    const raf = useRef<number>();
    const pos = useRef({ x: 0.5, y: 0.5 });
    const target = useRef({ x: 0.5, y: 0.5 });
    const mountedRef = useRef(false);
    const reducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    useEffect(() => {
        if (mountedRef.current) return; mountedRef.current = true;
        const el = spotRef.current; if (!el) return;

        // Base style (single gradient; we will only move its focal point)
        const applyGradient = (xPct: number, yPct: number) => {
            const isDark = document.documentElement.classList.contains('dark');
            // Minimal smaller radius
            const rCore = '16%'; // inner fade
            const rOuter = '34%';
            if (isDark) {
                el.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, hsl(var(--primary)/0.12) 0%, hsl(var(--primary)/0.05) ${rCore}, transparent ${rOuter})`;
                el.style.mixBlendMode = 'plus-lighter';
            } else {
                // Soft cool tone pair, very light
                el.style.background = `radial-gradient(circle at ${xPct}% ${yPct}%, rgba(90,180,255,0.28) 0%, rgba(90,180,255,0.10) ${rCore}, rgba(90,180,255,0) ${rOuter})`;
                el.style.mixBlendMode = 'screen';
            }
        };

        // Initial center gradient
        applyGradient(50, 50);
        el.style.opacity = '1';

        if (reducedMotion) {
            // Keep static subtle center glow only
            return;
        }

        const section = el.parentElement; if (!section) return;

        const handlePointer = (e: PointerEvent) => {
            const rect = section.getBoundingClientRect();
            target.current.x = (e.clientX - rect.left) / rect.width;
            target.current.y = (e.clientY - rect.top) / rect.height;
            if (!raf.current) loop();
        };
        section.addEventListener('pointermove', handlePointer, { passive: true });

        const loop = () => {
            pos.current.x += (target.current.x - pos.current.x) * sensitivity;
            pos.current.y += (target.current.y - pos.current.y) * sensitivity;
            const xPerc = (pos.current.x * 100);
            const yPerc = (pos.current.y * 100);
            applyGradient(xPerc, yPerc);
            raf.current = requestAnimationFrame(() => {
                if (Math.abs(target.current.x - pos.current.x) < 0.002 && Math.abs(target.current.y - pos.current.y) < 0.002) { raf.current = undefined; return; }
                loop();
            });
        };

        return () => {
            section.removeEventListener('pointermove', handlePointer);
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [sensitivity, reducedMotion]);

    return (
        <div
            ref={spotRef}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
            style={{ willChange: 'background-position, background', }}
            aria-hidden
        />
    );
};

export default HeroCursorField;
