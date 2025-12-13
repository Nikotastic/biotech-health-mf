import apiClient from '../../../shared/utils/apiClient'

export const healthRecordsService = {
  getHealthRecords: async (animalId = null) => {
    const url = animalId ? `/health/records?animalId=${animalId}` : '/health/records'
    const response = await apiClient.get(url)
    return response.data
  },
  
  createHealthRecord: async (data) => {
    const response = await apiClient.post('/health/records', data)
    return response.data
  },
  
  updateHealthRecord: async (id, data) => {
    const response = await apiClient.put(`/health/records/${id}`, data)
    return response.data
  }
}