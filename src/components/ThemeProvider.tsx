import type { Handle, RemixNode } from '@remix-run/component'
import { ThemeStore } from '../stores/ThemeStore'

interface Props {
  children: RemixNode
}

export default function ThemeProvider(this: Handle<ThemeStore>) {
  const theme = new ThemeStore()
  this.context.set(theme)

  // テーマ変更時に再レンダリング
  this.on(theme, { change: () => this.update() })

  return ({ children }: Props) => (
    <div
      class={`min-h-screen ${theme.value === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}
    >
      {children}
    </div>
  )
}
