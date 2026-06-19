import request from './apiClient.js'

export const getLiterature = ({ sort, limit } = {}) => {
  const params = new URLSearchParams()
  if (sort) params.set('sort', sort)
  if (limit) params.set('limit', limit)
  const query = params.toString()
  return request(`/literature${query ? `?${query}` : ''}`)
}

export const getLiteratureItem = (id) => request(`/literature/${id}`)
