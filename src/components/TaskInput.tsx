import { spring, type Handle } from '@remix-run/component'
import { press } from '@remix-run/interaction/press'

interface SetupType {
  onAdd: (title: string) => void
}

export default function TaskInput(handle: Handle, setup: SetupType) {
  let inputEl: HTMLInputElement | null = null
  let isFocused = false

  const handleSubmit = () => {
    if (inputEl?.value.trim()) {
      setup.onAdd(inputEl.value.trim())
      inputEl.value = ''
      inputEl?.focus()
    }
  }

  return () => (
    <div class="mb-5 flex gap-2">
      <input
        connect={(el: HTMLInputElement) => {
          inputEl = el
        }}
        type="text"
        placeholder="Add a new task..."
        class="flex-1 rounded border-2 border-gray-300 bg-white px-3 py-2 text-base text-gray-800 placeholder-gray-400 focus:border-blue-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400"
        style={{
          transition: spring.transition(
            ['transform', 'box-shadow', 'border-color'],
            'snappy',
          ),
          transform: isFocused ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isFocused
            ? '0 4px 12px rgba(59, 130, 246, 0.25)'
            : '0 0 0 transparent',
        }}
        on={{
          focus: () => {
            isFocused = true
            handle.update()
          },
          blur: () => {
            isFocused = false
            handle.update()
          },
          keydown: (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !e.isComposing) {
              handleSubmit()
            }
          },
        }}
      />
      <button
        type="button"
        class="cursor-pointer rounded bg-green-500 px-5 py-2 text-base font-medium text-white hover:bg-green-600"
        on={{ [press]: handleSubmit }}
      >
        Add
      </button>
    </div>
  )
}
