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
      <div class="text-muted mt-4 flex items-center justify-between pt-4 text-sm">
        <span>
          {displayCount} item{displayCount !== 1 ? 's' : ''} left
        </span>
        {hasCompleted && (
          <button
            key="clear-btn"
            type="button"
            class="text-muted hover:border-border hover:bg-surface-soft hover:text-text cursor-pointer rounded-[9px] border border-transparent px-3 py-1.5 text-[13px] font-semibold transition active:translate-y-px"
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
