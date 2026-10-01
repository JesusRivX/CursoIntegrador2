import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { sileo } from "sileo";

const getAuthenticatedUser = () => {
  const data = localStorage.getItem("authUser");
  if (!data) {
    return null;
  }
  try {
    return JSON.parse(data);
  } catch {
    localStorage.removeItem("authUser");
    localStorage.removeItem("token");
    return null;
  }
};

const ProtectedRoute = ({ role }) => {
  const navigate = useNavigate();
  const user = getAuthenticatedUser();
  const token = localStorage.getItem("token");

  const hasSession = !!user && !!token;
  const isActive = user?.estado === "Activo";
  const hasCorrectRole = user?.rol === role;

  useEffect(() => {
    if (!hasSession) {
      navigate("/login", { replace: true });
      return;
    }
    if (!isActive) {
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      sileo.error({
        title: "Usuario inactivo",
        description: "Tu cuenta se encuentra inactiva.",
      });
      navigate("/login", { replace: true });
      return;
    }
    if (!hasCorrectRole) {
      sileo.error({
        title: "Ruta protegida",
        description: "No tienes permisos para acceder a esta sección.",
      });
      navigate("/login", { replace: true });
    }
  }, [hasSession, isActive, hasCorrectRole, navigate]);

  if (!hasSession || !isActive || !hasCorrectRole) {
    return null;
  }
  return <Outlet />;
};

export default ProtectedRoute;
