import React, { useCallback, useContext, useEffect, useState } from 'react'
import ReactSwitch from 'react-switch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faMoon } from '@fortawesome/free-solid-svg-icons'
import './ThemeSwitch.scss'
import useViewport from './hooks/useViewport'
import { AdminComponentContext, ThemeName } from '@tesseractcollective/admin-components'

// prevents 'Element type is invalid' error in build
const Switch = (ReactSwitch as any).default ? (ReactSwitch as any).default : ReactSwitch

interface Props {
  updateThemeName: (newThemeName: ThemeName) => void
  themeName: ThemeName
}

export const ThemeSwitch: React.FC<Props> = ({ themeName, updateThemeName }) => {
  const { width } = useViewport()
  const isMobileWidth = width < 992
  const [isMobile, setIsMobile] = useState(isMobileWidth)

  const isDarkFromLocalStorage = themeName === 'dark'

  const onChangeTheme = useCallback(() => {
    updateThemeName(isDarkFromLocalStorage ? 'light' : 'dark')
  }, [isDarkFromLocalStorage, updateThemeName])

  useEffect(() => {
    if (isMobileWidth !== isMobile) {
      setIsMobile(isMobileWidth)
    }
  }, [width, isMobileWidth, isMobile])

  return (
    <Switch
      checked={isDarkFromLocalStorage}
      onChange={onChangeTheme}
      handleDiameter={isMobile ? 19 : 16}
      height={isMobile ? 0 : 20}
      width={isMobile ? 2 : 40}
      uncheckedIcon={isMobile ? undefined : <FontAwesomeIcon icon={faMoon} />}
      uncheckedHandleIcon={isMobile ? <FontAwesomeIcon icon={faMoon} /> : undefined}
      checkedIcon={isMobile ? undefined : <FontAwesomeIcon icon={faLightbulb} />}
      checkedHandleIcon={isMobile ? <FontAwesomeIcon icon={faLightbulb} /> : undefined}
      onHandleColor={isMobile ? '#00cfe5' : undefined}
      offHandleColor={isMobile ? '#1565C0' : undefined}
      className={`react-switch ${isDarkFromLocalStorage ? 'dark' : 'light'}`}
    />
  )
}
