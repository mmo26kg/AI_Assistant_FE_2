'use client';

import { useState, useEffect } from 'react';
import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  BrainCircuit,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileText,
  Target,
  Activity,
  Users,
  Zap,
  Moon,
  Sun,
  Monitor,
  Settings,
  Database,
  Search,
  Plus,
  Blocks,
  TrendingUp,
  Server
} from 'lucide-react';

interface Requirement {
  id: string;
  text: string;
  timestamp: Date;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

interface MCPResult {
  id: string;
  requirementId: string;
  tool: string;
  status: 'success' | 'error';
  data: any;
  timestamp: Date;
}

export default function MCPShowcase() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [results, setResults] = useState<MCPResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Thêm requirement mới
  const addRequirement = () => {
    if (!currentInput.trim()) return;

    const newRequirement: Requirement = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      text: currentInput.trim(),
      timestamp: new Date(),
      status: 'pending'
    };

    setRequirements(prev => [newRequirement, ...prev]);
    setCurrentInput('');

    // Simulate MCP processing
    simulateMCPProcess(newRequirement);
  };

  // Simulate MCP processing
  const simulateMCPProcess = async (requirement: Requirement) => {
    // Update requirement status to processing
    setRequirements(prev =>
      prev.map(req =>
        req.id === requirement.id
          ? { ...req, status: 'processing' as const }
          : req
      )
    );

    setIsProcessing(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock tool selection and result
    const mockTools = [
      'notion_API-post-search',
      'notion_API-create-a-page',
      'notion_API-get-block-children',
      'notion_API-post-database-query',
      'semantic_search'
    ];

    const selectedTool = mockTools[Math.floor(Math.random() * mockTools.length)];

    const mockResult: MCPResult = {
      id: `result_${Date.now()}`,
      requirementId: requirement.id,
      tool: selectedTool,
      status: Math.random() > 0.1 ? 'success' : 'error',
      data: generateMockData(selectedTool),
      timestamp: new Date()
    };

    // Update requirement status
    setRequirements(prev =>
      prev.map(req =>
        req.id === requirement.id
          ? { ...req, status: 'completed' as const }
          : req
      )
    );

    // Add result
    setResults(prev => [mockResult, ...prev]);
    setIsProcessing(false);
  };

  // Generate mock data based on tool
  const generateMockData = (tool: string) => {
    switch (tool) {
      case 'notion_API-post-search':
        return {
          results: [
            { id: '1', title: 'Ghi Chú Cuộc Họp', type: 'page' },
            { id: '2', title: 'Kế Hoạch Dự Án', type: 'database' }
          ]
        };
      case 'notion_API-create-a-page':
        return {
          page_id: 'page_12345',
          title: 'Trang Mới Được Tạo',
          url: 'https://notion.so/page_12345'
        };
      case 'semantic_search':
        return {
          matches: [
            { text: 'Best practices cho React component', score: 0.95 },
            { text: 'Patterns routing trong Next.js', score: 0.87 }
          ]
        };
      default:
        return { message: 'Thao tác hoàn thành thành công' };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-600 dark:text-amber-400';
      case 'processing': return 'text-blue-600 dark:text-blue-400';
      case 'completed': return 'text-emerald-600 dark:text-emerald-400';
      case 'error': return 'text-red-600 dark:text-red-400';
      default: return 'text-slate-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return Clock;
      case 'processing': return Loader2;
      case 'completed': return CheckCircle;
      case 'error': return AlertCircle;
      default: return FileText;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'processing': return 'Đang xử lý';
      case 'completed': return 'Hoàn thành';
      case 'error': return 'Lỗi';
      default: return 'Không xác định';
    }
  };

  const getToolIcon = (tool: string) => {
    if (tool.includes('search')) return Search;
    if (tool.includes('create')) return Plus;
    if (tool.includes('database')) return Database;
    if (tool.includes('semantic')) return BrainCircuit;
    return Settings;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-6 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <BrainCircuit className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MCP Host Interface
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
              Model Context Protocol - Quản lý công cụ tương tác thông minh với giao diện hiện đại
            </p>
          </div>

          {/* Input Section */}
          <Card className="mb-8 border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Send className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                Gửi Yêu Cầu
              </CardTitle>
              <CardDescription className="text-base">
                Mô tả nhu cầu của bạn và để các công cụ MCP xử lý một cách thông minh
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="vd: Tìm kiếm tài liệu dự án trong Notion..."
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                    className="pl-4 pr-12 h-12 text-base border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20"
                  />
                </div>
                <Button
                  onClick={addRequirement}
                  disabled={!currentInput.trim() || isProcessing}
                  className="h-12 px-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang xử lý...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Gửi
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Requirements List */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      <span>Hàng Đợi Yêu Cầu</span>
                    </div>
                    <Badge variant="secondary" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                      {requirements.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {requirements.length === 0 ? (
                      <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">
                          Chưa có yêu cầu nào. Thêm yêu cầu ở trên để bắt đầu.
                        </p>
                      </div>
                    ) : (
                      requirements.map((req) => {
                        const StatusIcon = getStatusIcon(req.status);
                        return (
                          <div
                            key={req.id}
                            className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-md transition-all duration-200"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-2 line-clamp-2">
                                  {req.text}
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {mounted ? req.timestamp.toLocaleTimeString('vi-VN') : '--:--:--'}
                                </p>
                              </div>
                              <div className={`flex items-center gap-2 text-sm font-medium ${getStatusColor(req.status)}`}>
                                <StatusIcon className={`w-4 h-4 ${req.status === 'processing' ? 'animate-spin' : ''}`} />
                                <span className="whitespace-nowrap">{getStatusText(req.status)}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Section */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm h-fit">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                      <span>Kết Quả MCP</span>
                    </div>
                    <Badge variant="secondary" className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300">
                      {results.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {results.length === 0 ? (
                      <div className="text-center py-12">
                        <Target className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-500 dark:text-slate-400">
                          Kết quả sẽ hiển thị ở đây sau khi xử lý yêu cầu.
                        </p>
                      </div>
                    ) : (
                      results.map((result) => {
                        const ToolIcon = getToolIcon(result.tool);
                        return (
                          <Card key={result.id} className="border-l-4 border-l-indigo-500 dark:border-l-indigo-400 shadow-md">
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between">
                                <CardTitle className="text-base flex items-center gap-3">
                                  <ToolIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                  <span className="font-mono text-sm">{result.tool}</span>
                                  <Badge
                                    variant={result.status === 'success' ? 'default' : 'destructive'}
                                    className={result.status === 'success'
                                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                                      : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                                    }
                                  >
                                    {result.status === 'success' ? 'Thành công' : 'Lỗi'}
                                  </Badge>
                                </CardTitle>
                                <span className="text-xs text-slate-500 dark:text-slate-400">
                                  {mounted ? result.timestamp.toLocaleTimeString('vi-VN') : '--:--:--'}
                                </span>
                              </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border">
                                <pre className="whitespace-pre-wrap text-xs overflow-auto text-slate-700 dark:text-slate-300">
                                  {JSON.stringify(result.data, null, 2)}
                                </pre>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* System Status */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <Card className="border-0 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full mx-auto mb-3">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {requirements.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Tổng Yêu Cầu
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-full mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {results.filter(r => r.status === 'success').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Thành Công
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mx-auto mb-3">
                  <Loader2 className={`w-6 h-6 text-blue-600 dark:text-blue-400 ${requirements.filter(r => r.status === 'processing').length > 0 ? 'animate-spin' : ''}`} />
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {requirements.filter(r => r.status === 'processing').length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Đang Xử Lý
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-full mx-auto mb-3">
                  {isProcessing ? (
                    <Activity className="w-6 h-6 text-slate-600 dark:text-slate-400 animate-pulse" />
                  ) : (
                    <Server className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  )}
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {isProcessing ? '🔄' : '💤'}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {isProcessing ? 'Hoạt Động' : 'Nghỉ'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Theme Controls */}
          <Card className="mt-8 border-0 shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                Điều Khiển Giao Diện
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("light")}
                  className="flex items-center gap-2"
                >
                  <Sun className="w-4 h-4" />
                  Sáng
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("dark")}
                  className="flex items-center gap-2"
                >
                  <Moon className="w-4 h-4" />
                  Tối
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTheme("system")}
                  className="flex items-center gap-2"
                >
                  <Monitor className="w-4 h-4" />
                  Hệ Thống
                </Button>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
                Giao diện hiện tại: <span className="font-medium">{mounted ? (theme || "hệ thống") : "đang tải..."}</span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
