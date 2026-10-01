import api from "../api/axios";

export const login = async (credentials) => {
  const response = await api.post("/login", credentials);

  localStorage.setItem("token", response.data.token);
  localStorage.setItem("authUser", JSON.stringify(response.data.usuario));
  
  return response.data;
};
