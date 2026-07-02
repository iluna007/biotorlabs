import { useState, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import { useScrollProgress } from './hooks/useScrollProgress'
import { RootScene } from './components/canvas/RootScene'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { Navbar } from './components/ui/Navbar'
import { Hero } from './components/sections/Hero'
import { Science } from './components/sections/Science'
import { HowItWorks } from './components/sections/HowItWorks'
import { Results } from './components/sections/Results'
import { Testimonials } from './components/sections/Testimonials'
import { BuySection } from './components/sections/BuySection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()
  const { progress } = useScrollProgress()

  const handleLoadComplete = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if (loaded) {
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }
  }, [loaded])

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      <RootScene scrollProgress={progress} />

      <div className="page-content">
        <Navbar />
        <Hero />
        <Science />
        <HowItWorks />
        <Results />
        <Testimonials />
        <BuySection />
      </div>
    </>
  )
}
