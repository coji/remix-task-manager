import type { FilterType, Task } from '../types'

export class TaskViewModel extends EventTarget {
  tasks: Task[] = []
  nextId = 1
  filter: FilterType = 'all'
  isLoading = true

  async load() {
    const res = await fetch('/initial-tasks.json')
    const data = (await res.json()) as { tasks: Task[]; nextId: number }
    this.tasks = data.tasks
    this.nextId = data.nextId
    this.isLoading = false
    this.emit()
  }

  addTask(title: string) {
    this.tasks.push({ id: this.nextId++, title, completed: false })
    this.emit()
  }

  toggleTask(id: number) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.emit()
    }
  }

  deleteTask(id: number) {
    this.tasks = this.tasks.filter((t) => t.id !== id)
    this.emit()
  }

  editTask(id: number, title: string) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.title = title
      this.emit()
    }
  }

  setFilter(filter: FilterType) {
    this.filter = filter
    this.emit()
  }

  clearCompleted() {
    this.tasks = this.tasks.filter((t) => !t.completed)
    this.emit()
  }

  get filteredTasks(): Task[] {
    switch (this.filter) {
      case 'active':
        return this.tasks.filter((t) => !t.completed)
      case 'completed':
        return this.tasks.filter((t) => t.completed)
      default:
        return this.tasks
    }
  }

  get activeCount(): number {
    return this.tasks.filter((t) => !t.completed).length
  }

  get hasCompleted(): boolean {
    return this.tasks.some((t) => t.completed)
  }

  private emit() {
    this.dispatchEvent(new Event('change'))
  }
}
