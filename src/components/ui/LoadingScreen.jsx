import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ASSETS } from '../../config/assets'

export function LoadingScreen({ onComplete }) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    gsap.to(
      { p: 0 },
      {
        p: 100,
        duration: 2.2,
        ease: 'power1.inOut',
        onUpdate: function () {
          setProgress(Math.floor(this.targets()[0].p))
        },
        onComplete: () => {
          gsap.to(ref.current, {
            opacity: 0,
            duration: 0.8,
            delay: 0.3,
            onComplete: onComplete,
          })
        },
      },
    )
  }, [onComplete])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--green-dark)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <img
        src={ASSETS.brand.symbolWhite}
        alt="Biotor Labs"
        style={{
          height: 'clamp(3rem, 8vw, 5rem)',
          width: 'auto',
          opacity: 0.92,
        }}
      />

      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            color: 'var(--green-light)',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Preparando experiencia
        </p>
        <div
          style={{
            width: '200px',
            height: '2px',
            background: 'var(--green-mid)',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--green-accent), var(--lime))',
              transition: 'width 0.1s ease',
            }}
          />
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.1rem',
            color: 'var(--lime)',
            marginTop: '0.5rem',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {progress}%
        </p>
      </div>
    </div>
  )
}
