import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'
import BackButton from '../form-elements/BackButton.jsx'

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing.xl,
  gap: theme.spacing.lg,
  boxSizing: 'border-box',
  height: '100vh',
  overflow: 'auto',
})

const Title = styled('h1')({
  fontFamily: theme.font.family.heading,
  fontWeight: theme.font.weight.bold,
  fontSize: theme.font.size.xl,
  color: theme.color.text.heading,
  margin: 0,
})

// Standard list-page layout: back button + title (with optional count) + content.
const PageShell = ({ title, count, children }) => (
  <Wrapper>
    <BackButton />
    <Title>{title}{count != null ? ` (${count})` : ''}</Title>
    {children}
  </Wrapper>
)

export default PageShell
