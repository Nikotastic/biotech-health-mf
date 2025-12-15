import {
  healthRecordsMock,
  vaccinationsMock,
  statsMock,
} from "../mocks/healthData";

const DELAY = 800;

export const healthService = {
  // Obtener todos los registros médicos
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

  // Obtener estadísticas del dashboard
  getDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(statsMock);
      }, DELAY);
    });
  },

  // Obtener calendario de vacunación
  getVaccinations: async (month, year) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // En una implementación real, filtraríamos por fecha aquí
        resolve(vaccinationsMock);
      }, DELAY);
    });
  },

  // Crear un nuevo registro
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

  // Obtener eventos próximos (para el dashboard)
  getUpcomingEvents: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pending = vaccinationsMock.filter((v) => v.status === "pending");
        // Mapear al formato esperado por el dashboard
        const events = pending.slice(0, 3).map((v) => ({
          date: v.date,
          event: `Vacunación: ${v.vaccine} - ${v.animal}`,
          priority: v.priority,
        }));
        resolve(events);
      }, DELAY);
    });
  },

  // Obtener tratamientos recientes (para el dashboard)
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
