import { useState, useEffect } from 'react'

// Run an async fetcher and expose { data, loading, error }.
// Re-runs when deps change; ignores results after unmount/dep-change.
export default function useResource(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const d = await fetcher()
        if (active) setData(d)
      } catch (e) {
        if (active) setError(e.message || 'Error connecting to API')
      } finally {
        if (active) setLoading(false)
      }
    }
    load()
    return () => { active = false }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error }
}
