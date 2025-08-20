import { CARD_COLORS } from "../constants";
import { ToolCall, ToolResult } from "../types";

export const getCardColor = (index: number) => {
    return CARD_COLORS[index % CARD_COLORS.length];
};

export const generateTimestamp = () => {
    return new Date().toLocaleTimeString();
};

// Theme transition animation utilities
export const createThemeTransition = (fromDark: boolean, triggerElement: HTMLElement) => {
    const body = document.body;
    const duration = 1000; // 1 second

    // Get trigger button position for animation origin
    const rect = triggerElement.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;

    // Calculate maximum radius needed to cover entire viewport
    const maxRadius = Math.sqrt(
        Math.pow(Math.max(originX, window.innerWidth - originX), 2) +
        Math.pow(Math.max(originY, window.innerHeight - originY), 2)
    );

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        // Simple fade transition for accessibility
        body.style.transition = 'background-color 300ms ease-in-out';
        return Promise.resolve();
    }

    // Create overlay for smooth transition
    const overlay = document.createElement('div');
    overlay.className = 'theme-transition-overlay';
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
        transition: clip-path ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1);
    `;

    body.appendChild(overlay);

    // Trigger animation
    requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(${maxRadius * 1.2}px at ${originX}px ${originY}px)`;
    });

    // Clean up and resolve promise
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            overlay.remove();
            resolve();
        }, duration);
    });
};

export const animateThemeIcon = (iconElement: HTMLElement, isDark: boolean) => {
    const duration = 600;

    // Icon rotation and morph animation
    iconElement.style.transition = `transform ${duration}ms cubic-bezier(0.4, 0.0, 0.2, 1)`;
    iconElement.style.transform = 'rotate(180deg) scale(0.8)';

    setTimeout(() => {
        iconElement.style.transform = 'rotate(360deg) scale(1.05)';
    }, duration / 2);

    setTimeout(() => {
        iconElement.style.transform = 'rotate(360deg) scale(1)';
    }, duration);

    // Reset transform after animation
    setTimeout(() => {
        iconElement.style.transition = '';
        iconElement.style.transform = '';
    }, duration + 100);
};

export const staggeredElementTransition = (elements: NodeListOf<Element>, delay: number = 50) => {
    elements.forEach((element, index) => {
        const htmlElement = element as HTMLElement;
        htmlElement.style.transition = `color 400ms ease-in-out, background-color 400ms ease-in-out`;
        htmlElement.style.transitionDelay = `${index * delay}ms`;

        // Reset after animation
        setTimeout(() => {
            htmlElement.style.transition = '';
            htmlElement.style.transitionDelay = '';
        }, 400 + (index * delay) + 100);
    });
};

export const addThemeTransitionStyles = () => {
    if (document.getElementById('theme-transition-styles')) return;

    const styles = document.createElement('style');
    styles.id = 'theme-transition-styles';
    styles.textContent = `
        /* Theme transition base styles */
        .theme-transitioning {
            transition: none !important;
        }
        
        .theme-transition-overlay {
            will-change: clip-path;
            transform: translateZ(0);
        }
        
        /* Smooth color transitions for common elements */
        .smooth-theme-transition {
            transition: 
                color 400ms cubic-bezier(0.4, 0.0, 0.2, 1),
                background-color 400ms cubic-bezier(0.4, 0.0, 0.2, 1),
                border-color 400ms cubic-bezier(0.4, 0.0, 0.2, 1),
                box-shadow 400ms cubic-bezier(0.4, 0.0, 0.2, 1);
        }
        
        /* Particle effects for enhanced experience */
        @keyframes particleFloat {
            0% {
                opacity: 0;
                transform: translateY(20px) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-10px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-30px) scale(0.5);
            }
        }
        
        .theme-particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: currentColor;
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat 1.5s ease-out forwards;
        }
        
        /* Elastic bounce effect */
        @keyframes elasticBounce {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .elastic-bounce {
            animation: elasticBounce 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        /* Reduced motion fallback */
        @media (prefers-reduced-motion: reduce) {
            .theme-transition-overlay {
                transition: opacity 300ms ease-in-out !important;
                clip-path: none !important;
            }
            
            .smooth-theme-transition {
                transition-duration: 150ms !important;
            }
            
            .elastic-bounce {
                animation: none !important;
            }
        }
    `;

    document.head.appendChild(styles);
};

export const createParticleEffect = (originX: number, originY: number, color: string) => {
    const particleCount = 8;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'theme-particle';
        particle.style.cssText = `
            left: ${originX}px;
            top: ${originY}px;
            color: ${color};
            animation-delay: ${i * 50}ms;
            z-index: 10000;
        `;

        document.body.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 1500 + (i * 50));
    }
};

export const processToolCalls = (toolCalls: ToolCall[]): ToolResult[] => {
    const extractedResults: ToolResult[] = [];

    // Only create separate cards if there are multiple tool calls
    if (toolCalls.length > 1) {
        // Multiple tool calls - each gets its own card
        toolCalls.forEach((tool: ToolCall, index: number) => {
            extractedResults.push({
                id: `${tool.id}-${index}`,
                toolName: tool.name,
                type: 'Tool Call Result',
                data: {
                    name: tool.name,
                    arguments: tool.arguments,
                    id: tool.id
                },
                timestamp: generateTimestamp()
            });
        });
    } else if (toolCalls.length === 1) {
        // Single tool call - check if it has multiple items in arguments
        const tool = toolCalls[0];
        let hasMultipleItems = false;

        // Check if any argument contains an array with multiple items
        if (tool.arguments) {
            Object.values(tool.arguments).forEach(value => {
                if (Array.isArray(value) && value.length > 1) {
                    hasMultipleItems = true;
                }
            });
        }

        if (hasMultipleItems) {
            // Single tool with multiple items - create one card with all content
            extractedResults.push({
                id: tool.id,
                toolName: tool.name,
                type: 'Tool Call Result',
                data: {
                    name: tool.name,
                    arguments: tool.arguments,
                    id: tool.id
                },
                timestamp: generateTimestamp()
            });
        }
        // If single tool with single items, don't create cards
    }

    return extractedResults;
};

export const scrollToBottom = (containerRef: React.RefObject<HTMLDivElement>) => {
    if (containerRef.current) {
        containerRef.current.scrollTo({
            top: containerRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
};
