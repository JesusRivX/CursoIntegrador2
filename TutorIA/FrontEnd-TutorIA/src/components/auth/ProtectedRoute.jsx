import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { sileo } from "sileo";

const storageKeys = ["studentUser", "teacherUser", "adminUser"];

const getAuthenticatedUser = () => {
    for (const key of storageKeys) {
        const data = localStorage.getItem(key);

        if (!data) continue;

        try {
            const user = JSON.parse(data);

            if (user) {
                return user;
            }
        } catch {
            localStorage.removeItem(key);
        }
    }

    return null;
};

const ProtectedRoute = ({ role }) => {
    const location = useLocation();
    const navigate = useNavigate();

    // ============================================================
    // OBTENER USUARIO ACTUAL
    // ============================================================

    const user = getAuthenticatedUser();

    const hasSession = !!user;
    const isActive = user?.estado === "Activo";
    const hasCorrectRole = user?.rol === role;

    // ============================================================
    // GUARDAR ÚLTIMA RUTA VÁLIDA
    // ============================================================

    useEffect(() => {
        if (hasSession && isActive && hasCorrectRole) {
            sessionStorage.setItem(
                "lastValidRoute",
                location.pathname + location.search,
            );
        }
    }, [
        hasSession,
        isActive,
        hasCorrectRole,
        location.pathname,
        location.search,
    ]);

    // ============================================================
    // RUTA NO AUTORIZADA
    // ============================================================

    useEffect(() => {
        if (hasSession && isActive && !hasCorrectRole) {
            const lastValidRoute = sessionStorage.getItem("lastValidRoute");

            sileo.error({
                title: "Ruta protegida",
                description: "No tienes permisos para acceder a esta sección.",
            });

            if (lastValidRoute && lastValidRoute !== location.pathname) {
                navigate(lastValidRoute, {
                    replace: true,
                });
            }
        }
    }, [hasSession, isActive, hasCorrectRole, location.pathname, navigate]);

    // ============================================================
    // NO HAY SESIÓN
    // ============================================================

    if (!hasSession) {
        return null;
    }

    // ============================================================
    // USUARIO INACTIVO
    // ============================================================

    if (!isActive) {
        return null;
    }

    // ============================================================
    // ROL INCORRECTO
    // ============================================================

    if (!hasCorrectRole) {
        return null;
    }

    // ============================================================
    // ACCESO PERMITIDO
    // ============================================================

    return <Outlet />;
};

export default ProtectedRoute;
