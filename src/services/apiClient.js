// The single source of the API base URL. VITE_BASE must already include /api.
const BASE_URL = import.meta.env.VITE_BASE

// Fetch a path, unwrap the { success, data } envelope, and throw on failure.
async function request(path, options) {
  const res = await fetch(`${BASE_URL}${path}`, options)
  const body = await res.json().catch(() => null)
  if (!res.ok || !body?.success) {
    throw new Error(body?.error || `Request failed: ${res.status}`)
  }
  return body.data
}

export default request
