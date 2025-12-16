import HealthDashboard from "./features/dashboard/components/HealthDashboard";
import { ToastContainer } from "./shared/components/ui/ToastContainer";
import "./index.css";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-background p-8">
        <HealthDashboard
          onViewRecords={() => console.log("Ver Registros")}
          onViewCalendar={() => console.log("Ver Calendario")}
        />
      </div>
    </>
  );
}

export default App;
