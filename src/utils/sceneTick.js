// src/utils/sceneTick.js
/** Registra callbacks en scene.userData.tickHandlers — un solo rAF en RootScene. */
export function registerSceneTick(scene, fn) {
  if (!scene) return () => {}
  if (!scene.userData.tickHandlers) scene.userData.tickHandlers = []
  scene.userData.tickHandlers.push(fn)
  return () => {
    scene.userData.tickHandlers = scene.userData.tickHandlers.filter((h) => h !== fn)
  }
}

export function runSceneTicks(scene, elapsed) {
  const handlers = scene?.userData?.tickHandlers
  if (!handlers?.length) return
  for (let i = 0; i < handlers.length; i++) {
    handlers[i](elapsed)
  }
}
