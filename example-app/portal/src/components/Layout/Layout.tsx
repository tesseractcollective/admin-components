import React, { useContext } from 'react'
import { Toolbar } from 'primereact/toolbar'
import { ThemeSwitch } from '../ThemeSwitch/ThemeSwitch'
import { AdminComponentContext } from '@tesseractcollective/admin-components'

interface Props {
  children: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  const { updateThemeName, themeName } = useContext(AdminComponentContext)

  const leftContents = (
    <div className="flex flex-row gap-3 items-center">
      <a href="/">
        <p className="text-primary">
          <span className="font-bold text-3xl">Example App</span>
        </p>
        <h1 className="text-primary text-lg"></h1>
      </a>
    </div>
  )
  const rightContents = (
    <>
      <ThemeSwitch updateThemeName={updateThemeName} themeName={themeName} />
    </>
  )
  return (
    <>
      <Toolbar
        left={leftContents}
        right={rightContents}
        style={{
          position: 'fixed',
          top: '0',
          width: '100vw',
          height: '56px',
          zIndex: 1000,
          borderRadius: 0,
          border: 'none',
          padding: '0 1.7rem',
          backgroundColor: '#383838'
        }}
      />
      <div
        style={{
          paddingTop: '56px'
        }}
      >
        {children}
      </div>
    </>
  )
}

export default Layout
