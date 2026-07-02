import { useState, useCallback, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './hooks/useLenis'
import { useScrollProgress } from './hooks/useScrollProgress'
import { RootScene } from './components/canvas/RootScene'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { Navbar } from './components/ui/Navbar'
import { Footer } from './components/ui/Footer'
import { Hero } from './components/sections/Hero'
import { StatsBar } from './components/sections/StatsBar'
import { Science } from './components/sections/Science'
import { HowItWorks } from './components/sections/HowItWorks'
import { WhyBiotor } from './components/sections/WhyBiotor'
import { Results } from './components/sections/Results'
import { Testimonials } from './components/sections/Testimonials'
import { DistributorCTA } from './components/sections/DistributorCTA'
import { BuySection } from './components/sections/BuySection'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)
  useLenis()
  const { progress } = useScrollProgress()
  const handleLoadComplete = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if (loaded) requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [loaded])

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {loaded && <RootScene scrollProgress={progress} />}

      <div className="page-content">
        <Navbar />
        <Hero />
        <StatsBar />
        <Science />
        <HowItWorks />
        <WhyBiotor />
        <Results />
        <Testimonials />
        <DistributorCTA />
        <BuySection />
      </div>

      <Footer />
    </>
  )
}
