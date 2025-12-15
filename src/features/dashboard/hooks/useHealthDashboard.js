import { useState, useEffect } from "react";
import { healthService } from "../../../shared/services/healthService";

export const useHealthDashboard = () => {
  const [stats, setStats] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentTreatments, setRecentTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsData, eventsData, treatmentsData] = await Promise.all([
          healthService.getDashboardStats(),
          healthService.getUpcomingEvents(),
          healthService.getRecentTreatments(),
        ]);

        setStats(statsData);
        setUpcomingEvents(eventsData);
        setRecentTreatments(treatmentsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Error al cargar datos del dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return {
    stats,
    upcomingEvents,
    recentTreatments,
    loading,
    error,
  };
};
