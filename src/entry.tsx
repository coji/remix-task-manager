import { createRoot, type Handle } from '@remix-run/component'
import './app.css'
import TaskFilter from './components/TaskFilter'
import TaskFooter from './components/TaskFooter'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import ThemeProvider from './components/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'
import GitHubLink from './components/GitHubLink'
import { TaskViewModel } from './stores/TaskViewModel'

function App(this: Handle) {
  const vm = new TaskViewModel()

  // 変更を購読
  this.on(vm, { change: () => this.update() })

  // 初期ロード
  vm.load()

  return () => (
    <ThemeProvider>
      <div class="mx-auto max-w-lg p-5 font-sans">
        <div class="mb-6 flex items-center justify-between">
          <h1 class="text-2xl font-bold">Remix Task Manager</h1>
          <div class="flex items-center gap-2">
            <GitHubLink />
            <ThemeToggle />
          </div>
        </div>

        {vm.isLoading ? (
          <p class="text-center text-gray-500">読み込み中...</p>
        ) : (
          <>
            <TaskInput onAdd={(title) => vm.addTask(title)} />
            <TaskFilter current={vm.filter} onChange={(f) => vm.setFilter(f)} />
            <TaskList
              tasks={vm.filteredTasks}
              onToggle={(id) => vm.toggleTask(id)}
              onDelete={(id) => vm.deleteTask(id)}
              onEdit={(id, title) => vm.editTask(id, title)}
            />

            {vm.tasks.length > 0 && (
              <TaskFooter
                activeCount={vm.activeCount}
                hasCompleted={vm.hasCompleted}
                onClearCompleted={() => vm.clearCompleted()}
              />
            )}
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
