import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

// The shared card surface used by every list page.
const Surface = styled('div', { shouldForwardProp: (prop) => prop !== 'clickable' })(
  ({ clickable }) => ({
    border: `1px solid ${theme.color.border.secondary}`,
    borderRadius: theme.layout.borderRadius.md,
    padding: theme.spacing.md,
    backgroundColor: theme.color.surface,
    boxShadow: theme.color.shadow,
    ...(clickable && {
      cursor: 'pointer',
      transition: 'border-color 120ms ease, box-shadow 120ms ease',
      '&:hover': { borderColor: theme.color.link.default },
      '&:focus-visible': { outline: `2px solid ${theme.color.link.default}`, outlineOffset: '2px' },
    }),
  }),
)

// When `href` is provided the whole card becomes clickable, opening the link in
// a new tab. Inner links keep working on their own because they stop click
// propagation (see ExternalLink/TextLink/Logo). With no href it's a plain card.
const Card = ({ href, children, ...rest }) => {
  if (!href) return <Surface {...rest}>{children}</Surface>

  const open = () => window.open(href, '_blank', 'noopener,noreferrer')
  return (
    <Surface
      clickable
      role="link"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          open()
        }
      }}
      {...rest}
    >
      {children}
    </Surface>
  )
}

export default Card
