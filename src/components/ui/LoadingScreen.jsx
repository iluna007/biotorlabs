import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

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
        background: '#0a0f07',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
      }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="20" r="6" fill="#5bcc3e" opacity="0.9" />
        <path
          d="M40 26 C40 26 30 35 28 50 C26 65 32 72 32 72"
          stroke="#7ecb6e"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 60,
            strokeDashoffset: 60 - (progress / 100) * 60,
          }}
        />
        <path
          d="M40 26 C40 26 50 35 52 50 C54 65 48 72 48 72"
          stroke="#7ecb6e"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 60,
            strokeDashoffset: 60 - (progress / 100) * 40,
          }}
        />
        <path
          d="M36 44 C32 46 26 52 24 58"
          stroke="#5bcc3e"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={{
            strokeDasharray: 30,
            strokeDashoffset: 30 - (progress / 100) * 20,
          }}
        />
      </svg>

      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            color: '#8a9f82',
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
            background: '#1a2a14',
            borderRadius: '1px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #4a8f3a, #7ecb6e)',
              transition: 'width 0.1s ease',
            }}
          />
        </div>
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '1.2rem',
            color: '#5bcc3e',
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
