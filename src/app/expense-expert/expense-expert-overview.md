# Expense Expert Module Overview

## 1. Purpose
A modular AI-assisted expense tracking interface enabling natural language input, automated tool call extraction, categorized visualization, and quick manual additions.

## 2. High-Level Architecture
- Hero + Actions (entry & CTA layer)
- Chat Experience (NLP interaction + tool call surfacing)
- Analytical Panels (stats, categories, recent transactions)
- Utility & Domain Layer (services, hooks, constants, types, mock data, animations)
- Theme Transition System (advanced animated theme switching exposed via hook & toggle component outside this directory)

## 3. Directory Structure (key files)
```
/expense-expert
  page.tsx (legacy monolithic page)
  page-new.tsx (refactored root using MainLayout)
  expense-expert-overview.md (this document)
  constants/index.ts
  types/index.ts
  services/ChatService.ts
  hooks/
    useChatManager.ts
    useToolResults.ts
    useThemeTransition.ts
  utils/index.ts (card colors, timestamps, animation utilities, tool call processing)
  data/mockData.tsx (mock stats, transactions, categories)
  components/
    MainLayout.tsx
    HeroSection.tsx
    SettingsPanel.tsx
    ChatInterface.tsx
    ToolResults.tsx
    QuickAddExpense.tsx
    StatisticsCards.tsx
    RecentTransactions.tsx
    ExpenseCategories.tsx
    ActionButtons.tsx
    ThemeTransitionDemo.tsx (currently unused)
```

## 4. Data Flow
User -> ChatInterface input -> useChatManager.handleSendMessage -> ChatService.fetch(api/chat)
 -> server JSON { success, response, toolCalls }
 -> AI reply appended to chatMessages
 -> toolCalls processed via utils.processToolCalls -> ToolResults state

Manual quick suggestions (constants.QUICK_SUGGESTIONS) set chatInput.
QuickAddExpense (currently UI only) would be extended to persist a transaction list / send to backend.

## 5. Core Types (types/index.ts)
- ToolCall: { id, name, arguments }
- ChatMessage: user/ai message + optional toolCalls
- ToolResult: normalized card data from toolCalls
- CardColor, Transaction, ExpenseCategory, StatCard domain view models

## 6. Hooks
- useChatManager: owns chatInput, chatMessages, toolResults; orchestrates API round‑trip & tool call normalization.
- useToolResults: manages expand/collapse state for result cards.
- useThemeTransition: advanced WAAPI-based transition trigger (fade / easing curves) independent of theme toggle logic.

## 7. Services
ChatService: wraps POST to /api/chat, injecting SYSTEM_PROMPT + CHAT_OPTIONS constants for consistency.

## 8. Utilities (utils/index.ts)
- getCardColor(index)
- generateTimestamp()
- createThemeTransition(fromDark, triggerEl): baseline radial clip-path overlay (legacy; more advanced version lives in theme toggle component outside this folder)
- animateThemeIcon, staggeredElementTransition (some now superseded / partially unused)
- addThemeTransitionStyles: injects global animation CSS once
- createParticleEffect: ephemeral particle burst
- processToolCalls(toolCalls): normalization logic producing ToolResult[] (single vs multiple heuristic)
- scrollToBottom(ref)

NOTE: Some animation helpers (parallax/stagger) were deprecated in final UX but code remains; candidates for pruning.

## 9. Components
- MainLayout: composition root orchestrating hero, settings, chat, results, analytics panels.
- HeroSection: marketing header + optional quick action buttons (open settings/add expense).
- SettingsPanel: displays API base URL + quick suggestions (read-only; suggestions currently not wired to chat in the refactor version—consider passing callback).
- ChatInterface: renders messages, tool call metadata blocks, typing indicator, input.
- ToolResults: colored cards listing normalized tool call argument structures; expand/collapse per card (global expand/collapse actions TODO – handlers presently placeholders).
- QuickAddExpense: form skeleton for manual transaction entry (no persistence yet).
- StatisticsCards / RecentTransactions / ExpenseCategories: analytical & summary displays currently sourced from mock data.
- ActionButtons: grid of gradient action shortcuts (some stubbed functions / console logs).
- ThemeTransitionDemo: legacy showcase (not mounted).

## 10. Styling & Visual Language
- Tailwind utility classes + custom classes (glass-effect, hover-lift, gradient-text, animate-float, animate-pulse-soft).
- Color accent cycling via CARD_COLORS for ToolResults.
- Dark/light handled globally (next-themes). Local components assume parent supplies theme classes.

## 11. Theme Transition System
Inside this module: createThemeTransition (simpler radial expansion). Outside: enhanced theme toggle implements multi-layer mask, delayed theme swap (~300ms), icon morph, particles, staged opacity curves, finishing veil. Hook useThemeTransition adds configurable WAAPI fade sequences (opacityCurve: standard | cinematic | pulse | spring) and fadeOutAtEnd control.

## 12. Accessibility
- Prefers reduced motion check in createThemeTransition (fallback to simple fade).
- Buttons include icon + text labels; potential improvement: aria-labels for icon-only controls (ToolResults expand, clear, etc.).

## 13. Pending / Improvements
1. Wire SettingsPanel quick suggestion buttons to ChatInterface (currently inert in refactored layout).
2. Implement expand/collapse all + clear actions in ToolResults (handlers placeholders).
3. Persist QuickAddExpense entries (state, validation, backend integration).
4. Consolidate duplicated theme transition logic (unify legacy + advanced implementations).
5. Remove deprecated animation utilities (staggeredElementTransition if unused) & ThemeTransitionDemo if obsolete.
6. Add error display UI for failed API calls (currently silent aside from console + fallback message).
7. Add loading/disabled state to action buttons triggering async tasks (future features).
8. Create real data layer / integrate with persistent storage.
9. Internationalization strategy (currently Vietnamese strings inline).
10. Type polish: stronger typing for toolCalls.arguments (narrow expected shapes).

## 14. Extension Points
- Middleware layer for toolCalls to allow transformation / filtering.
- Pluggable renderer for ToolResults (different visualization per toolName).
- Theming tokens: centralize gradient + glass-effect definitions.
- Analytics events on user interactions (message send, expand card, add expense).

## 15. Recommended Next Steps (Actionable)
Immediate:
- Implement missing handlers in ToolResults (expand/collapse all, clear) using useToolResults + lifting state or passing callbacks.
- Connect quick suggestions in SettingsPanel to chat input via prop callback.
Short-term:
- Refactor theme transition helpers into a dedicated animation module & remove dead code.
- Introduce real transaction state and hook for QuickAddExpense.
Medium:
- Replace mock data with API or persistent store.
- Add unit tests for processToolCalls normalization logic.
- Add skeleton loading states for analytics panels during data fetch.

## 16. Data Contract (API/chat)
Request: { messages: [{ role: 'user', content }], systemPrompt, options }
Response: { success: boolean, response: string, toolCalls?: [{ id, name, arguments }] }
Tool call post-processing heuristic: Single tool + single scalar arguments => no card; collections => card; multiple tools => one card per tool.

## 17. Known Constraints
- ToolCalls argument complexity not deeply validated; assumes JSON-safe values.
- Large argument payload may impact render performance (no virtualization yet).
- Theme transition timing assumes ~300ms theme class repaint risk window; browser differences may vary.

## 18. Glossary
- Tool Call: AI-invoked functional action with structured arguments.
- Tool Result Card: UI representation of a normalized tool call payload.
- Opacity Curve (Theme): Predefined keyframe profile controlling perceived pacing of fade-out.

---
Generated: 2025-08-20
