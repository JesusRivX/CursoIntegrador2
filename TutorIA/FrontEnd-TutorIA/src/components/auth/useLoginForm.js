import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import { login } from "../../services/auth/auth.service";

const initialFormData = {
  rol: "Estudiante",
  codigo: "",
  password: "",
};

const useLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (rol) => {
    setFormData((prev) => ({ ...prev, rol }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { rol, codigo, password } = formData;

    const hasEmptyFields = [rol, codigo, password].some(
      (value) => !value || !value.trim(),
    );

    if (hasEmptyFields) {
      sileo.error({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos para continuar.",
      });
      return;
    }
    try {
      setLoading(true);
      const result = await login({ codigo: codigo.trim(), password, rol });
      console.log("Respuesta del backend:", result);

      if (result?.usuario && result?.token) {
        const usuario = result.usuario;
        sileo.success({
          title: "Login exitoso",
          description: `Bienvenido, ${usuario.nombre}.`,
        });
        switch (usuario.rol) {
          case "Estudiante":
            navigate("/app/estudiante", {
              replace: true,
              state: { user: usuario },
            });
            break;
          case "Docente":
            navigate("/app/docente", {
              replace: true,
              state: { user: usuario },
            });
            break;
          case "Administrador":
            navigate("/app/admin", { replace: true, state: { user: usuario } });
            break;
          default:
            localStorage.removeItem("authUser");
            localStorage.removeItem("token");
            sileo.error({
              title: "Rol no válido",
              description: "El servidor devolvió un rol que no está permitido.",
            });
        }
        return;
      }

      sileo.error({
        title: "Error al iniciar sesión",
        description:
          "El servidor no devolvió correctamente el usuario y el token.",
      });
    } catch (error) {
      console.error("Error login:", error);
      const message =
        error.response?.data?.message || "No se pudo conectar con el servidor.";
      sileo.error({ title: "Error al iniciar sesión", description: message });
    } finally {
      setLoading(false);
    }
  };
  return {
    formData,
    showPassword,
    loading,
    handleChange,
    handleRoleChange,
    togglePasswordVisibility,
    handleSubmit,
  };
};

export default useLoginForm;
