import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'
import useColorMode from '../../hooks/useColorMode.js'

const Button = styled('button')({
  position: 'fixed',
  top: theme.spacing.md,
  right: theme.spacing.md,
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '36px',
  height: '36px',
  padding: 0,
  borderRadius: theme.layout.borderRadius.md,
  border: `1px solid ${theme.color.border.primary}`,
  background: theme.color.surface,
  color: theme.color.text.primary,
  fontSize: theme.font.size.md,
  lineHeight: 1,
  cursor: 'pointer',
  transition: 'background 0.15s ease, border-color 0.15s ease',
  '&:hover': {
    background: theme.color.surfaceAlt,
    borderColor: theme.color.accent.default,
  },
})

// Fixed top-right toggle. Shows the icon for the mode you'd switch *to*.
function ThemeToggle() {
  const { mode, toggle } = useColorMode()
  const isDark = mode === 'dark'
  return (
    <Button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? '☀' : '☾'}
    </Button>
  )
}

export default ThemeToggle
