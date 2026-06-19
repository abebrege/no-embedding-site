import React from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

const Scroll = styled('div')({
  overflowX: 'auto',
  width: '100%',
})

const Table = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: theme.font.family.body,
})

const Th = styled('th')({
  textAlign: 'left',
  padding: theme.spacing.sm,
  fontFamily: theme.font.family.ui,
  fontWeight: theme.font.weight.semibold,
  fontSize: theme.font.size.xs,
  color: theme.color.text.secondary,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  borderBottom: `1px solid ${theme.color.border.primary}`,
  whiteSpace: 'nowrap',
})

const Td = styled('td')({
  padding: theme.spacing.sm,
  fontSize: theme.font.size.sm,
  color: theme.color.text.primary,
  borderBottom: `1px solid ${theme.color.border.secondary}`,
  verticalAlign: 'top',
})

// Generic table driven by a column config. Each column is
// { key, header, render(row) }; render may emit a Logo, LinkRow,
// AssociationList, TextLink, or plain text.
const InventoryTable = ({ columns, rows = [], keyOf }) => (
  <Scroll>
    <Table>
      <thead>
        <tr>
          {columns.map((col) => <Th key={col.key}>{col.header}</Th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={keyOf ? keyOf(row) : i}>
            {columns.map((col) => <Td key={col.key}>{col.render(row)}</Td>)}
          </tr>
        ))}
      </tbody>
    </Table>
  </Scroll>
)

export default InventoryTable
