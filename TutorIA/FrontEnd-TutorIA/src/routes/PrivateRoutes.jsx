import { Routes, Route } from "react-router-dom";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Aplicación privada</div>} />
    </Routes>
  );
};

export default PrivateRoutes;
