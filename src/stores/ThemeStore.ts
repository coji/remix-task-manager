export type ThemeValue = 'light' | 'dark'

export class ThemeStore extends EventTarget {
  value: ThemeValue = 'light'

  constructor() {
    super()
    // localStorage から復元
    const saved = localStorage.getItem('theme') as ThemeValue | null
    if (saved === 'light' || saved === 'dark') {
      this.value = saved
    }
    this.applyToDocument()
  }

  toggle() {
    this.value = this.value === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', this.value)
    this.applyToDocument()
    this.dispatchEvent(new Event('change'))
  }

  applyToDocument() {
    if (this.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}
