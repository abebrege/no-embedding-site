import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

// Centered status text for loading / error / empty states.
const Loading = styled('p')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.body,
  color: theme.color.text.secondary,
  textAlign: 'center',
})

export default Loading
