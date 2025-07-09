import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ErrorPages from "../pages/ErrorPages";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import Applayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashbord";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<Applayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<ErrorPages />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
