import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

const Section = styled('div')({
  marginTop: theme.spacing.sm,
})

const Label = styled('h4')({
  fontFamily: theme.font.family.ui,
  fontWeight: theme.font.weight.semibold,
  fontSize: theme.font.size.xs,
  color: theme.color.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  margin: 0,
})

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: `${theme.spacing.xs} 0 0 0`,
})

const Item = styled('li')({
  fontFamily: theme.font.family.body,
  fontSize: theme.font.size.sm,
  color: theme.color.text.primary,
  margin: `${theme.spacing.xs} 0`,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xs,
})

// The repeated "Label (n) + list + …and X more" block.
// renderItem(item) -> node for each shown item; keyOf(item) -> React key.
const AssociationList = ({ label, items = [], max = 3, renderItem, keyOf }) => {
  if (!items || items.length === 0) return null
  const shown = items.slice(0, max)
  const remainder = items.length - max

  return (
    <Section>
      <Label>{label} ({items.length})</Label>
      <List>
        {shown.map((item, i) => (
          <Item key={keyOf ? keyOf(item) : i}>{renderItem(item)}</Item>
        ))}
        {remainder > 0 && <Item>...and {remainder} more</Item>}
      </List>
    </Section>
  )
}

export default AssociationList
