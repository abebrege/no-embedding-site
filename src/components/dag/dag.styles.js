import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

export const DagCanvas = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.lg,
  minWidth: 'max-content',
  paddingBottom: theme.spacing.sm,
})

export const NodeCard = styled('div', {
  shouldForwardProp: (prop) => prop !== 'nodeType',
})(({ nodeType }) => ({
  border: `1px solid ${theme.color.border.secondary}`,
  borderRadius: theme.layout.borderRadius.md,
  padding: theme.spacing.sm,
  minWidth: nodeType === 'institution' ? '220px' : '180px',
  maxWidth: '280px',
  backgroundColor:
    nodeType === 'institution'
      ? theme.color.surface
      : theme.color.surfaceAlt,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
}))

export const NodeTitle = styled('div')({
  fontFamily: theme.font.family.ui,
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.semibold,
  color: theme.color.text.heading,
  lineHeight: 1.3,
})

export const NodeSubtitle = styled('div')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.xs,
  color: theme.color.text.secondary,
  lineHeight: 1.3,
})

export const InstitutionHead = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.sm,
})

export const UniLogo = styled('div')({
  width: '36px',
  height: '36px',
  borderRadius: theme.layout.borderRadius.sm,
  backgroundColor: theme.color.background,
  border: `1px solid ${theme.color.border.secondary}`,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const HorizontalArm = styled('div')({
  width: theme.spacing.md,
  height: '1px',
  backgroundColor: theme.color.border.primary,
  flexShrink: 0,
})

export const SpineContainer = styled('div')({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.sm,
})
