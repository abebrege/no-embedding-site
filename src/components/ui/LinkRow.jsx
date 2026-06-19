import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'
import ExternalLink from './ExternalLink.jsx'

const Row = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.sm,
})

// A row of labeled external-link pills. Each prop is a URL; only the present
// ones render. Renders nothing if no links are supplied.
const LinkRow = ({ repo, paper, doi, group }) => {
  const links = [
    { href: repo, label: 'Repo' },
    { href: paper, label: 'Open Access' },
    { href: doi, label: 'DOI' },
    { href: group, label: 'Research Group' },
  ].filter((l) => l.href)

  if (links.length === 0) return null

  return (
    <Row>
      {links.map((l) => (
        <ExternalLink key={l.label} href={l.href}>{l.label}</ExternalLink>
      ))}
    </Row>
  )
}

export default LinkRow
