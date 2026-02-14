import { useState, useEffect } from 'react'

function useIsLargeScreen() {
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    setIsLargeScreen(window.matchMedia('(min-width: 768px)').matches)

    const handleResize = (e) => {
      setIsLargeScreen(e.matches)
    }

    const mediaQuery = window.matchMedia('(min-width: 1024px)')

    mediaQuery.addEventListener('change', handleResize)

    return () => {
      mediaQuery.removeEventListener('change', handleResize)
    }
  }, [])

  return {
    isLargeScreen,
  }
}

export default useIsLargeScreen
