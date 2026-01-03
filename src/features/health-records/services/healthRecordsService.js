import apiService from "@shared-services/ApiService";

export const healthService = {
  // Create a new health event
  // POST /api/HealthEvent
  createHealthEvent: async (eventData) => {
    const response = await apiService.post("/HealthEvent", eventData);
    return response.data;
  },

  // Get health events by Farm ID
  // GET /api/HealthEvent/farm/{farmId}
  getEventsByFarm: async (farmId) => {
    const response = await apiService.get(`/HealthEvent/farm/${farmId}`);
    return response.data;
  },

  // Get health events by Animal ID
  // GET /api/HealthEvent/animal/{animalId}
  getEventsByAnimal: async (animalId) => {
    const response = await apiService.get(`/HealthEvent/animal/${animalId}`);
    return response.data;
  },

  // Get health events by Batch ID
  // GET /api/HealthEvent/batch/{batchId}
  getEventsByBatch: async (batchId) => {
    const response = await apiService.get(`/HealthEvent/batch/${batchId}`);
    return response.data;
  },

  // Get health events by Event Type
  // GET /api/HealthEvent/type/{type}
  getEventsByType: async (type) => {
    const response = await apiService.get(`/HealthEvent/type/${type}`);
    return response.data;
  },
};

export default healthService;
