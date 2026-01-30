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
      class="relative flex h-8 w-10 cursor-pointer items-center justify-center overflow-hidden rounded border border-gray-300 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
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
