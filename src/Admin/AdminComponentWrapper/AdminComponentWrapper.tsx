import { GraphQLClient } from 'graphql-request'
import React, { useEffect, createContext } from 'react'
import 'primeicons/primeicons.css'
import 'primereact/resources/primereact.min.css'
import '../../styles/theme.css'
import '../../styles/index.css'
import useTheme, { ThemeName } from './../useTheme'
import { darkTheme, lightTheme } from './theme-colors'

interface Props {
  children: React.ReactNode
  client: GraphQLClient
}

interface IAdminComponentContext {
  client?: GraphQLClient
  themeName: 'light' | 'dark'
  updateThemeName: (newThemeName: ThemeName) => void
}

export const AdminComponentContext = createContext<IAdminComponentContext>({
  client: undefined,
  themeName: 'light',
  updateThemeName: () => {}
})

export const AdminComponentWrapper: React.FC<Props> = props => {
  const { children, client } = props
  const { themeName, isDarkMode, updateThemeName } = useTheme()

  useEffect(() => {
    if (isDarkMode) {
      Object.keys(darkTheme).forEach(key => {
        document.documentElement.style.setProperty(key, darkTheme[key])
      })
    } else {
      Object.keys(lightTheme).forEach(key => {
        document.documentElement.style.setProperty(key, lightTheme[key])
      })
    }
  }, [isDarkMode])

  return (
    <AdminComponentContext.Provider
      value={{
        client,
        themeName,
        updateThemeName
      }}
    >
      {children}
    </AdminComponentContext.Provider>
  )
}
