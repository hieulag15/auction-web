import apiClient from './config/apiClient'

export const getProducts = async () => {
  try {
    const response = (await apiClient.get('/asset'))
    return response.data
  } catch (error) {
    if (error.response) {
      console.error('API Error Response:', error.response.data)
      return error.response.data
    } else {
      console.error('Error:', error)
      throw error
    }
  }
}