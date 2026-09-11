import { users } from "../../data/auth/users";

const loginUser = ({ rol, codigo, password }) => {
  const hasEmptyFields = [rol, codigo, password].some(
    (value) => !value || !value.trim(),
  );

  if (hasEmptyFields) {
    return {
      success: false,
      reason: "EMPTY_FIELDS",
      user: null,
    };
  }

  const usuarioEncontrado = users.find(
    (user) =>
      user.rol === rol && user.codigo === codigo && user.password === password,
  );

  if (!usuarioEncontrado) {
    return {
      success: false,
      reason: "INVALID_CREDENTIALS",
      user: null,
    };
  }

  if (usuarioEncontrado.estado !== "Activo") {
    return {
      success: false,
      reason: "INACTIVE_USER",
      user: usuarioEncontrado,
    };
  }

  return {
    success: true,
    reason: "LOGIN_SUCCESS",
    user: usuarioEncontrado,
  };
};

export default loginUser;
