import { Routes, Route, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
    >
      ← Regresar
    </button>
  );
};

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            <BackButton />
            <h1>Aplicación privada</h1>
          </div>
        }
      />

      <Route
        path="/estudiante"
        element={
          <div>
            <BackButton />
            <h1>Área del estudiante</h1>
          </div>
        }
      />

      <Route
        path="/docente"
        element={
          <div>
            <BackButton />
            <h1>Área del docente</h1>
          </div>
        }
      />

      <Route
        path="/admin"
        element={
          <div>
            <BackButton />
            <h1>Área del administrador</h1>
          </div>
        }
      />
    </Routes>
  );
};

export default PrivateRoutes;
