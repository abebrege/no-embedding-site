import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

// Uppercase section label used by the home-page sections.
const SectionHeading = styled('h2')({
  margin: `0 0 ${theme.spacing.md} 0`,
  fontFamily: theme.font.family.ui,
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.semibold,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: theme.color.text.secondary,
})

export default SectionHeading
