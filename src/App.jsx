import { useState, useCallback, useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useSitePreferences } from './context/SitePreferencesContext'

import { useLenis } from './hooks/useLenis'

import { useScrollProgress } from './hooks/useScrollProgress'

import { useRootGrowthProgress } from './hooks/useRootGrowthProgress'

import { useResultsReveal } from './hooks/useResultsReveal'

import { RootScene } from './components/canvas/RootScene'

import { LoadingScreen } from './components/ui/LoadingScreen'

import { Navbar } from './components/ui/Navbar'

import { Footer } from './components/ui/Footer'

import { ScrollBarrel } from './components/sections/ScrollBarrel'

import { getBarrelPhase2Explore } from './utils/barrelPhase2'

import { Results } from './components/sections/Results'

import { Testimonials } from './components/sections/Testimonials'

import { DistributorCTA } from './components/sections/DistributorCTA'

import { BuySection } from './components/sections/BuySection'



gsap.registerPlugin(ScrollTrigger)



export default function App() {

  const [loaded, setLoaded] = useState(false)

  const [barrelPhase, setBarrelPhase] = useState({

    phaseIndex: 0,

    local: 0,

    contentVisible: true,

    contentSlide: 0,

    inBarrel: false,

    wipeOutProgress: 0,

  })

  const location = useLocation()

  const { theme } = useSitePreferences()

  useLenis(loaded)

  const { progress } = useScrollProgress(loaded)

  const rootGrowthProgress = useRootGrowthProgress(loaded)

  const resultsReveal = useResultsReveal(loaded)



  const wipeOutProgress = barrelPhase.wipeOutProgress ?? 0



  const webglVisible =

    resultsReveal > 0.02 ||

    rootGrowthProgress > 0.01 ||

    wipeOutProgress > 0.05



  const webglOpacity = Math.min(1, Math.max(

    resultsReveal,

    rootGrowthProgress > 0.02 ? 1 : 0,

    wipeOutProgress > 0.02 ? Math.min(1, wipeOutProgress / 0.12) : 0,

  ))



  const barrelPhase2Progress = getBarrelPhase2Explore(barrelPhase)



  useEffect(() => {

    document.body.classList.add('is-loading')

  }, [])



  useEffect(() => {

    document.body.classList.toggle('webgl-chrome', webglVisible)

    return () => document.body.classList.remove('webgl-chrome')

  }, [webglVisible])



  const handleLoadComplete = useCallback(() => {

    window.scrollTo(0, 0)

    document.body.classList.remove('is-loading')

    setLoaded(true)

  }, [])



  const handleBarrelPhaseUpdate = useCallback((next) => {

    if (typeof next === 'function') {

      setBarrelPhase(next)

      return

    }

    setBarrelPhase((prev) => {

      if (

        prev.phaseIndex === next.phaseIndex &&

        prev.contentSlide === next.contentSlide &&

        prev.contentVisible === next.contentVisible &&

        prev.inBarrel === next.inBarrel &&

        Math.abs((prev.local ?? 0) - (next.local ?? 0)) < 0.01 &&

        Math.abs((prev.wipeOutProgress ?? 0) - (next.wipeOutProgress ?? 0)) < 0.015

      ) {

        return prev

      }

      return next

    })

  }, [])



  useEffect(() => {

    if (!loaded) return

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100)

    const t2 = setTimeout(() => ScrollTrigger.refresh(), 450)

    return () => { clearTimeout(t1); clearTimeout(t2) }

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

          renderActive={webglVisible || barrelPhase.phaseIndex >= 2}

          theme={theme}

          style={{

            opacity: webglOpacity,

            pointerEvents: 'none',

            willChange: 'opacity',

          }}

        />

      )}



      <div className={`page-content${webglVisible ? ' page-content--webgl-visible' : ''}`}>

        <Navbar />



        {loaded && (

          <ScrollBarrel

            onBarrelPhaseUpdate={handleBarrelPhaseUpdate}

            modelStepActive={resultsReveal > 0.02 || wipeOutProgress > 0.05}

          />

        )}



        <Results />

        <Testimonials />

        <DistributorCTA />

        <BuySection />

      </div>



      <Footer />

    </>

  )

}


