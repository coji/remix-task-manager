import { tween, easings, spring, type Handle } from '@remix-run/component'

// よく使うアニメーション定義
export const animations = {
  fadeIn: {
    enter: { opacity: 0, duration: 150, easing: 'ease-out' },
  },
  fadeInOut: {
    enter: { opacity: 0, duration: 150, easing: 'ease-out' },
    exit: { opacity: 0, duration: 100, easing: 'ease-in' },
  },
  slideIn: {
    enter: {
      opacity: 0,
      transform: 'translateX(-20px)',
      duration: 150,
      easing: 'ease-out',
    },
  },
  iconSwap: {
    enter: {
      transform: 'translateY(-12px) scale(0.7)',
      filter: 'blur(3px)',
      opacity: 0,
      duration: 250,
      easing: 'ease-out',
    },
    exit: {
      transform: 'translateY(12px) scale(0.7)',
      filter: 'blur(3px)',
      opacity: 0,
      duration: 200,
      easing: 'ease-in',
    },
  },
} as const

// layout animation用のspring設定
export const layoutSpring = { layout: { ...spring('snappy') } }

// tween を簡単に実行するヘルパー
export function runTween(
  handle: Handle,
  options: { from: number; to: number; duration: number },
  onProgress: (value: number) => void,
  onComplete?: () => void,
) {
  if (handle.signal.aborted) return

  const animation = tween({
    ...options,
    curve: easings.easeOut,
  })

  animation.next() // Initialize

  const tick = (timestamp: number) => {
    if (handle.signal.aborted) return

    const result = animation.next(timestamp)
    onProgress(result.value)

    if (!result.done) {
      requestAnimationFrame(tick)
    } else {
      onComplete?.()
    }
  }

  requestAnimationFrame(tick)
}

// 削除アニメーション用（easeIn）
export function runDeleteAnimation(
  handle: Handle,
  element: HTMLElement,
  onComplete: () => void,
) {
  if (handle.signal.aborted) {
    onComplete()
    return
  }

  const animation = tween({
    from: 0,
    to: 1,
    duration: 150,
    curve: easings.easeIn,
  })

  animation.next()

  const tick = (timestamp: number) => {
    if (handle.signal.aborted) return

    const result = animation.next(timestamp)
    const progress = result.value

    element.style.opacity = String(1 - progress)
    element.style.transform = `translateX(${progress * 30}px)`

    if (!result.done) {
      requestAnimationFrame(tick)
    } else {
      onComplete()
    }
  }

  requestAnimationFrame(tick)
}
