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
}

export const ToolResults: React.FC<ToolResultsProps> = ({
    toolResults,
    expandedCards,
    onToggleCard
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
                                        onClick={() => {}}
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
                                        onClick={() => {}}
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
                                                    {/* Arguments Content */}
                                                    {result.data.arguments && (
                                                        <div className="space-y-3">
                                                            <h4 className="text-xs font-semibold text-foreground">Arguments:</h4>
                                                            {Object.entries(result.data.arguments).map(([key, value]) => (
                                                                <div key={key} className="space-y-2">
                                                                    <div className="flex items-center gap-2">
                                                                        <div className={`w-1 h-4 bg-${cardColor.accent}-500 rounded-full`}></div>
                                                                        <span className="text-sm font-medium capitalize">{key}</span>
                                                                    </div>

                                                                    {Array.isArray(value) ? (
                                                                        <div className="ml-3 space-y-2">
                                                                            {value.map((item, index) => (
                                                                                <div key={index} className={`bg-${cardColor.accent}-500/5 rounded-lg p-3 border border-${cardColor.accent}-500/10`}>
                                                                                    <div className="text-xs text-muted-foreground mb-2">Item {index + 1}</div>
                                                                                    {typeof item === 'object' ? (
                                                                                        <div className="space-y-1">
                                                                                            {Object.entries(item).map(([itemKey, itemValue]) => (
                                                                                                <div key={itemKey} className="flex justify-between items-center">
                                                                                                    <span className="text-xs text-muted-foreground capitalize">{itemKey}:</span>
                                                                                                    <span className="text-sm font-mono">{String(itemValue)}</span>
                                                                                                </div>
                                                                                            ))}
                                                                                        </div>
                                                                                    ) : (
                                                                                        <span className="text-sm font-mono">{String(item)}</span>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    ) : typeof value === 'object' && value !== null ? (
                                                                        <div className={`ml-3 bg-${cardColor.accent}-500/5 rounded-lg p-3 border border-${cardColor.accent}-500/10`}>
                                                                            <div className="space-y-1">
                                                                                {Object.entries(value).map(([objKey, objValue]) => (
                                                                                    <div key={objKey} className="flex justify-between items-center">
                                                                                        <span className="text-xs text-muted-foreground capitalize">{objKey}:</span>
                                                                                        <span className="text-sm font-mono">{String(objValue)}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className={`ml-3 bg-${cardColor.accent}-500/5 rounded-lg p-2 border border-${cardColor.accent}-500/10`}>
                                                                            <span className="text-sm font-mono">{String(value)}</span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Raw JSON (collapsible) */}
                                                    <details className="mt-4">
                                                        <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
                                                            Raw JSON Data
                                                        </summary>
                                                        <div className={`mt-2 bg-${cardColor.accent}-500/5 rounded-lg p-3 border border-${cardColor.accent}-500/10`}>
                                                            <pre className="text-xs overflow-x-auto whitespace-pre-wrap font-mono">
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
