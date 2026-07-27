import { useState, useCallback, useEffect, useLayoutEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { gsap } from 'gsap'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useSitePreferences } from './context/SitePreferencesContext'

import { useLenis } from './hooks/useLenis'

import { useScrollProgress } from './hooks/useScrollProgress'

import { useRootGrowthProgress } from './hooks/useRootGrowthProgress'

import { useResultsReveal } from './hooks/useResultsReveal'

import { RootScene } from './components/canvas/RootScene'

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

  const [barrelPhase, setBarrelPhase] = useState({

    phaseIndex: 0,

    local: 0,

    contentVisible: true,

    contentSlide: 0,

    inBarrel: false,

    wipeOutProgress: 0,

  })

  const [undergroundLatched, setUndergroundLatched] = useState(false)

  const location = useLocation()

  const { theme } = useSitePreferences()

  useLenis()

  const { progress } = useScrollProgress()

  const rootGrowthProgress = useRootGrowthProgress()

  const resultsReveal = useResultsReveal()

  const wipeOutProgress = barrelPhase.wipeOutProgress ?? 0

  const barrelPhase2Progress = getBarrelPhase2Explore(barrelPhase)

  useEffect(() => {
    if (wipeOutProgress > 0.5) {
      setUndergroundLatched(true)
    } else if (barrelPhase.inBarrel && barrelPhase.phaseIndex < 2) {
      setUndergroundLatched(false)
    } else if (
      barrelPhase.inBarrel &&
      barrelPhase.phaseIndex === 2 &&
      wipeOutProgress < 0.02
    ) {
      setUndergroundLatched(false)
    }
  }, [wipeOutProgress, barrelPhase.inBarrel, barrelPhase.phaseIndex])

  const webglVisible =
    undergroundLatched ||
    resultsReveal > 0.02 ||
    rootGrowthProgress > 0.01 ||
    wipeOutProgress > 0.05

  const webglOpacity = undergroundLatched ? 1 : Math.min(1, Math.max(
    resultsReveal,
    rootGrowthProgress > 0.02 ? 1 : 0,
    wipeOutProgress > 0.02 ? Math.min(1, wipeOutProgress / 0.12) : 0,
  ))



  useLayoutEffect(() => {

    window.scrollTo(0, 0)

    document.documentElement.scrollTop = 0

    document.body.scrollTop = 0

  }, [])



  useEffect(() => {

    if (location.pathname !== '/' || location.hash === '#buy') return

    const url = new URL(window.location.href)

    if (!url.searchParams.has('product')) return

    url.searchParams.delete('product')

    window.history.replaceState({}, '', `${url.pathname}${url.hash}`)

  }, [location.pathname, location.hash])



  useEffect(() => {

    document.body.classList.toggle('webgl-chrome', webglVisible)

    return () => document.body.classList.remove('webgl-chrome')

  }, [webglVisible])



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

        Math.abs((prev.local ?? 0) - (next.local ?? 0)) < 0.008 &&

        Math.abs((prev.wipeOutProgress ?? 0) - (next.wipeOutProgress ?? 0)) < 0.008

      ) {

        return prev

      }

      return next

    })

  }, [])



  useEffect(() => {

    const t1 = setTimeout(() => ScrollTrigger.refresh(), 100)

    const t2 = setTimeout(() => ScrollTrigger.refresh(), 450)

    return () => { clearTimeout(t1); clearTimeout(t2) }

  }, [])



  useEffect(() => {

    if (location.hash !== '#buy') return

    const t = setTimeout(() => {

      document.getElementById('buy')?.scrollIntoView({ behavior: 'smooth' })

    }, 400)

    return () => clearTimeout(t)

  }, [location.hash, location.search])



  return (

    <>

      <div className={`page-content${webglVisible ? ' page-content--webgl-visible' : ''}`}>

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

        <Navbar />



        <ScrollBarrel

          onBarrelPhaseUpdate={handleBarrelPhaseUpdate}

          modelStepActive={resultsReveal > 0.02 || wipeOutProgress > 0.05}

        />



        <Results />

        <Testimonials />

        <DistributorCTA />

        <BuySection />

      </div>



      <Footer />

    </>

  )

}
