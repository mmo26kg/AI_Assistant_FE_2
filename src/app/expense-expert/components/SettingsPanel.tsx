import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Settings, MessageSquare } from "lucide-react";
import { QUICK_SUGGESTIONS } from "../constants";

interface SettingsPanelProps {
    baseUrl: string;
    onClose?: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
    baseUrl,
    onClose
}) => {
    return (
        <div className="lg:col-span-1 space-y-6">
            {/* API Configuration */}
            <Card className="glass-effect border border-primary/20">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2 font-mono text-sm">
                        <Settings className="w-4 h-4 text-primary" />
                        API Configuration
                    </CardTitle>
                    {onClose && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="h-6 w-6 p-0"
                        >
                            ×
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="space-y-3">
                    <Input
                        placeholder="Base URL (VD: http://localhost:3000)"
                        value={baseUrl}
                        readOnly
                        className="text-xs glass-effect border-primary/20"
                    />
                </CardContent>
            </Card>

            {/* Quick Suggestions */}
            <Card className="glass-effect border border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-mono text-sm">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        Gợi Ý Nhanh
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-2">
                        {QUICK_SUGGESTIONS.map((suggestion, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs border-primary/20 hover:bg-primary/5 justify-start w-full"
                            >
                                {suggestion}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
