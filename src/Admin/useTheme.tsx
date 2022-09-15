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

  return {
    themeName,
    isDarkMode: themeName === 'dark',
    isLightMode: themeName === 'light'
  }
}

export default useTheme
