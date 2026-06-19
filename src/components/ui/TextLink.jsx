import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

const Anchor = styled('a')({
  color: theme.color.link.default,
  textDecoration: 'none',
  '&:hover': { color: theme.color.link.hover, textDecoration: 'underline' },
})

// Inline text link: renders children linked when href is present, plain text
// otherwise (so a name/title is always visible, clickable only when a URL exists).
const TextLink = ({ href, children }) => {
  if (!href) return <>{children}</>
  return <Anchor href={href} target="_blank" rel="noopener noreferrer">{children}</Anchor>
}

export default TextLink
