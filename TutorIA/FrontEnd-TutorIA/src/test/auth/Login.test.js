import { describe, it, expect } from "vitest";
import loginUser from "../../components/auth/loginUser";

describe("Login - lógica de autenticación", () => {
  it("debe permitir iniciar sesión a un estudiante activo", () => {
    const result = loginUser({
      rol: "Estudiante",
      codigo: "EST-2026-001",
      password: "123456",
    });

    expect(result.success).toBe(true);
    expect(result.reason).toBe("LOGIN_SUCCESS");
    expect(result.user).not.toBeNull();
    expect(result.user.nombre).toBe("Jesus Rivera");

    console.log("✓ Estudiante logueado correctamente");
  });

  it("debe permitir iniciar sesión a un docente activo", () => {
    const result = loginUser({
      rol: "Docente",
      codigo: "DOC-2026-001",
      password: "123456",
    });

    expect(result.success).toBe(true);
    expect(result.reason).toBe("LOGIN_SUCCESS");
    expect(result.user).not.toBeNull();
    expect(result.user.nombre).toBe("Renzo Barturen");

    console.log("✓ Docente logueado correctamente");
  });

  it("debe permitir iniciar sesión a un administrador activo", () => {
    const result = loginUser({
      rol: "Administrador",
      codigo: "ADM-2026-001",
      password: "123456",
    });

    expect(result.success).toBe(true);
    expect(result.reason).toBe("LOGIN_SUCCESS");
    expect(result.user).not.toBeNull();
    expect(result.user.nombre).toBe("Alonso Quispe");

    console.log("✓ Administrador logueado correctamente");
  });

  it("debe rechazar credenciales incorrectas", () => {
    const result = loginUser({
      rol: "Estudiante",
      codigo: "EST-2026-001",
      password: "password-incorrecto",
    });

    expect(result.success).toBe(false);
    expect(result.reason).toBe("INVALID_CREDENTIALS");
    expect(result.user).toBeNull();

    console.log("✓ Credenciales incorrectas rechazadas correctamente");
  });

  it("debe rechazar un código de usuario inexistente", () => {
    const result = loginUser({
      rol: "Estudiante",
      codigo: "EST-9999-999",
      password: "123456",
    });

    expect(result.success).toBe(false);
    expect(result.reason).toBe("INVALID_CREDENTIALS");
    expect(result.user).toBeNull();

    console.log("✓ Usuario inexistente rechazado correctamente");
  });

  it("debe rechazar un usuario inactivo", () => {
    const result = loginUser({
      rol: "Estudiante",
      codigo: "EST-2026-003",
      password: "123456",
    });

    expect(result.success).toBe(false);
    expect(result.reason).toBe("INACTIVE_USER");
    expect(result.user).not.toBeNull();
    expect(result.user.nombre).toBe("Carlos Pérez");

    console.log("✓ Usuario inactivo rechazado correctamente");
  });

  it("debe rechazar credenciales cuando el rol no corresponde", () => {
    const result = loginUser({
      rol: "Docente",
      codigo: "EST-2026-001",
      password: "123456",
    });

    expect(result.success).toBe(false);
    expect(result.reason).toBe("INVALID_CREDENTIALS");
    expect(result.user).toBeNull();

    console.log("✓ Rol incorrecto rechazado correctamente");
  });

  it("debe rechazar el login cuando faltan campos", () => {
    const result = loginUser({
      rol: "Estudiante",
      codigo: "",
      password: "",
    });

    expect(result.success).toBe(false);
    expect(result.reason).toBe("EMPTY_FIELDS");
    expect(result.user).toBeNull();

    console.log("✓ Campos vacíos rechazados correctamente");
  });

  it("debe rechazar el login cuando falta la contraseña", () => {
    const result = loginUser({
      rol: "Estudiante",
      codigo: "EST-2026-001",
      password: "",
    });

    expect(result.success).toBe(false);
    expect(result.reason).toBe("EMPTY_FIELDS");
    expect(result.user).toBeNull();

    console.log("✓ Contraseña vacía rechazada correctamente");
  });

  it("debe rechazar el login cuando falta el código", () => {
    const result = loginUser({
      rol: "Estudiante",
      codigo: "",
      password: "123456",
    });

    expect(result.success).toBe(false);
    expect(result.reason).toBe("EMPTY_FIELDS");
    expect(result.user).toBeNull();

    console.log("✓ Código vacío rechazado correctamente");
  });
});
