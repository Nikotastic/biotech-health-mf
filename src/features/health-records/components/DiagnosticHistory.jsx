import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  Calendar,
  Search,
  FileText,
  ChevronRight,
  Stethoscope,
  Pill,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { useHealthRecords } from "../hooks/useHealthRecords";

const DiagnosticHistory = () => {
  const { records, loading } = useHealthRecords();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDiagnostics = useMemo(() => {
    return records.filter(
      (r) =>
        r.animalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [records, searchTerm]);

  const getSeverityColor = (status) => {
    // We simulate severity based on status or type
    if (status === "En Curso" || status === "Emergencia")
      return "text-red-600 bg-red-50 border-red-200";
    if (status === "Pendiente")
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-green-900 flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-green-600" />
            Historial de Diagnósticos
          </h1>
          <p className="text-green-600 mt-1">Seguimiento clínico y evolutivo</p>
        </motion.div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar diagnóstico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border-2 border-green-100 rounded-xl focus:outline-none focus:border-green-500 w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredDiagnostics.map((record, idx) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-green-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${getSeverityColor(
                      record.status
                    )}`}
                  >
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {record.animalName}{" "}
                      <span className="text-sm font-normal text-gray-500">
                        ({record.animalId})
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4" />
                      {record.date}
                    </div>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${getSeverityColor(
                    record.status
                  )}`}
                >
                  {record.status}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pl-16">
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Diagnóstico
                  </p>
                  <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {record.diagnosis || "Sin diagnóstico registrado"}
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                    <Pill className="w-4 h-4" />
                    Tratamiento
                  </p>
                  <p className="text-gray-800 font-medium bg-gray-50 p-3 rounded-lg border border-gray-100">
                    {record.treatment || "Sin tratamiento registrado"}
                  </p>
                </div>
              </div>

              <div className="mt-4 pl-16 pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  Atendido por: {record.veterinarian}
                </div>

                {record.nextVisit && (
                  <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                    Próxima revisión: {record.nextVisit}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {filteredDiagnostics.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-gray-200">
            <Activity className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              No se encontraron diagnósticos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticHistory;
