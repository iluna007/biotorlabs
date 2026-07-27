import { useEffect, useLayoutEffect, useRef } from 'react'
import { ASSETS } from '../../config/assets'

export function RootsScrollVideo({ progress = 0, style }) {
  const videoRef = useRef(null)
  const progressRef = useRef(progress)
  const durationRef = useRef(0)
  const readyRef = useRef(false)

  useLayoutEffect(() => {
    progressRef.current = progress
  }, [progress])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined

    const markReady = () => {
      const duration = video.duration
      if (!duration || !Number.isFinite(duration) || duration <= 0) return
      durationRef.current = duration
      readyRef.current = true
      video.pause()
      try {
        video.currentTime = progressRef.current * duration
      } catch {
        /* ignore seek before decode */
      }
    }

    const onError = () => {
      console.warn('[RootsScrollVideo] No se pudo cargar', ASSETS.rootsAnimation)
    }

    video.addEventListener('loadedmetadata', markReady)
    video.addEventListener('loadeddata', markReady)
    video.addEventListener('canplay', markReady)
    video.addEventListener('canplaythrough', markReady)
    video.addEventListener('durationchange', markReady)
    video.addEventListener('error', onError)

    if (video.readyState >= 1) markReady()

    let raf = 0
    const tick = () => {
      if (readyRef.current && video.readyState >= 2) {
        const duration = durationRef.current
        const target = Math.max(0, Math.min(1, progressRef.current)) * duration
        if (Math.abs(video.currentTime - target) > 0.04) {
          try {
            video.currentTime = target
          } catch {
            /* frame intermedio */
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata', markReady)
      video.removeEventListener('loadeddata', markReady)
      video.removeEventListener('canplay', markReady)
      video.removeEventListener('canplaythrough', markReady)
      video.removeEventListener('durationchange', markReady)
      video.removeEventListener('error', onError)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      id="root-canvas"
      className="roots-scroll-video"
      src={ASSETS.rootsAnimation}
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      style={style}
    />
  )
}
