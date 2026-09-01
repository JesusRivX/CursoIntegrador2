import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sileo } from "sileo";
import { users } from "../../data/auth/users";
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rol: "estudiante",
    codigo: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    {
      id: "estudiante",
      label: "Estudiante",
      icon: GraduationCap,
    },
    {
      id: "docente",
      label: "Docente",
      icon: BookOpen,
    },
    {
      id: "admin",
      label: "Admin",
      icon: ShieldCheck,
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value.trim())) {
      sileo.error({
        title: "Campos incompletos",
        description: "Por favor, completa todos los campos para continuar.",
      });
      return;
    }

    const usuarioEncontrado = users.find(
      (user) =>
        user.rol === formData.rol &&
        user.codigo === formData.codigo &&
        user.password === formData.password,
    );

    if (!usuarioEncontrado) {
      sileo.error({
        title: "Credenciales incorrectas",
      });
      return;
    }

    sileo.success({
      title: "Login exitoso",
    });

    switch (usuarioEncontrado.rol) {
      case "estudiante":
        navigate("/app/estudiante", { state: { user: usuarioEncontrado } });
        break;

      case "docente":
        navigate("/app/docente", { state: { user: usuarioEncontrado } });
        break;

      case "admin":
        navigate("/app/admin", { state: { user: usuarioEncontrado } });
        break;

      default:
        console.log("Rol no válido");
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('../../public/fondo_login.webp')] bg-cover bg-center bg-no-repeat text-slate-800 before:absolute before:inset-0 before:bg-white/70">
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 py-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Informacion */}
          <section className="mx-auto hidden w-full max-w-xl lg:block">
            <div className="mb-8 flex items-center gap-5">
              <img
                src="/logo.png"
                alt="TutorIA"
                className="h-28 w-28 shrink-0 object-contain"
              />

              <div>
                <h1 className="text-3xl font-bold tracking-tight text-blue-600">
                  ESTUD-IA
                </h1>

                <p className="text-sm font-medium tracking-[0.2em] text-slate-400">
                  PLATAFORMA EDUCATIVA
                </p>
              </div>
            </div>

            <div className="max-w-lg">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-linear-to-r from-violet-50 to-blue-50 px-3.5 py-1.5 text-xs font-medium text-violet-600">
                <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                Aprendizaje inteligente
              </div>

              <h2 className="mb-5 text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">
                Aprende a tu ritmo,
                <span className="block font-bold text-blue-600">
                  con un tutor que te acompaña.
                </span>
              </h2>

              <p className="max-w-md text-base leading-7 text-slate-500">
                TutorIA Escolar combina aprendizaje personalizado, ejercicios y
                asistencia inteligente para ayudarte a comprender cada tema paso
                a paso.
              </p>
            </div>
          </section>

          {/* Formulario */}
          <section className="mx-auto w-full max-w-md">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60 sm:p-9">
              <div className="mb-7">
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                  Bienvenido de nuevo
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Ingresa a tu cuenta para continuar aprendiendo.
                </p>
              </div>

              <div className="mb-7">
                <div className="grid grid-cols-3 gap-2.5">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    const isSelected = formData.rol === role.id;

                    return (
                      <button
                        key={role.id}
                        type="button"
                        onClick={() => handleRoleChange(role.id)}
                        className={`flex flex-col items-center justify-center gap-1.5 rounded-xl px-2 py-3 text-xs font-medium ${
                          isSelected
                            ? "border-2 border-blue-600 bg-blue-50 text-blue-600 shadow-sm shadow-blue-100 hover:bg-blue-100"
                            : "border border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-600"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        {role.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="codigo"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Código de usuario
                  </label>

                  <input
                    id="codigo"
                    name="codigo"
                    type="text"
                    value={formData.codigo}
                    onChange={handleChange}
                    placeholder="Ej. EST-2026-001"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-700"
                  >
                    Contraseña
                  </label>

                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-600"
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 active:scale-[0.99]"
                >
                  <span>Entrar</span>
                </button>
              </form>

              <div className="mt-7 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-xs text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Tus datos están protegidos
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
