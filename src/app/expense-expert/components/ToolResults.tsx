import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ChevronDown, ChevronUp } from "lucide-react";
import { ToolResult } from "../types";
import { getCardColor } from "../utils";

interface ToolResultsProps {
    toolResults: ToolResult[];
    expandedCards: Set<string>;
    onToggleCard: (cardId: string) => void;
    onExpandAll?: () => void;
    onCollapseAll?: () => void;
    onClear?: () => void;
}

export const ToolResults: React.FC<ToolResultsProps> = ({
    toolResults,
    expandedCards,
    onToggleCard,
    onExpandAll,
    onCollapseAll,
    onClear
}) => {
    return (
        <div className="lg:col-span-2">
            <Card className="glass-effect border border-primary/20 hover-lift h-full">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2 font-mono">
                                <Settings className="w-5 h-5 text-primary" />
                                Tool Results
                            </CardTitle>
                            <CardDescription>Kết quả từ AI tool calls</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            {toolResults.length > 0 && (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            if (expandedCards.size === toolResults.length) {
                                                onCollapseAll && onCollapseAll();
                                            } else {
                                                onExpandAll && onExpandAll();
                                            }
                                        }}
                                        className="text-xs px-3 py-1 border-primary/20 hover:bg-primary/5"
                                        title={expandedCards.size === toolResults.length ? "Collapse All" : "Expand All"}
                                    >
                                        {expandedCards.size === toolResults.length ? (
                                            <ChevronUp className="w-4 h-4" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4" />
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onClear && onClear()}
                                        className="text-xs border-primary/20 hover:bg-primary/5"
                                    >
                                        Clear
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="max-h-[60vh] overflow-y-auto space-y-4 scroll-smooth">
                        {toolResults.length === 0 ? (
                            <div className="text-center text-muted-foreground py-8">
                                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p className="text-sm">Chưa có kết quả tool nào</p>
                                <p className="text-xs mt-1">Tool results sẽ hiển thị ở đây</p>
                            </div>
                        ) : (
                            toolResults.map((result, index) => {
                                const isExpanded = expandedCards.has(result.id);
                                const cardColor = getCardColor(index);
                                return (
                                    <Card key={result.id} className={`${cardColor.border} ${cardColor.bg} hover:shadow-md transition-all duration-200`}>
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-sm font-medium flex items-center gap-2">
                                                    <div className={`w-2 h-2 ${cardColor.dot} rounded-full`}></div>
                                                    <span className={cardColor.text}>{result.toolName}</span>
                                                </CardTitle>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-xs text-muted-foreground">{result.timestamp}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => onToggleCard(result.id)}
                                                        className={`h-6 w-6 p-0 hover:bg-${cardColor.accent}-500/10`}
                                                    >
                                                        {isExpanded ? (
                                                            <ChevronUp className="w-3 h-3" />
                                                        ) : (
                                                            <ChevronDown className="w-3 h-3" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="pt-0">
                                            {/* Compact View - Always Visible */}
                                            <div className={`mb-3 p-2 bg-${cardColor.accent}-500/5 rounded-lg border border-${cardColor.accent}-500/10`}>
                                                {/* Quick preview of arguments count */}
                                                {result.data.arguments && (
                                                    <div className="text-xs text-muted-foreground">
                                                        {Object.keys(result.data.arguments).length} argument(s)
                                                    </div>
                                                )}
                                            </div>

                                            {/* Expanded View - Conditionally Visible */}
                                            {isExpanded && (
                                                <div className="space-y-3">
                                                    {/* Arguments Content (Compact) */}
                                                    {result.data.arguments && (
                                                        <div className="space-y-2">
                                                            <h4 className="text-xs font-semibold text-foreground">Arguments:</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {Object.entries(result.data.arguments).map(([key, value]) => {
                                                                    const chips: { label: string; value: string }[] = [];

                                                                    const pushPrimitive = (lbl: string, val: any) => {
                                                                        chips.push({ label: lbl, value: typeof val === 'string' ? val : JSON.stringify(val) });
                                                                    };

                                                                    if (Array.isArray(value)) {
                                                                        value.forEach((item, idx) => {
                                                                            if (item && typeof item === 'object') {
                                                                                Object.entries(item).forEach(([ik, iv]) => pushPrimitive(`${key}[${idx}].${ik}`, iv));
                                                                            } else {
                                                                                pushPrimitive(`${key}[${idx}]`, item);
                                                                            }
                                                                        });
                                                                    } else if (value && typeof value === 'object') {
                                                                        Object.entries(value).forEach(([k2, v2]) => pushPrimitive(`${key}.${k2}`, v2));
                                                                    } else {
                                                                        pushPrimitive(key, value);
                                                                    }

                                                                    return (
                                                                        <React.Fragment key={key}>
                                                                            {chips.map(ch => (
                                                                                <div
                                                                                    key={ch.label}
                                                                                    className={`group px-2 py-1 rounded-md bg-${cardColor.accent}-500/10 border border-${cardColor.accent}-500/20 hover:border-${cardColor.accent}-500/40 text-[10px] leading-tight flex items-center gap-1 transition-colors`}
                                                                                >
                                                                                    <span className="font-medium text-foreground/80">{ch.label}:</span>
                                                                                    <span className="font-mono text-foreground/70 truncate max-w-[140px]" title={ch.value}>{ch.value}</span>
                                                                                </div>
                                                                            ))}
                                                                        </React.Fragment>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Raw JSON (collapsible) */}
                                                    <details className="mt-2">
                                                        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                                                            Raw JSON Data
                                                        </summary>
                                                        <div className={`mt-2 bg-${cardColor.accent}-500/5 rounded-lg p-3 border border-${cardColor.accent}-500/10`}>
                                                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap font-mono max-h-64">
                                                                {JSON.stringify(result.data, null, 2)}
                                                            </pre>
                                                        </div>
                                                    </details>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )
                            })
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
