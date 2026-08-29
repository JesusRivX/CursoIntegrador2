import { Routes, Route } from "react-router-dom";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Login</div>} />
    </Routes>
  );
};

export default PublicRoutes;
