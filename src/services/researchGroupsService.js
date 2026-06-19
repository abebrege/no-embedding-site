import request from './apiClient.js'

export const getResearchGroups = () => request('/research-groups')

export const getResearchGroup = (id) => request(`/research-groups/${id}`)
