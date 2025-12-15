import { useState, useEffect } from "react";
import { healthService } from "../../../shared/services/healthService";

export const useHealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]); // Provide items alias for compatibility if needed

  // Filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Cargar registros cuando cambien los filtros
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const data = await healthService.getHealthRecords({
          search: searchTerm,
          type: filterType,
        });
        setRecords(data);
        setItems(data); // Sync items
        setError(null);
      } catch (err) {
        console.error("Error fetching records:", err);
        setError("Error al cargar listado de salud");
      } finally {
        setLoading(false);
      }
    };

    // Debounce para búsqueda
    const timeoutId = setTimeout(() => {
      fetchRecords();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterType]);

  const createRecord = async (newRecord) => {
    try {
      setLoading(true);
      await healthService.createRecord(newRecord);
      // Recargar para obtener la lista actualizada
      const data = await healthService.getHealthRecords({
        search: searchTerm,
        type: filterType,
      });
      setRecords(data);
      setItems(data);
      return true;
    } catch (err) {
      setError("Error al crear registro");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    records,
    items, // For list view
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    createRecord,
  };
};
