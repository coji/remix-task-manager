import type { Handle } from '@remix-run/component'
import { animations } from '../lib/animations'
import type { ThemeStore } from '../stores/ThemeStore'
import ThemeProvider from './ThemeProvider'

export default function ThemeToggle(handle: Handle) {
  const theme = handle.context.get(ThemeProvider) as ThemeStore

  handle.on(theme, { change: () => handle.update() })

  return () => (
    <button
      type="button"
      class="border-border bg-surface-stronger text-muted hover:border-accent-border hover:bg-surface-soft hover:text-text relative inline-flex h-8 w-9 cursor-pointer items-center justify-center overflow-hidden rounded-xl border text-sm transition"
      on={{ click: () => theme.toggle() }}
    >
      {theme.value === 'light' ? (
        <span key="moon" class="absolute" animate={animations.iconSwap}>
          🌙
        </span>
      ) : (
        <span key="sun" class="absolute" animate={animations.iconSwap}>
          ☀️
        </span>
      )}
    </button>
  )
}
