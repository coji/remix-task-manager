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
    <div class="relative mb-4 flex gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
      {/* スライドするハイライト */}
      {FILTERS.map(
        (filter) =>
          current === filter && (
            <div
              key="highlight"
              class="absolute inset-y-1 rounded-md bg-white shadow-sm dark:bg-gray-600"
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
            current === filter
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
          }`}
          on={{ click: () => onChange(filter) }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  )
}
