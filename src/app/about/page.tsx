// About page full content (Restored)
export const metadata = { title: 'About KATCHX', description: 'KATCHX brand, philosophy, and value propositions.' };

import Link from 'next/link';
import { ArrowRight, Radar, Eye, Clock, Shield, Lightbulb, Heart, Zap, CheckCircle, TrendingUp, Target, Users } from 'lucide-react';

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 gradient-bg">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-muted/3 to-primary/8" />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-primary/20 mb-8">
                            <Radar className="w-4 h-4 text-primary mr-2" />
                            <span className="text-sm font-medium text-foreground/80">About KATCHX</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold font-mono gradient-text mb-8">The AI That Gets You</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                            KATCHX is more than just an AI assistant - it&apos;s an intuitive companion that catches the subtle signals of what you need and delivers solutions before you even ask.
                        </p>
                        <div className="grid md:grid-cols-3 gap-8 mt-16">
                            {[
                                { icon: <Eye className="w-8 h-8" />, title: 'Intuitive', desc: 'Understands unspoken needs' },
                                { icon: <Shield className="w-8 h-8" />, title: 'Reliable', desc: 'Never misses what matters' },
                                { icon: <Zap className="w-8 h-8" />, title: 'Proactive', desc: 'Acts before you ask' },
                            ].map((trait, i) => (
                                <div key={i} className="glass-effect rounded-2xl p-6 border border-white/10">
                                    <div className="text-primary mb-4">{trait.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{trait.title}</h3>
                                    <p className="text-muted-foreground">{trait.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Concept */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold font-mono gradient-text mb-6">“Catch Every Need, Execute Perfectly”</h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Our core philosophy drives everything we build - an AI that truly understands you</p>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className="space-y-8">
                                <div className="glass-effect rounded-3xl p-8 border border-white/10">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center"><Radar className="w-6 h-6 text-primary mr-3" />Silent Detection</h3>
                                    <p className="text-muted-foreground leading-relaxed">KATCHX bắt được mọi tín hiệu, nhu cầu thầm lặng của người dùng. Như một người bạn hiểu ý, biết bạn cần gì trước khi bạn nói.</p>
                                </div>
                                <div className="glass-effect rounded-3xl p-8 border border-white/10">
                                    <h3 className="text-2xl font-bold mb-4 flex items-center"><Clock className="w-6 h-6 text-primary mr-3" />Perfect Timing</h3>
                                    <p className="text-muted-foreground leading-relaxed">AI luôn lắng nghe, sẵn sàng hỗ trợ mà không cần yêu cầu rõ ràng. Tinh tế, không gây phiền nhiễu nhưng luôn hiệu quả.</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="glass-effect rounded-3xl p-12 border border-white/10 text-center">
                                    <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-primary/20 to-primary/40 rounded-full flex items-center justify-center">
                                        <Radar className="w-16 h-16 text-primary animate-pulse" />
                                    </div>
                                    <h4 className="text-2xl font-bold gradient-text mb-4">Always Listening</h4>
                                    <p className="text-muted-foreground">Continuous pattern recognition and intelligent anticipation</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Personality */}
            <section className="py-24 bg-gradient-to-r from-primary/5 via-muted/3 to-primary/6">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold font-mono gradient-text mb-6">Our Personality</h2>
                            <p className="text-xl text-muted-foreground">Four core traits that define how KATCHX interacts with you</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: <Lightbulb className="w-8 h-8" />, title: 'Intuitive', description: 'Hiểu biết trực giác, bắt được điều chưa nói', color: 'from-blue-500/80 to-blue-600' },
                                { icon: <CheckCircle className="w-8 h-8" />, title: 'Reliable', description: 'Đáng tin cậy, không bao giờ bỏ sót', color: 'from-green-500/80 to-green-600' },
                                { icon: <TrendingUp className="w-8 h-8" />, title: 'Proactive', description: 'Chủ động hỗ trợ, không chờ đợi', color: 'from-orange-500/80 to-orange-600' },
                                { icon: <Heart className="w-8 h-8" />, title: 'Subtle', description: 'Tinh tế, không gây phiền nhiễu', color: 'from-purple-500/80 to-purple-600' },
                            ].map((trait, i) => (
                                <div key={i} className="group">
                                    <div className="glass-effect rounded-3xl p-8 border border-white/10 hover-lift h-full">
                                        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${trait.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>{trait.icon}</div>
                                        <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">{trait.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{trait.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Value Propositions */}
            <section className="py-24 bg-gradient-to-r from-primary/5 via-muted/3 to-primary/6">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold font-mono gradient-text mb-6">Core Value Propositions</h2>
                            <p className="text-xl text-muted-foreground">Three key areas where KATCHX delivers exceptional value</p>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {[
                                { icon: <Radar className="w-12 h-12" />, title: 'Proactive Detection', features: ['Catches signals from behavior patterns', 'Anticipates needs before requests', 'Learns from context and habits'] },
                                { icon: <Shield className="w-12 h-12" />, title: 'Seamless Integration', features: ['Works quietly in background', 'Non-intrusive notifications', 'Smooth workflow integration'] },
                                { icon: <Target className="w-12 h-12" />, title: 'Intelligent Prioritization', features: ['Sorts urgent from non-urgent', 'Focuses on what truly matters', 'Reduces cognitive load'] },
                            ].map((p, i) => (
                                <div key={i} className="glass-effect rounded-3xl p-8 border border-white/10 h-full">
                                    <div className="text-primary mb-6">{p.icon}</div>
                                    <h3 className="text-2xl font-bold mb-6">{p.title}</h3>
                                    <ul className="space-y-3">
                                        {p.features.map((f, fi) => (
                                            <li key={fi} className="flex items-start"><CheckCircle className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" /><span className="text-muted-foreground">{f}</span></li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audiences */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold font-mono gradient-text mb-6">Who We Serve</h2>
                            <p className="text-xl text-muted-foreground">KATCHX is designed for different types of users who value intelligent automation</p>
                        </div>
                        <div className="grid lg:grid-cols-3 gap-8">
                            {[
                                { icon: <Users className="w-8 h-8" />, title: 'Busy Knowledge Workers', age: 'Age: 28-45', description: 'Values efficiency and intelligent automation. Struggles with information overload and wants technology that "just works".' },
                                { icon: <Lightbulb className="w-8 h-8" />, title: 'Creative Professionals', age: 'Age: 25-40', description: 'Needs uninterrupted focus time. Values tools that enhance rather than distract and appreciates subtle, elegant solutions.' },
                                { icon: <Heart className="w-8 h-8" />, title: 'Tech-Savvy Families', age: 'Age: 30-50', description: 'Managing multiple schedules and priorities. Wants technology that reduces household chaos while valuing privacy and security.' },
                            ].map((a, i) => (
                                <div key={i} className="glass-effect rounded-3xl p-8 border border-white/10 hover-lift">
                                    <div className="text-primary mb-6">{a.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{a.title}</h3>
                                    <p className="text-sm text-primary mb-4 font-medium">{a.age}</p>
                                    <p className="text-muted-foreground leading-relaxed">{a.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-muted/5 to-primary/10" />
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold font-mono gradient-text mb-6">Experience KATCHX Today</h2>
                        <p className="text-xl text-muted-foreground mb-12 leading-relaxed">Ready to work with an AI that truly gets you? Start your journey with KATCHX and discover what it means to have an intuitive AI companion.</p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/expense-expert" className="group"><button className="inline-flex items-center px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg">Try KATCHX Now<ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" /></button></Link>
                            <Link href="/" className="group"><button className="inline-flex items-center px-10 py-5 glass-effect border border-primary/20 text-foreground font-bold rounded-2xl hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 text-lg">Back to Home<Radar className="ml-3 w-6 h-6" /></button></Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
