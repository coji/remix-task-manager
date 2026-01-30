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
      class="border-border-soft hover:bg-surface-weak focus:bg-surface-stronger flex items-center gap-3 border-b py-2.5 transition outline-none"
      animate={animations.slideIn}
    >
      <input
        type="checkbox"
        checked={task.completed}
        class="accent-accent h-5 w-5 cursor-pointer"
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
          class="border-border bg-surface-strong text-text focus:border-ring focus:shadow-ring flex-1 rounded-xl border px-3 py-1.75 text-[14px] focus:outline-none"
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
            task.completed ? 'text-muted line-through' : ''
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
        class="text-muted hover:border-danger-border hover:bg-danger-soft hover:text-danger cursor-pointer rounded-[9px] border border-transparent px-2 py-1 text-[13px] font-semibold transition active:translate-y-px"
        on={{ [press]: () => handleDelete(task.id, onDelete) }}
      >
        Delete
      </button>
    </li>
  )
}
