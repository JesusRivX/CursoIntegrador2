import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import SidebarDashboard from "../../components/dashboard/SidebarDashboard";
import HeaderDashboard from "../../components/dashboard/HeaderDashboard";
import { dashboardNavigation } from "../../config/dashboardNavigation";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // ============================================================
    // USUARIO
    // ============================================================
    //
    // 1. Primero intentamos obtenerlo desde location.state
    // 2. Si no existe, lo recuperamos desde localStorage
    //
    // Esto permite que el usuario siga disponible al recargar.
    // ============================================================

    const user =
        location.state?.user ??
        (() => {
            try {
                return JSON.parse(localStorage.getItem("adminUser") || "null");
            } catch {
                return null;
            }
        })();

    const navigation = dashboardNavigation.admin;

    // ============================================================
    // LOGOUT
    // ============================================================

    const handleLogout = () => {
        localStorage.removeItem("adminUser");
        navigate("/");
    };

    return (
        <div className="h-screen overflow-hidden bg-[#f7f9fc] text-slate-800">
            <div className="flex h-full">
                {/* ======================================================
            OVERLAY MOBILE
        ====================================================== */}

                {sidebarOpen && (
                    <button
                        type="button"
                        aria-label="Cerrar menú"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm lg:hidden"
                    />
                )}

                {/* ======================================================
            SIDEBAR
        ====================================================== */}

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

                {/* ======================================================
            CONTENIDO
        ====================================================== */}

                <div className="flex min-w-0 flex-1 flex-col">
                    {/* HEADER */}

                    <HeaderDashboard
                        user={user}
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        subtitle="Nos alegra tenerte de vuelta."
                        progressTitle="Tu progreso académico"
                        progressText="Continúa aprendiendo"
                    />

                    {/* CONTENIDO DEL OUTLET */}

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

export default AdminDashboard;
