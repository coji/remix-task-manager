import { createRoot, type Handle } from '@remix-run/component'
import './app.css'
import GitHubLink from './components/GitHubLink'
import TaskFilter from './components/TaskFilter'
import TaskFooter from './components/TaskFooter'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import ThemeProvider from './components/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'
import { TaskViewModel } from './stores/TaskViewModel'

function App(handle: Handle) {
  const vm = new TaskViewModel()

  // 変更を購読
  handle.on(vm, { change: () => handle.update() })

  // 初期ロード
  vm.load()

  return () => (
    <ThemeProvider>
      <div class="mx-auto max-w-140 px-4.5 pt-6 pb-9">
        <div class="border-border bg-surface shadow-card rounded-[18px] border backdrop-blur-[14px]">
          <div class="flex items-center justify-between px-5 pt-4 pb-2">
            <h1 class="text-[21px] font-semibold tracking-[-0.03em]">
              Remix Task Manager
            </h1>
            <div class="flex items-center gap-2">
              <GitHubLink />
              <ThemeToggle />
            </div>
          </div>
          <div class="px-5 pt-1 pb-4.5">
            {vm.isLoading ? (
              <p class="text-muted text-center text-sm">読み込み中...</p>
            ) : (
              <>
                <TaskInput setup={{ onAdd: (title) => vm.addTask(title) }} />
                <TaskFilter
                  current={vm.filter}
                  onChange={(f) => vm.setFilter(f)}
                />
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
        </div>
      </div>
    </ThemeProvider>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
