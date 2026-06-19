import request from './apiClient.js'

export const getLanguages = () => request('/languages')

export const getLanguage = (id) => request(`/languages/${id}`)
