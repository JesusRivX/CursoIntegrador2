import api from "../api/axios";

export const getKpiInicio = async () => {
  const response = await api.get("/admin/dashboard-kpi-inicio");
  return response.data;
};

export const getKpiUsuarios = async () => {
  const response = await api.get("/admin/kpi-usuarios");
  return response.data;
};

export const getUsuarios = async () => {
  const response = await api.get("/admin/usuarios");
  return response.data;
};

export const getUsuarioInfo = async (userId) => {
  const response = await api.get(`/admin/usuarios/${userId}`);
  return response.data;
};
