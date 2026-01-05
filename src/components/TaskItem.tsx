import type { Task } from '../types'

interface Props {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
}

export default function TaskItem() {
  return ({ task, onToggle, onDelete }: Props) => (
    <li class="flex items-center gap-3 border-b border-gray-200 py-3 dark:border-gray-700">
      <input
        type="checkbox"
        checked={task.completed}
        class="h-5 w-5 cursor-pointer accent-blue-500"
        on={{ change: () => onToggle(task.id) }}
      />
      <span
        class={`flex-1 text-base ${
          task.completed ? 'text-gray-400 line-through' : ''
        }`}
      >
        {task.title}
      </span>
      <button
        type="button"
        class="cursor-pointer rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
        on={{ click: () => onDelete(task.id) }}
      >
        Delete
      </button>
    </li>
  )
}
