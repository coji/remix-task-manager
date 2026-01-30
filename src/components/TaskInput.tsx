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
        class="border-border bg-surface-strong text-text placeholder:text-placeholder focus:border-ring focus:shadow-ring flex-1 rounded-xl border px-3 py-2.25 text-[14px] focus:outline-none"
        style={{
          transition: spring.transition(
            ['transform', 'box-shadow', 'border-color'],
            'snappy',
          ),
          transform: isFocused ? 'scale(1.02)' : 'scale(1)',
          boxShadow: isFocused ? 'var(--shadow-ring)' : '0 0 0 transparent',
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
        class="bg-accent shadow-accent hover:bg-accent-strong cursor-pointer rounded-[9px] px-5 py-1.75 text-[13px] font-semibold text-white transition active:translate-y-px"
        on={{ [press]: handleSubmit }}
      >
        Add
      </button>
    </div>
  )
}
