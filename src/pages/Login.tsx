import { useEffect } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { Activity } from "lucide-react";
import { toast } from "react-toastify";

// import FacebookloginButton from "../components/FacebookloginButton";

const Login = () => {
  const navigate = useNavigate();

  const { signWithGoogle, authState } = useAuth();

 

  const handleLogin = async () => {
    try {
      await signWithGoogle();
      toast.success("Login realizado com sucesso");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao fazer login , verifique os dados e tente novamente");
    }
  };

  useEffect(() => {
    if (authState.user && !authState.loading) {
      navigate("/dashboard");
    }
  }, [authState.user, authState.loading, navigate]);

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center py-12 px-4 text-center sm:px-6 lg:px-8">
      <header className="padding-6 mb-15">
        <h1 className="font-bold text-green-500 text-7xl flex items-center justify-center gap-2">
          <Activity strokeWidth={3} className="w-14 h-14 text-primary-500 " />
          DevBills
        </h1>
        <p className="text-gray-300 mt-1 md:text-3xl ">
          Gerencie suas finançãs de forma simples e eficiente
        </p>
      </header>
      <div className=" bg-gray-900 text-center py-20 px-4 border border-gray-700 rounded-2xl max-w-4xl w-full ">
        <main className="flex flex-col justify-center items-center">
          <section className="mb-3">
            <h2 className="text-white font-bold text-3xl md:text-4xl m-5 ">
              Faça Login para continuar
            </h2>
            <p className="text-gray-300">
              Acesse sua conta para começar a gerenciar suas finançãs
            </p>
          </section>
          <div className=" justify-center items-center flex flex-col sm:flex-row  gap-4 w-full  mx-auto">
            <GoogleLoginButton isloading={false} onClick={handleLogin} />
            {/* <FacebookloginButton
              isloading={false}
              onClick={handleFacebookLogin}
            /> */}
            {/* <MicrosoftloginButton isloading={false} onClick={handleLogin} /> */}
          </div>
          {authState.error && (
            <div className="bg-red-50 text-xl text-red-700 text-center rounded-xl mt-4 px-7 py-2">
              <p>{authState.error} Erro no servidor</p>
            </div>
          )}
          <footer className="justify-center items-center mt-10">
            <p className="text-gray-400">
              Ao fazer login, você concorda com nossos termos de uso e política
              de privacidade
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
