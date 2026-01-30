import { spring, type Handle } from '@remix-run/component'
import { longPress, press } from '@remix-run/interaction/press'
import { animations, runDeleteAnimation } from '../lib/animations'
import type { Task } from '../types'

interface Props {
  task: Task
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, title: string) => void
}

export default function TaskItem(handle: Handle) {
  let isEditing = false
  let editValue = ''
  let inputEl: HTMLInputElement | null = null
  let rowEl: HTMLLIElement | null = null
  let isDeleting = false

  const handleDelete = (id: number, onDelete: Props['onDelete']) => {
    if (isDeleting) return
    if (!rowEl) {
      onDelete(id)
      return
    }
    isDeleting = true
    runDeleteAnimation(handle, rowEl, () => onDelete(id))
  }

  const startEdit = (title: string) => {
    isEditing = true
    editValue = title
    handle.update(() => {
      inputEl?.focus()
      inputEl?.select()
    })
  }

  const cancelEdit = () => {
    isEditing = false
    handle.update()
  }

  const confirmEdit = (id: number, onEdit: Props['onEdit']) => {
    if (editValue.trim()) {
      onEdit(id, editValue.trim())
    }
    isEditing = false
    handle.update()
  }

  return ({ task, onToggle, onDelete, onEdit }: Props) => (
    <li
      connect={(el: HTMLLIElement) => {
        rowEl = el
      }}
      tabindex={0}
      class="flex items-center gap-3 border-b border-gray-200 py-3 outline-none focus:bg-gray-100 dark:border-gray-700 dark:focus:bg-gray-800"
      animate={animations.slideIn}
    >
      <input
        type="checkbox"
        checked={task.completed}
        class="h-5 w-5 cursor-pointer accent-blue-500"
        style={{
          transition: spring.transition('transform', 'bouncy'),
          transform: task.completed ? 'scale(1.2)' : 'scale(1)',
        }}
        on={{ change: () => onToggle(task.id) }}
      />
      {isEditing ? (
        <input
          connect={(el: HTMLInputElement) => {
            inputEl = el
          }}
          type="text"
          value={editValue}
          class="flex-1 rounded border border-blue-500 px-2 py-1 text-base focus:outline-none"
          on={{
            input: (e: Event) => {
              editValue = (e.target as HTMLInputElement).value
            },
            keydown: (e: KeyboardEvent) => {
              if (e.key === 'Enter' && !e.isComposing) {
                confirmEdit(task.id, onEdit)
              } else if (e.key === 'Escape') {
                cancelEdit()
              }
            },
            blur: () => cancelEdit(),
          }}
        />
      ) : (
        <span
          class={`flex-1 cursor-pointer text-base select-none ${
            task.completed ? 'text-gray-400 line-through' : ''
          }`}
          on={{
            [longPress]: (e: Event) => {
              e.preventDefault()
              startEdit(task.title)
            },
          }}
          title="Long press to edit"
        >
          {task.title}
        </span>
      )}
      <button
        type="button"
        class="cursor-pointer rounded bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
        on={{ [press]: () => handleDelete(task.id, onDelete) }}
      >
        Delete
      </button>
    </li>
  )
}
