import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Shield, Heart, Star, TrendingUp, Bot } from 'lucide-react';

export default function HomePage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section with 3D Elements */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 gradient-bg">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-muted/2 to-primary/4"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full animate-float"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 bg-primary/8 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/6 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
                    <div className="absolute bottom-20 right-10 w-12 h-12 bg-primary/7 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect border border-primary/20 mb-8 animate-pulse-soft">
                        <Sparkles className="w-4 h-4 text-primary mr-2" />
                        <span className="text-sm font-medium text-foreground/80">AI-Powered Solutions 2025</span>
                    </div>

                    {/* Hero Title */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-mono mb-8 leading-tight">
                        <span className="block gradient-text">
                            Chào mừng đến với
                        </span>
                        <span className="block gradient-text mt-4">
                            AI Assistant
                        </span>
                    </h1>

                    {/* Hero Subtitle */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
                        Ứng dụng AI thông minh giúp bạn quản lý tài chính,
                        tối ưu hóa công việc và nâng cao hiệu suất với công nghệ tiên tiến nhất
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Link href="/expense-expert" className="group">
                            <button className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover-lift">
                                Khám phá Expense Expert
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <button className="inline-flex items-center px-8 py-4 glass-effect border border-primary/20 text-foreground font-semibold rounded-2xl hover:bg-primary/5 transition-all duration-300 transform hover:scale-105">
                            Xem Demo
                            <Star className="ml-2 w-5 h-5" />
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                        {[
                            { number: '99%', label: 'Độ chính xác' },
                            { number: '24/7', label: 'Hỗ trợ' },
                            { number: '1000+', label: 'Người dùng' },
                            { number: '4.9/5', label: 'Đánh giá' },
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
                            Tính năng nổi bật
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Khám phá các công cụ AI tiên tiến được thiết kế để nâng cao trải nghiệm của bạn
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="w-8 h-8" />,
                                title: 'Xử lý nhanh chóng',
                                description: 'AI xử lý dữ liệu trong thời gian thực với độ chính xác cao',
                                gradient: 'from-primary/80 to-primary'
                            },
                            {
                                icon: <Shield className="w-8 h-8" />,
                                title: 'Bảo mật tuyệt đối',
                                description: 'Mã hóa end-to-end đảm bảo dữ liệu của bạn luôn an toàn',
                                gradient: 'from-foreground/80 to-foreground/60'
                            },
                            {
                                icon: <Heart className="w-8 h-8" />,
                                title: 'Giao diện thân thiện',
                                description: 'Thiết kế trực quan, dễ sử dụng cho mọi đối tượng người dùng',
                                gradient: 'from-primary/70 to-primary/90'
                            },
                            {
                                icon: <TrendingUp className="w-8 h-8" />,
                                title: 'Phân tích thông minh',
                                description: 'Báo cáo chi tiết và insights để tối ưu hóa hiệu quả',
                                gradient: 'from-foreground/70 to-foreground/50'
                            },
                            {
                                icon: <Sparkles className="w-8 h-8" />,
                                title: 'AI tiên tiến',
                                description: 'Công nghệ machine learning mới nhất cho trải nghiệm tốt nhất',
                                gradient: 'from-primary/90 to-primary/70'
                            },
                            {
                                icon: <Star className="w-8 h-8" />,
                                title: 'Tương lai sẵn sàng',
                                description: 'Cập nhật liên tục với các tính năng và cải tiến mới',
                                gradient: 'from-foreground/60 to-foreground/40'
                            },
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
                            Sẵn sàng bắt đầu?
                        </h2>
                        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                            Tham gia cùng hàng ngàn người dùng đã tin tưởng và sử dụng AI Assistant
                            để nâng cao hiệu suất công việc và cuộc sống
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/expense-expert" className="group">
                                <button className="inline-flex items-center px-10 py-5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg">
                                    Thử ngay Expense Expert
                                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                            <button className="inline-flex items-center px-10 py-5 glass-effect border border-primary/20 text-foreground font-bold rounded-2xl hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 text-lg">
                                Tìm hiểu thêm
                            </button>
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
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold font-mono gradient-text">AI Assistant</span>
                        </div>
                        <div className="flex items-center space-x-8 text-sm text-muted-foreground">
                            <span>© 2025 AI Assistant. All rights reserved.</span>
                            <div className="flex items-center space-x-4">
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