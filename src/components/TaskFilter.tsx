import type { Handle } from '@remix-run/component'
import type { FilterType } from '../types'

interface Props {
  current: FilterType
  onChange: (filter: FilterType) => void
}

const FILTERS: FilterType[] = ['all', 'active', 'completed']

export default function TaskFilter(this: Handle) {
  return ({ current, onChange }: Props) => (
    <div class="mb-4 flex gap-2">
      {FILTERS.map((filter) => (
        <button
          type="button"
          class={`cursor-pointer rounded border px-2 py-0.5 text-sm ${
            current === filter
              ? 'border-blue-500 bg-blue-500 text-white'
              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
          }`}
          on={{ click: () => onChange(filter) }}
        >
          {filter.charAt(0).toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  )
}
