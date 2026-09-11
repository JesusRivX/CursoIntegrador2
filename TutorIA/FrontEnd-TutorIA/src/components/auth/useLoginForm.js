import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import loginUser from "./loginUser";

const initialFormData = {
  rol: "Estudiante",
  codigo: "",
  password: "",
};

const useLoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (rol) => {
    setFormData((prev) => ({
      ...prev,
      rol,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = loginUser(formData);

    if (result.reason === "EMPTY_FIELDS") {
      sileo.error({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos para continuar.",
      });

      return result;
    }

    if (result.reason === "INVALID_CREDENTIALS") {
      sileo.error({
        title: "Credenciales incorrectas",
        description: "El rol, código o contraseña no son correctos.",
      });

      return result;
    }

    if (result.reason === "INACTIVE_USER") {
      sileo.error({
        title: "Usuario inactivo",
        description:
          "Tu cuenta se encuentra inactiva. Comunícate con el administrador.",
      });

      return result;
    }

    if (result.reason === "LOGIN_SUCCESS") {
      const usuarioEncontrado = result.user;

      sileo.success({
        title: "Login exitoso",
        description: `Bienvenido, ${usuarioEncontrado.nombre}.`,
      });

      switch (usuarioEncontrado.rol) {
        case "Estudiante":
          localStorage.setItem(
            "studentUser",
            JSON.stringify(usuarioEncontrado),
          );

          navigate("/app/estudiante", {
            state: {
              user: usuarioEncontrado,
            },
          });

          break;

        case "Docente":
          localStorage.setItem(
            "teacherUser",
            JSON.stringify(usuarioEncontrado),
          );

          navigate("/app/docente", {
            state: {
              user: usuarioEncontrado,
            },
          });

          break;

        case "Administrador":
          localStorage.setItem("adminUser", JSON.stringify(usuarioEncontrado));

          navigate("/app/admin", {
            state: {
              user: usuarioEncontrado,
            },
          });

          break;

        default:
          break;
      }
    }

    return result;
  };

  return {
    formData,
    showPassword,
    handleChange,
    handleRoleChange,
    togglePasswordVisibility,
    handleSubmit,
  };
};

export default useLoginForm;
