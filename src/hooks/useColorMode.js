import { useState, useEffect } from 'react'

const STORAGE_KEY = 'color-mode'

// Light is the default; 'dark' is the only other valid value.
export const getStoredMode = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'dark' ? 'dark' : 'light'
}

export const applyMode = (mode) => {
  document.documentElement.dataset.theme = mode
}

export default function useColorMode() {
  const [mode, setMode] = useState(getStoredMode)

  useEffect(() => {
    applyMode(mode)
    localStorage.setItem(STORAGE_KEY, mode)
  }, [mode])

  const toggle = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'))

  return { mode, toggle }
}
