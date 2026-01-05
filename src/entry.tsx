import { createRoot, type Handle } from '@remix-run/component'
import './app.css'
import TaskFilter from './components/TaskFilter'
import TaskFooter from './components/TaskFooter'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import ThemeProvider from './components/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'
import type { FilterType, Task } from './types'

function App(this: Handle) {
  let tasks: Task[] = []
  let nextId = 1
  let filter: FilterType = 'all'
  let isLoading = true

  // 初期タスクをサーバーから読み込む
  fetch('/initial-tasks.json')
    .then((res) => res.json())
    .then((data: { tasks: Task[]; nextId: number }) => {
      tasks = data.tasks
      nextId = data.nextId
      isLoading = false
      this.update()
    })

  const addTask = (title: string) => {
    tasks.push({ id: nextId++, title, completed: false })
    this.update()
  }

  const toggleTask = (id: number) => {
    const task = tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.update()
    }
  }

  const deleteTask = (id: number) => {
    tasks = tasks.filter((t) => t.id !== id)
    this.update()
  }

  const setFilter = (newFilter: FilterType) => {
    filter = newFilter
    this.update()
  }

  const clearCompleted = () => {
    tasks = tasks.filter((t) => !t.completed)
    this.update()
  }

  const getFilteredTasks = (): Task[] => {
    switch (filter) {
      case 'active':
        return tasks.filter((t) => !t.completed)
      case 'completed':
        return tasks.filter((t) => t.completed)
      default:
        return tasks
    }
  }

  const getActiveCount = () => tasks.filter((t) => !t.completed).length
  const hasCompleted = () => tasks.some((t) => t.completed)

  return () => (
    <ThemeProvider>
      <div class="mx-auto max-w-lg p-5 font-sans">
        <div class="mb-6 flex items-center justify-between">
          <h1 class="text-2xl font-bold">Remix Task Manager</h1>
          <ThemeToggle />
        </div>

        {isLoading ? (
          <p class="text-center text-gray-500">読み込み中...</p>
        ) : (
          <>
            <TaskInput onAdd={addTask} />
            <TaskFilter current={filter} onChange={setFilter} />
            <TaskList
              tasks={getFilteredTasks()}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />

            {tasks.length > 0 && (
              <TaskFooter
                activeCount={getActiveCount()}
                hasCompleted={hasCompleted()}
                onClearCompleted={clearCompleted}
              />
            )}
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

// biome-ignore lint/style/noNonNullAssertion: This is the entry point
createRoot(document.getElementById('root')!).render(<App />)
