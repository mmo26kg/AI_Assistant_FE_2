import React from 'react';

export const ThemeTransitionDemo: React.FC = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">
                🌟 Aurora Theme Transition
            </h1>

            <div className="prose prose-lg max-w-none space-y-6">
                <div className="bg-card p-6 rounded-lg border">
                    <h2 className="text-xl font-semibold mb-4">✨ Features Implemented</h2>
                    <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <strong>Radial Expansion:</strong> Animation starts from theme toggle button position
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <strong>Smooth Timing:</strong> 1000ms duration with cubic-bezier easing
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            <strong>Staggered Elements:</strong> UI components transition with slight delays
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            <strong>Icon Animation:</strong> Sun/Moon morphs with rotation and scaling
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                            <strong>Particle Effects:</strong> Subtle floating particles from origin point
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                            <strong>Elastic Bounce:</strong> Button scales with satisfying bounce effect
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            <strong>Accessibility:</strong> Reduced motion fallback for sensitive users
                        </li>
                    </ul>
                </div>

                <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-3">🎨 Technical Implementation</h3>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-medium mb-2">Animation Techniques:</h4>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>• CSS clip-path for radial reveal</li>
                                <li>• Transform & opacity for 60fps performance</li>
                                <li>• CSS custom properties for dynamic origins</li>
                                <li>• RequestAnimationFrame for smooth triggers</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">User Experience:</h4>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>• Elegant daybreak/sunset metaphor</li>
                                <li>• Purposeful visual feedback</li>
                                <li>• Satisfying interaction rewards</li>
                                <li>• Smooth performance across devices</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="text-center p-6 bg-gradient-to-r from-amber-50 to-blue-50 dark:from-amber-950/20 dark:to-blue-950/20 rounded-lg">
                    <p className="text-lg font-medium mb-2">
                        🌅 Try the theme toggle in the navigation!
                    </p>
                    <p className="text-muted-foreground">
                        Watch as the new theme expands like dawn breaking across the interface
                    </p>
                </div>
            </div>
        </div>
    );
};
