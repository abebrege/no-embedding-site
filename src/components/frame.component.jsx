import { styled } from '@mui/material/styles'
import { Outlet } from 'react-router-dom'
import theme from '../theme.js'
import ThemeToggle from './ui/ThemeToggle.jsx'

const FrameRoot = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  width: '100%',
  maxWidth: '100%',
  backgroundColor: theme.color.background,
  color: theme.color.text.primary,
  boxSizing: 'border-box',
  fontFamily: theme.font.family.body,
})

const FrameBody = styled('div')({
  display: 'flex',
  flex: 1,
  width: '100%',
})

const FrameMain = styled('main')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
})

function Frame() {
  return (
    <FrameRoot id="frame-root">
      <ThemeToggle />
      <FrameBody>
        <FrameMain>
          <Outlet />
        </FrameMain>
      </FrameBody>
    </FrameRoot>
  )
}

export default Frame
