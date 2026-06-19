import request from './apiClient.js'

export const getInstitutions = () => request('/institutions')

export const getInstitution = (id) => request(`/institutions/${id}`)
