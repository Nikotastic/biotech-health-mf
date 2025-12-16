import {
  healthRecordsMock,
  vaccinationsMock,
  statsMock,
} from "../mocks/healthData";

const DELAY = 800;

export const healthService = {
  // Get all health records
  getHealthRecords: async (filter = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let filtered = [...healthRecordsMock];

        if (filter.type && filter.type !== "all") {
          filtered = filtered.filter((r) => r.type === filter.type);
        }

        if (filter.search) {
          const searchLower = filter.search.toLowerCase();
          filtered = filtered.filter(
            (r) =>
              r.animalName.toLowerCase().includes(searchLower) ||
              r.animalId.toLowerCase().includes(searchLower)
          );
        }

        resolve(filtered);
      }, DELAY);
    });
  },

  // Get dashboard statistics
  getDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(statsMock);
      }, DELAY);
    });
  },

  // Get vaccination calendar
  getVaccinations: async (month, year) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real implementation, we would filter by date here
        resolve(vaccinationsMock);
      }, DELAY);
    });
  },

  // Create a new record
  createRecord: async (record) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newRecord = {
          ...record,
          id: Math.random().toString(36).substr(2, 9),
          date: new Date().toISOString().split("T")[0],
          status: "Completado", // Default status
        };
        healthRecordsMock.unshift(newRecord);
        resolve(newRecord);
      }, DELAY);
    });
  },

  // Get upcoming events (for the dashboard)
  getUpcomingEvents: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pending = vaccinationsMock.filter((v) => v.status === "pending");
        // Map to the expected format by the dashboard
        const events = pending.slice(0, 3).map((v) => ({
          date: v.date,
          event: `Vacunación: ${v.vaccine} - ${v.animal}`,
          priority: v.priority,
        }));
        resolve(events);
      }, DELAY);
    });
  },

  // Get recent treatments (for the dashboard)
  getRecentTreatments: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const treatments = healthRecordsMock
          .filter((r) => r.type === "Tratamiento" || r.type === "Emergencia")
          .slice(0, 3)
          .map((r) => ({
            animal: `${r.animalName} (${r.animalId})`,
            treatment: r.treatment,
            date: r.date,
            status: r.status === "Completado" ? "success" : "warning",
          }));
        resolve(treatments);
      }, DELAY);
    });
  },
};
