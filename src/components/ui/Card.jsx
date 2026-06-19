import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

// The shared card surface used by every list page.
const Card = styled('div')({
  border: `1px solid ${theme.color.border.secondary}`,
  borderRadius: theme.layout.borderRadius.md,
  padding: theme.spacing.md,
  backgroundColor: theme.color.surface,
  boxShadow: theme.color.shadow,
})

export default Card
