import React from 'react'
import useResource from '../../../hooks/useResource.js'
import PageShell from '../../ui/PageShell.jsx'
import InventoryTable from '../../ui/InventoryTable.jsx'
import Loading from '../../ui/Loading.jsx'

// One page backing all three list routes. Swap the config to swap the
// columns + fetcher; nothing else changes.
function InventoryPage({ config }) {
  const { data, loading, error } = useResource(config.fetcher, [config])

  if (loading) return <PageShell title={config.title}><Loading>Loading {config.title.toLowerCase()}...</Loading></PageShell>
  if (error) return <PageShell title={config.title}><Loading>Error: {error}</Loading></PageShell>

  const rows = data || []

  return (
    <PageShell title={config.title} count={rows.length}>
      <InventoryTable columns={config.columns} rows={rows} keyOf={config.keyOf} defaultSort={config.defaultSort} />
    </PageShell>
  )
}

export default InventoryPage
