import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

const Anchor = styled('a')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.xs,
  color: theme.color.link.default,
  textDecoration: 'none',
  padding: theme.spacing.xs,
  border: `1px solid ${theme.color.link.default}`,
  borderRadius: theme.layout.borderRadius.sm,
  '&:hover': {
    color: theme.color.link.hover,
    borderColor: theme.color.link.hover,
  },
})

// Renders a safe external link, or nothing when href is falsy.
// This is how "use every available URL, hide the rest" stays clean.
// Stops click propagation so the link works on its own inside a clickable Card.
const ExternalLink = ({ href, children, ...rest }) => {
  if (!href) return null
  return (
    <Anchor
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      {...rest}
    >
      {children}
    </Anchor>
  )
}

export default ExternalLink
