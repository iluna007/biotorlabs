import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useSitePreferences } from './context/SitePreferencesContext'
import { useLenis } from './hooks/useLenis'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useRootGrowthProgress } from './hooks/useRootGrowthProgress'
import { RootScene } from './components/canvas/RootScene'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { Navbar } from './components/ui/Navbar'
import { Footer } from './components/ui/Footer'
import { ScrollBarrel } from './components/sections/ScrollBarrel'
import { getBarrelPhase2Explore } from './utils/barrelPhase2'
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
  const [activeSlide, setActiveSlide] = useState(0)
  const [webglReveal, setWebglReveal] = useState(0)
  const [barrelPhase, setBarrelPhase] = useState({
    phaseIndex: 0,
    local: 0,
    contentVisible: true,
    contentSlide: 0,
    inBarrel: false,
  })
  const location = useLocation()
  const { theme } = useSitePreferences()
  useLenis(loaded)
  const { progress } = useScrollProgress(loaded)
  const rootGrowthProgress = useRootGrowthProgress(loaded)

  const webglVisible = activeSlide >= 2 || rootGrowthProgress > 0.01 || webglReveal > 0.02
  const webglOpacity = Math.min(
    1,
    Math.max(webglReveal, activeSlide >= 2 ? 1 : 0, rootGrowthProgress > 0.02 ? 1 : 0),
  )
  const barrelPhase2Progress = getBarrelPhase2Explore(barrelPhase)

  useEffect(() => {
    document.body.classList.toggle('webgl-chrome', webglVisible)
    return () => document.body.classList.remove('webgl-chrome')
  }, [webglVisible])

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

      {loaded && (
        <RootScene
          scrollProgress={progress}
          rootGrowthProgress={rootGrowthProgress}
          undergroundActive={webglVisible}
          barrelPhase2Progress={barrelPhase2Progress}
          theme={theme}
          style={{
            opacity: webglVisible ? webglOpacity : 0,
            visibility: webglVisible ? 'visible' : 'hidden',
            pointerEvents: 'none',
          }}
        />
      )}

      <div className={`page-content${webglVisible ? ' page-content--webgl-visible' : ''}`}>
        <Navbar />

        {loaded && (
          <ScrollBarrel
            onSlideChange={setActiveSlide}
            onWebglReveal={setWebglReveal}
            onBarrelPhaseUpdate={setBarrelPhase}
          />
        )}

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
