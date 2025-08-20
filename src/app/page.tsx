import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, Heart, Star, TrendingUp, Bot, Radar, Eye, Clock, Target } from 'lucide-react';

export default function HomePage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section Static Minimal Grid */}
            <section className="relative min-h-screen flex items-center justify-center hero-static-grid">
                {/* Static grid pattern (built into :before pseudo) */}
                {/* Removed animated aurora + noise + cursor field for fully static background */}
                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-primary/20 mb-8 animate-pulse-soft">
                        <Radar className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-foreground/80">Catch What Matters • 2025</span>
                    </div>

                    {/* Hero Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono mb-8 leading-tight">
                        <span className="block gradient-text">
                            KATCHX
                        </span>
                        <span className="block text-3xl md:text-4xl lg:text-5xl text-muted-foreground font-normal mt-4">
                            Your Intuitive AI Companion
                        </span>
                    </h1>

                    {/* Hero Subtitle */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                        KATCHX catches the subtle signals of what you need and delivers solutions before you even ask.
                        <span className="block mt-2 text-lg opacity-80">The AI that pays attention so you don&apos;t have to.</span>
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href="/expense-expert" className="group">
                            <button className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift">
                                Try KATCHX Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <Link href="/about" className="group">
                            <button className="inline-flex items-center px-8 py-4 glass-effect border border-primary/20 text-foreground font-semibold rounded-2xl hover:bg-primary/5 transition-all duration-300 transform hover:scale-105">
                                Learn More
                                <Eye className="ml-2 w-5 h-5" />
                            </button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            { number: '99%', label: 'Detection Rate' },
                            { number: '24/7', label: 'Always Watching' },
                            { number: '1000+', label: 'Happy Users' },
                            { number: '4.9/5', label: 'Satisfaction' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold gradient-text font-mono">
                                    {stat.number}
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold font-mono gradient-text mb-6">
                            How KATCHX Works
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Discover the intelligent features that make KATCHX the AI that truly gets you
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: <Radar className="w-8 h-8" />, title: 'Proactive Detection', description: 'Catches signals from your behavior patterns and anticipates needs before explicit requests', gradient: 'from-primary/80 to-primary' },
                            { icon: <Eye className="w-8 h-8" />, title: 'Silent Observation', description: 'Works quietly in the background, learning continuously without interrupting your flow', gradient: 'from-foreground/80 to-foreground/60' },
                            { icon: <Target className="w-8 h-8" />, title: 'Smart Prioritization', description: 'Sorts urgent from non-urgent, focuses on what truly matters to reduce cognitive load', gradient: 'from-primary/70 to-primary/90' },
                            { icon: <Clock className="w-8 h-8" />, title: 'Perfect Timing', description: 'Suggests actions at the right moment with gentle nudges and context-aware reminders', gradient: 'from-foreground/70 to-foreground/50' },
                            { icon: <Sparkles className="w-8 h-8" />, title: 'Continuous Learning', description: 'Gets better at understanding you over time, adapting to your unique patterns and preferences', gradient: 'from-primary/90 to-primary/70' },
                            { icon: <Shield className="w-8 h-8" />, title: 'Subtle Integration', description: 'Seamlessly integrates with your workflow without being intrusive or demanding attention', gradient: 'from-foreground/60 to-foreground/40' },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative glass-effect rounded-3xl p-8 hover-lift border border-white/10 hover:border-primary/20 transition-all duration-500"
                            >
                                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold font-mono mb-4 text-foreground group-hover:gradient-text transition-all duration-300">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-muted/3 to-primary/6"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center glass-effect rounded-3xl p-12 border border-white/10">
                        <h2 className="text-4xl md:text-5xl font-bold font-mono gradient-text mb-6">
                            Ready to be Caught?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            Join thousands of users who trust KATCHX to catch what matters and deliver solutions
                            <span className="block mt-2">before they even know they need them.</span>
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/expense-expert" className="group">
                                <button className="inline-flex items-center px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg">
                                    Start Catching Now
                                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <Link href="/about" className="group">
                                <button className="inline-flex items-center px-10 py-5 glass-effect border border-primary/20 text-foreground font-bold rounded-2xl hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 text-lg">
                                    Learn How It Works
                                    <Radar className="ml-3 w-6 h-6" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-16 glass-effect border-t border-white/10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                                <Radar className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold font-mono gradient-text">KATCHX</span>
                        </div>
                        <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                            <span>© 2025 KATCHX. Catch What Matters.</span>
                            <div className="flex items-center space-x-4">
                                <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                                <span>Privacy</span>
                                <span>Terms</span>
                                <span>Contact</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}