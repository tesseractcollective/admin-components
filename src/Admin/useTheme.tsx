import { useEffect, useState } from 'react'

export type ThemeName = 'light' | 'dark'

function useTheme() {
  const [themeName, setThemeName] = useState<ThemeName>('light')
  useEffect(() => {
    const handleMatchEvent = (event: MediaQueryList | MediaQueryListEvent) => {
      if (event.matches) {
        setThemeName('dark')
      } else {
        setThemeName('light')
      }
    }

    handleMatchEvent(window.matchMedia('(prefers-color-scheme: dark)'))
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', handleMatchEvent)

    const updateFromStorage = () => {
      try {
        if (localStorage.getItem('isDark') === 'true') {
          setThemeName('dark')
        } else {
          setThemeName('light')
        }
      } catch {
        // ignore
      }
    }
    updateFromStorage()
    window.addEventListener('storage', updateFromStorage)
  }, [])

  const updateThemeName = (newThemeName: ThemeName) => {
    setThemeName(newThemeName)
    try {
      localStorage.setItem('isDark', newThemeName === 'dark' ? 'true' : 'false')
    } catch {
      // ignore
    }
  }

  return {
    themeName,
    isDarkMode: themeName === 'dark',
    isLightMode: themeName === 'light',
    updateThemeName
  }
}

export default useTheme
