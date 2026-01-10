interface Props {
  activeCount: number
  hasCompleted: boolean
  onClearCompleted: () => void
}

export default function TaskFooter() {
  return ({ activeCount, hasCompleted, onClearCompleted }: Props) => (
    <div class="mt-4 flex items-center justify-between pt-4 text-gray-600 dark:text-gray-400">
      <span>
        {activeCount} item{activeCount !== 1 ? 's' : ''} left
      </span>
      {hasCompleted && (
        <button
          type="button"
          class="cursor-pointer rounded bg-gray-500 px-3 py-1.5 text-white hover:bg-gray-600"
          on={{ click: onClearCompleted }}
        >
          Clear completed
        </button>
      )}
    </div>
  )
}
