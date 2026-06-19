import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

// Small labeled chip for inline metadata (year, language, type, …).
const DetailChip = styled('span')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.xs,
  color: theme.color.text.secondary,
  backgroundColor: theme.color.surface,
  border: `1px solid ${theme.color.border.secondary}`,
  borderRadius: theme.layout.borderRadius.sm,
  padding: `2px ${theme.spacing.sm}`,
})

export default DetailChip
