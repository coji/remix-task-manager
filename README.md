# Remix 3 Task Manager Demo

A simple task manager app built with `@remix-run/component` - an experimental component library from Remix 3 that uses Web Standards instead of React hooks.

## Live Demo

https://remix-task-manager-eight.vercel.app/

## Features

- Add, complete, and delete tasks
- Long press to edit
- Arrow key navigation between tasks
- Dark mode toggle

## Key Differences from React

| What you want | React                       | Remix 3                     |
| ------------- | --------------------------- | --------------------------- |
| State         | `useState` (auto re-render) | Plain variables             |
| Re-render     | Automatic (batched)         | Manual `this.update()`      |
| Side effects  | `useEffect` with deps array | Just write it               |
| Cleanup       | Return function             | `AbortSignal`               |
| Shared state  | Context (auto re-render)    | `EventTarget` + `this.on()` |

Remix 3 uses **JavaScript and Web Standards** instead of React-specific patterns.

## Development

```bash
pnpm install
pnpm dev      # Start development server
pnpm build    # Build for production
```

## Related Articles (Japanese)

- [Remix 3 Component Library Trial](https://zenn.dev/coji/articles/remix-3-component-library-trial)
- [Semantic Events and ViewModel to Reduce Framework Dependency](https://zenn.dev/coji/articles/remix-3-interaction-and-viewmodel)

## License

MIT
