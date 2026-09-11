import { Outlet } from "react-router-dom";
import SidebarDashboard from "../../components/dashboard/SidebarDashboard";
import HeaderDashboard from "../../components/dashboard/HeaderDashboard";
import useStudentDashboard from "./useStudentDashboard";

const StudentDashboard = () => {
  const {
    user,
    navigation,
    navigate,
    location,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    handleLogout,
  } = useStudentDashboard();

  return (
    <div className="h-screen overflow-hidden bg-[#f7f9fc] text-slate-800">
      <div className="flex h-full">
        {sidebarOpen && (
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden"
          />
        )}

        <SidebarDashboard
          user={user}
          navigation={navigation}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          navigate={navigate}
          location={location}
          handleLogout={handleLogout}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <HeaderDashboard
            user={user}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            subtitle="Nos alegra tenerte de vuelta."
            progressTitle="Tu progreso académico"
            progressText="Continúa aprendiendo"
          />

          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="mx-auto max-w-375 space-y-6 p-5 sm:p-6 lg:space-y-8 lg:p-8">
              <Outlet context={{ user }} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
