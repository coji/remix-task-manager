import type { Handle } from '@remix-run/component'
import { layoutSpring } from '../lib/animations'
import type { FilterType } from '../types'

interface Props {
  current: FilterType
  onChange: (filter: FilterType) => void
}

const FILTERS: FilterType[] = ['all', 'active', 'completed']

export default function TaskFilter(_handle: Handle) {
  return ({ current, onChange }: Props) => (
    <div class="border-border bg-surface-stronger relative mb-4 flex gap-1 rounded-[11px] border p-1">
      {/* スライドするハイライト */}
      {FILTERS.map(
        (filter) =>
          current === filter && (
            <div
              key="highlight"
              class="border-border bg-surface-strong shadow-pill absolute inset-y-1 rounded-lg border"
              style={{
                width: 'calc((100% - 0.5rem) / 3)',
                left: `calc(${FILTERS.indexOf(filter)} * (100% - 0.5rem) / 3 + 0.25rem)`,
              }}
              animate={layoutSpring}
            />
          ),
      )}
      {/* ボタン */}
      {FILTERS.map((filter) => (
        <button
          type="button"
          class={`relative z-10 flex-1 cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            current === filter ? 'text-text' : 'text-muted hover:text-text'
          }`}
          on={{ click: () => onChange(filter) }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  )
}
