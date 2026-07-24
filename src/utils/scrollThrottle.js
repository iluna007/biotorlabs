/** Emite como máximo una vez cada `intervalMs` (p.ej. 50 ≈ 20 fps). */
export function createScrollThrottler(intervalMs = 50) {
  let lastEmit = 0
  let pending = null
  let pendingValue = null

  return function emit(value, onEmit) {
    pendingValue = value
    const now = performance.now()

    if (now - lastEmit >= intervalMs) {
      lastEmit = now
      pendingValue = null
      if (pending) {
        clearTimeout(pending)
        pending = null
      }
      onEmit(value)
      return
    }

    if (pending) return

    pending = setTimeout(() => {
      pending = null
      lastEmit = performance.now()
      const v = pendingValue
      pendingValue = null
      if (v !== null) onEmit(v)
    }, intervalMs - (now - lastEmit))
  }
}

/** Evita setState si los campos relevantes no cambiaron. */
export function barrelPhaseChanged(prev, next, localEpsilon = 0.025) {
  if (prev.phaseIndex !== next.phaseIndex) return true
  if (prev.contentSlide !== next.contentSlide) return true
  if (prev.contentVisible !== next.contentVisible) return true
  if (prev.inBarrel !== next.inBarrel) return true
  if (Math.abs(prev.local - next.local) >= localEpsilon) return true
  return false
}
