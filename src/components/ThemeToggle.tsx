import type { Handle } from '@remix-run/component'
import type { ThemeStore } from '../stores/ThemeStore'
import ThemeProvider from './ThemeProvider'

export default function ThemeToggle(this: Handle) {
  const theme = this.context.get(ThemeProvider) as ThemeStore

  // テーマ変更を購読
  this.on(theme, { change: () => this.update() })

  return () => (
    <button
      type="button"
      class="cursor-pointer rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
      on={{ click: () => theme.toggle() }}
    >
      {theme.value === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
