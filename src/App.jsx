import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSitePreferences } from './context/SitePreferencesContext'
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

const INTRO_SEEN_KEY = 'biotor-intro-seen'

function hasSeenIntro() {
  try {
    return localStorage.getItem(INTRO_SEEN_KEY) === '1'
  } catch {
    return false
  }
}

export default function App() {
  const [loaded, setLoaded] = useState(hasSeenIntro)
  const location = useLocation()
  const { theme } = useSitePreferences()
  useLenis()
  const { progress } = useScrollProgress()

  const handleLoadComplete = useCallback(() => {
    try {
      localStorage.setItem(INTRO_SEEN_KEY, '1')
    } catch {
      /* storage bloqueado */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [loaded])

  useEffect(() => {
    if (!loaded || location.hash !== '#buy') return
    const t = setTimeout(() => {
      document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
    return () => clearTimeout(t)
  }, [loaded, location.hash, location.search])

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {loaded && <RootScene scrollProgress={progress} theme={theme} />}

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
