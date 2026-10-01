import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dashboardNavigation } from "../../config/dashboardNavigation";

const getStudentUser = () => {
  try {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

const useStudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const user = location.state?.user ?? getStudentUser();
  const navigation = dashboardNavigation.estudiante;

  const handleLogout = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("token");
    navigate("/");
  };

  return {
    user,
    navigation,
    navigate,
    location,
    sidebarOpen,
    setSidebarOpen,
    sidebarCollapsed,
    setSidebarCollapsed,
    handleLogout,
  };
};

export default useStudentDashboard;
