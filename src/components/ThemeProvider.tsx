import type { Handle, RemixNode } from '@remix-run/component'
import { ThemeStore } from '../stores/ThemeStore'

interface Props {
  children: RemixNode
}

export default function ThemeProvider(handle: Handle<ThemeStore>) {
  const theme = new ThemeStore()
  handle.context.set(theme)

  // テーマ変更時に再レンダリング
  handle.on(theme, { change: () => handle.update() })

  return ({ children }: Props) => (
    <div class="text-text min-h-screen bg-(image:--app-bg) transition-colors duration-300">
      {children}
    </div>
  )
}
