import type { Handle } from '@remix-run/component'
import { press } from '@remix-run/interaction/press'

interface SetupType {
  onAdd: (title: string) => void
}

export default function TaskInput(_handle: Handle, setup: SetupType) {
  let inputEl: HTMLInputElement | null = null

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
        class="flex-1 rounded border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
        on={{
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
