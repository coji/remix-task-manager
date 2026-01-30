import type { Handle } from '@remix-run/component'
import { animations, runTween } from '../lib/animations'

interface Props {
  activeCount: number
  hasCompleted: boolean
  onClearCompleted: () => void
}

export default function TaskFooter(handle: Handle) {
  let displayCount = 0
  let prevCount = 0

  return ({ activeCount, hasCompleted, onClearCompleted }: Props) => {
    if (activeCount !== prevCount) {
      runTween(
        handle,
        { from: prevCount, to: activeCount, duration: 200 },
        (value) => {
          displayCount = Math.round(value)
          handle.update()
        },
      )
      prevCount = activeCount
    }

    return (
      <div class="mt-4 flex items-center justify-between pt-4 text-gray-600 dark:text-gray-400">
        <span>
          {displayCount} item{displayCount !== 1 ? 's' : ''} left
        </span>
        {hasCompleted && (
          <button
            key="clear-btn"
            type="button"
            class="cursor-pointer rounded bg-gray-500 px-3 py-1.5 text-white hover:bg-gray-600"
            on={{ click: onClearCompleted }}
            animate={animations.fadeInOut}
          >
            Clear completed
          </button>
        )}
      </div>
    )
  }
}
