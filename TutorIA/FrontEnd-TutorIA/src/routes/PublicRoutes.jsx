import { Routes, Route } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
    </Routes>
  );
};

export default PublicRoutes;
