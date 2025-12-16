import apiClient from "../utils/apiClient";

export const healthService = {
  // Generic method to fetch records based on filter
  getHealthRecords: async (filter = {}) => {
    let url = "/HealthEvent"; // Default or finding a way to get all
    if (filter.farmId) {
      url = `/HealthEvent/farm/${filter.farmId}`;
    } else if (filter.animalId) {
      url = `/HealthEvent/animal/${filter.animalId}`;
    } else if (filter.batchId) {
      url = `/HealthEvent/batch/${filter.batchId}`;
    } else if (filter.type && filter.type !== "all") {
      url = `/HealthEvent/type/${filter.type}`;
    } else {
      if (authStorage) {
        try {
          const { state } = JSON.parse(authStorage);
          if (state?.selectedFarm?.id) {
            url = `/HealthEvent/farm/${state.selectedFarm.id}`;
          }
        } catch (e) {
          console.error("Error reading selected farm", e);
        }
      }
    }

    try {
      const response = await apiClient.get(url);
      let data = response.data;

      if (filter.type && filter.type !== "all" && !url.includes("/type/")) {
        data = data.filter((r) => r.type === filter.type);
      }

      if (filter.search) {
        const searchLower = filter.search.toLowerCase();
        data = data.filter(
          (r) =>
            (r.animalName &&
              r.animalName.toLowerCase().includes(searchLower)) ||
            (r.animalId &&
              r.animalId.toString().toLowerCase().includes(searchLower))
        );
      }

      return data;
    } catch (error) {
      console.error("Error fetching health records:", error);
      return []; // Return empty array on error to prevent crash
    }
  },

  // Create a new record
  // POST /api/HealthEvent
  createRecord: async (record) => {
    const response = await apiClient.post("/HealthEvent", record);
    return response.data;
  },

  // Get dashboard statistics (Mocked for now or implement if endpoint exists)
  getDashboardStats: async () => {
    return {
      totalAnimals: 0,
      sickAnimals: 0,
      pendingVaccines: 0,
      healthIndex: 100,
    };
  },

  // Get vaccination calendar
  getVaccinations: async (month, year) => {
    return [];
  },

  // Get upcoming events
  getUpcomingEvents: async () => {
    return [];
  },

  // Get recent treatments
  getRecentTreatments: async () => {
    return [];
  },
};
