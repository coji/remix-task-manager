import type { Handle } from '@remix-run/component'

interface Props {
  onAdd: (title: string) => void
}

export default function TaskInput(this: Handle, { onAdd }: Props) {
  let value = ''

  const handleSubmit = () => {
    if (value.trim()) {
      onAdd(value.trim())
      value = ''
      this.update()
    }
  }

  return () => (
    <div class="mb-5 flex gap-2">
      <input
        type="text"
        value={value}
        placeholder="Add a new task..."
        class="flex-1 rounded border border-gray-300 px-3 py-2 text-base focus:border-blue-500 focus:outline-none"
        on={{
          input: (e: Event) => {
            value = (e.target as HTMLInputElement).value
          },
          keydown: (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
              handleSubmit()
            }
          },
        }}
      />
      <button
        type="button"
        class="cursor-pointer rounded bg-green-500 px-5 py-2 text-base font-medium text-white hover:bg-green-600"
        on={{ click: handleSubmit }}
      >
        Add
      </button>
    </div>
  )
}
