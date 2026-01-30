import type { Handle } from '@remix-run/component'
import { arrowDown, arrowUp } from '@remix-run/interaction/keys'
import type { Task } from '../types'
import TaskItem from './TaskItem'

interface Props {
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onEdit: (id: number, title: string) => void
}

export default function TaskList(_handle: Handle) {
  let listEl: HTMLUListElement | null = null

  const handleArrowUp = () => {
    if (!listEl) return
    const items = listEl.querySelectorAll<HTMLLIElement>('li[tabindex]')
    const currentIndex = Array.from(items).indexOf(
      document.activeElement as HTMLLIElement,
    )
    if (currentIndex > 0) {
      items[currentIndex - 1]?.focus()
    }
  }

  const handleArrowDown = () => {
    if (!listEl) return
    const items = listEl.querySelectorAll<HTMLLIElement>('li[tabindex]')
    const currentIndex = Array.from(items).indexOf(
      document.activeElement as HTMLLIElement,
    )
    if (currentIndex < items.length - 1) {
      items[currentIndex + 1]?.focus()
    }
  }

  return ({ tasks, onToggle, onDelete, onEdit }: Props) => (
    <ul
      connect={(el: HTMLUListElement) => {
        listEl = el
      }}
      class="m-0 list-none p-0"
      on={{
        [arrowUp]: handleArrowUp,
        [arrowDown]: handleArrowDown,
      }}
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}
