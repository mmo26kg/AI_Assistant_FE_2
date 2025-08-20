# Removed / Deprecated Items (Expense Expert)

## 2025-08-20
- Removed legacy utilities: animateThemeIcon, staggeredElementTransition from `utils/index.ts` (unused after advanced theme transition refactor).
- Deprecated & neutralized: `components/ThemeTransitionDemo.tsx` (expense-expert) and root `src/components/ThemeTransitionDemo.tsx` (both now stubs returning null).
- Migrated: Replaced legacy monolithic `page.tsx` with modular MainLayout version (Option B). `page-new.tsx` removed.

Rationale: Reduce bundle size and maintenance surface; eliminate dead code; adopt modular architecture.
