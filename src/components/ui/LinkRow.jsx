import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'
import ExternalLink from './ExternalLink.jsx'

const Row = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing.sm,
  marginBottom: theme.spacing.sm,
})

// A non-interactive badge marking the paper as open access.
const Badge = styled('span')({
  fontFamily: theme.font.family.ui,
  fontSize: theme.font.size.xs,
  color: theme.color.accent.default,
  padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
  border: `1px solid ${theme.color.accent.border}`,
  backgroundColor: theme.color.accent.background,
  borderRadius: theme.layout.borderRadius.sm,
  whiteSpace: 'nowrap',
})

const GithubLink = styled('a')({
  display: 'inline-flex',
  alignItems: 'center',
  '&:hover': { opacity: 0.7 },
})

// The dark GitHub mark needs inverting to stay visible in dark mode.
const GithubLogo = styled('img')({
  display: 'block',
  '[data-theme="dark"] &': { filter: 'invert(1)' },
})

// A row of paper/repo links. `repo` renders as the GitHub logo, `doi`/`group`
// render as link pills, and `paper` (the open-access url) renders as a plain
// "Open Access" label by default — used on cards whose whole surface already
// links to the paper. Pass `paperAsLink` (e.g. in a non-clickable table row) to
// render it as a clickable "Open Access" link instead. Each prop is a URL; only
// the present ones render. Renders nothing when no links are supplied.
const LinkRow = ({ repo, paper, doi, group, paperAsLink = false }) => {
  if (!repo && !paper && !doi && !group) return null

  return (
    <Row>
      {repo && (
        <GithubLink
          href={repo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Repository"
          onClick={(e) => e.stopPropagation()}
        >
          <GithubLogo src="/github.svg" alt="GitHub repository" width={20} height={20} />
        </GithubLink>
      )}
      {paper &&
        (paperAsLink ? (
          <ExternalLink href={paper}>Open Access</ExternalLink>
        ) : (
          <Badge>Open Access</Badge>
        ))}
      <ExternalLink href={doi}>DOI</ExternalLink>
      <ExternalLink href={group}>Research Group</ExternalLink>
    </Row>
  )
}

export default LinkRow
