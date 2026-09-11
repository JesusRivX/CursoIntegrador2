import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sileo";

function App() {
  return (
    <>
      <Toaster position="top-center" theme="light" />
      <AppRoutes />
    </>
  );
}

export default App;
