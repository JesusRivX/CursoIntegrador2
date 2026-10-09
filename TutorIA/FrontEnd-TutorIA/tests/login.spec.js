import { test, expect } from "@playwright/test";

// Simula la respuesta del backend.
async function simularLogin(page) {
  await page.route("http://localhost:8000/api/login", async (route) => {
    const request = route.request();

    if (request.method() !== "POST") {
      await route.continue();
      return;
    }

    const datos = request.postDataJSON();

    const credencialesCorrectas =
      datos.codigo === "EST-2026-001" &&
      datos.password === "123456" &&
      datos.rol === "Estudiante";

    if (credencialesCorrectas) {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          usuario: {
            id: 1,
            codigo: "EST-2026-001",
            nombre: "Estudiante de Prueba",
            rol: "Estudiante",
            activo: true,
            estado: "Activo",
          },
          token: "token-falso-playwright",
        }),
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Credenciales incorrectas",
        }),
      });
    }
  });
}

test.describe("Login - TutorIA", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  // 1. Visualización inicial del formulario
  test("debe mostrar el formulario de inicio de sesión", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Bienvenido de nuevo" }),
    ).toBeVisible();

    await expect(page.getByLabel("Código de usuario")).toBeVisible();

    await expect(
      page.getByRole("textbox", { name: "Contraseña" }),
    ).toBeVisible();

    await expect(page.getByRole("button", { name: "Entrar" })).toBeVisible();
  });

  // 2. Login correcto como estudiante
  test("debe iniciar sesión y entrar al dashboard de estudiante", async ({
    page,
  }) => {
    await simularLogin(page);

    await page.getByLabel("Código de usuario").fill("EST-2026-001");
    await page.getByRole("textbox", { name: "Contraseña" }).fill("123456");

    await page
      .getByRole("button", {
        name: "Entrar",
      })
      .click();

    await expect(page).toHaveURL(/\/app\/estudiante\/?$/);
  });

  // 3. Contraseña incorrecta
  test("no debe permitir ingresar con contraseña incorrecta", async ({
    page,
  }) => {
    await simularLogin(page);

    await page.getByLabel("Código de usuario").fill("EST-2026-001");
    await page.getByRole("textbox", { name: "Contraseña" }).fill("incorrecta");

    await page
      .getByRole("button", {
        name: "Entrar",
      })
      .click();

    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("heading", { name: "Bienvenido de nuevo" }),
    ).toBeVisible();
  });

  // 4. Credenciales de estudiante, pero seleccionando otro rol (Docente)
  test("no debe permitir ingresar con un rol incorrecto", async ({ page }) => {
    await simularLogin(page);

    await page
      .getByRole("button", {
        name: "Docente",
        exact: true,
      })
      .click();

    await page.getByLabel("Código de usuario").fill("EST-2026-001");
    await page.getByRole("textbox", { name: "Contraseña" }).fill("123456");

    await page
      .getByRole("button", {
        name: "Entrar",
      })
      .click();

    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("heading", { name: "Bienvenido de nuevo" }),
    ).toBeVisible();
  });

  // 5. Código de usuario incorrecto
  test("no debe permitir ingresar con código de usuario incorrecto", async ({
    page,
  }) => {
    await simularLogin(page);

    await page.getByLabel("Código de usuario").fill("EST-INCORRECTO");
    await page.getByRole("textbox", { name: "Contraseña" }).fill("123456");

    await page
      .getByRole("button", {
        name: "Entrar",
      })
      .click();

    await expect(page).toHaveURL(/\/$/);
    await expect(
      page.getByRole("heading", { name: "Bienvenido de nuevo" }),
    ).toBeVisible();
  });
});
