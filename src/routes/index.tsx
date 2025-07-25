import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ErrorPages from "../pages/ErrorPages";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoutes from "./PrivateRoutes";
import Applayout from "../layout/AppLayout";
import Dashboard from "../pages/Dashbord";
import Transactions from "../pages/Transactions";
import TransactionsForms from "../pages/TransactionsForms";
import { ToastContainer, type ToastContainerProps, Bounce } from "react-toastify";

const AppRoutes = () => {
  const toastConfig: ToastContainerProps = {
    position: "top-right", // posiçao a onde vai aparecer
    autoClose: 3000, // tempo que vai mostrar na tela
    hideProgressBar: false, // se vai esconder/aparecer barra de progresso
    newestOnTop: true, // se tiver mais de um popa
    closeOnClick: true, // fechar ao clicar
    pauseOnHover: true, // para com mause em cima
    pauseOnFocusLoss: true,
    draggable: true, // pode ser arrastado ao clicar
    transition: Bounce,
    theme: "dark",
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoutes />}>
            <Route element={<Applayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transacoes" element={<Transactions />} />
              <Route path="/transacoes/nova" element={<TransactionsForms />} />
            </Route>
          </Route>

          <Route path="*" element={<ErrorPages />} />
        </Routes>
        <ToastContainer {...toastConfig} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
