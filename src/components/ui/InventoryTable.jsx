import React, { useMemo, useState } from 'react'
import { styled } from '@mui/material/styles'
import theme from '../../theme.js'

// Break out of PageShell's horizontal padding so the table spans the full
// screen width; cell padding keeps the content from touching the edges.
const Scroll = styled('div')({
  overflowX: 'auto',
  marginLeft: `-${theme.spacing.xl}`,
  marginRight: `-${theme.spacing.xl}`,
})

const Table = styled('table')({
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: theme.font.family.body,
})

const Th = styled('th', { shouldForwardProp: (prop) => prop !== 'sortable' })(({ sortable }) => ({
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
  cursor: sortable ? 'pointer' : 'default',
  userSelect: 'none',
}))

const Arrow = styled('span')({
  marginLeft: theme.spacing.xs,
  fontSize: '0.85em',
})

const Td = styled('td')({
  padding: theme.spacing.sm,
  fontSize: theme.font.size.sm,
  color: theme.color.text.primary,
  borderBottom: `1px solid ${theme.color.border.secondary}`,
  verticalAlign: 'top',
})

const compare = (a, b) => {
  if (a == null) return 1
  if (b == null) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return String(a).localeCompare(String(b))
}

// Generic table driven by a column config. Each column is
// { key, header, render(row), sortValue?(row) }; columns with a sortValue
// are sortable by clicking the header.
const InventoryTable = ({ columns, rows = [], keyOf }) => {
  const [sort, setSort] = useState({ key: null, dir: 'asc' })

  const sorted = useMemo(() => {
    const col = columns.find((c) => c.key === sort.key)
    if (!col || !col.sortValue) return rows
    const factor = sort.dir === 'asc' ? 1 : -1
    return [...rows].sort((a, b) => compare(col.sortValue(a), col.sortValue(b)) * factor)
  }, [columns, rows, sort])

  const toggle = (col) => {
    if (!col.sortValue) return
    setSort((s) =>
      s.key === col.key
        ? { key: col.key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
        : { key: col.key, dir: 'asc' },
    )
  }

  return (
    <Scroll>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => {
              const active = sort.key === col.key
              return (
                <Th key={col.key} sortable={!!col.sortValue} onClick={() => toggle(col)}>
                  {col.header}
                  {col.sortValue && <Arrow>{active ? (sort.dir === 'asc' ? '▲' : '▼') : '↕'}</Arrow>}
                </Th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={keyOf ? keyOf(row) : i}>
              {columns.map((col) => <Td key={col.key}>{col.render(row)}</Td>)}
            </tr>
          ))}
        </tbody>
      </Table>
    </Scroll>
  )
}

export default InventoryTable
