# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm preview  # Preview production build
```

No test framework is configured.

## Architecture

This is a task manager app built with `@remix-run/component` - an experimental component library using a unique reactive pattern where components return render functions and use `this.update()` for reactivity.

### Key Pattern: Remix Component Model

Components use `function ComponentName(this: Handle)` syntax:

- State is declared as local variables
- Call `this.update()` after state changes to trigger re-render
- Return a render function `() => (<JSX />)` instead of JSX directly
- Use `this.context.set(value)` to provide context and `this.context.get(Type)` to consume it

Event handling uses `on={{ eventName: handler }}` instead of `onEventName`.

DOM refs use `connect={(el) => { ref = el }}` instead of `ref`.

### Structure

- `src/entry.tsx` - Main App component with task state management
- `src/components/` - UI components (TaskInput, TaskList, TaskItem, TaskFilter, TaskFooter, ThemeToggle, ThemeProvider)
- `src/stores/ThemeStore.ts` - Theme state using EventTarget pattern with `this.on(store, { change: handler })`
- `src/types.ts` - Shared TypeScript types

### Styling

Uses Tailwind CSS v4 with dark mode via class strategy. ThemeStore toggles `dark` class on `document.documentElement`.
