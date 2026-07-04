import { useEffect, useState } from 'react'
import {
  BIOTOR_ACTIVE_PRODUCT,
  BUY_SCROLL_START,
  getEffectiveProductIndex,
  getProductActiveBias,
  getProductIndexFromUrl,
} from '../utils/productPack3d'

export function useProductVisualState(scrollProgress) {
  const [carouselIndex, setCarouselIndex] = useState(getProductIndexFromUrl)
  const [userPickedCarousel, setUserPickedCarousel] = useState(false)

  useEffect(() => {
    const onActive = (e) => {
      if (typeof e.detail?.index === 'number') {
        setCarouselIndex(e.detail.index)
        setUserPickedCarousel(true)
      }
    }
    window.addEventListener(BIOTOR_ACTIVE_PRODUCT, onActive)
    return () => window.removeEventListener(BIOTOR_ACTIVE_PRODUCT, onActive)
  }, [])

  useEffect(() => {
    if (scrollProgress < BUY_SCROLL_START) {
      setUserPickedCarousel(false)
    }
  }, [scrollProgress])

  const productIndex = getEffectiveProductIndex(
    scrollProgress,
    carouselIndex,
    userPickedCarousel,
  )
  const activeBias = getProductActiveBias(scrollProgress, userPickedCarousel)
  const inCarouselZone = scrollProgress >= BUY_SCROLL_START

  return { productIndex, activeBias, inCarouselZone }
}
