import type { JSX } from "react";
import Button from "../components/Button";
import { CreditCard, WalletMinimal, LayoutList, TrendingUp, Activity } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

interface Feature {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Home = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  console.log({ auth });

  const features: ReadonlyArray<Feature> = [
    {
      icon: <WalletMinimal className="w-8 h-8 text-primary-500" />,
      title: "Controle Financeiro",
      description:
        "Monitore suas despesas e receitas em um só lugar, com um interface intuitiva e fácil de usar.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-500" />,
      title: "Relatórios Detalhados",
      description: "Visualize graficamente seus gastos e entenda para onde seu dinheiro está indo.",
    },
    {
      icon: <LayoutList className="w-8 h-8 text-primary-500" />,
      title: "Categorias Personalizadas",
      description:
        "Organize suas transações em categorias personalizadas para uma visão clara de suas finanças.",
    },

    {
      icon: <CreditCard className="w-8 h-8 text-primary-500" />,
      title: "Transações Ilimitadas",
      description:
        "Adicione quantas transações quiser, sem limites, para um controle total das suas finanças.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container-app">
        <section className="py-12  md:py-20 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6  ">
                Gerencie suas Finanças com o{" "}
                <span className="text-primary-500 flex text-center items-center gap-2 font-extrabold">
                  <Activity strokeWidth={3} className="w-8 h-8 text-primary-500  " /> DevBills
                </span>
              </h1>
              <p className="text-lg  text-white mb-8">
                Uma platarforma simples e eficiente para controlar suas despesas e recietas.
                Organize suas finanças pessoais ou do seu negócio com facilidade.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="text-center px-6 py-3" onClick={() => navigate("/login")}>
                  Começar Agora
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20 bg-gray-900 rounded-xl border border-gray-700">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Recurso do DevBills</h2>
              <p className="text-lg  text-white  max-w-2xl mx-auto">
                Nossa plataforma oferece tudo o que você precisa para manter suas finanças
                organizadas
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((features) => (
                <div
                  key={features.title}
                  className="bg-gray-800 p-6 rounded-xl border gap-10 border-white  hover:shadow-lg "
                >
                  <div className="mb-4 bg-primary-500/10 p-5 rounded-full inline-block">
                    {features.icon}
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2"> {features.title}</h3>
                  <p className="text-gray-400 ">{features.description} </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="  py-12 md:py-20">
          <div className=" bg-gray-900 p-8 md:p-20 rounded-xl border gap-10 border-gray-700 mt-12  text-center ">
            <h3 className="text-white text-2xl mb-2 font-bold">
              Pronto para organizar suas finanças?
            </h3>
            <p className="text-gray-400 mb-4 mt-10">
              Começe a usar o DevBills hoje mesmo e tenha um controle total sobre seu dinheiro. É
              gratuito e facíl de usar!
            </p>
            <Button className="mt-10 px-6 py-3 mx-auto" onClick={() => navigate("/login")}>
              Criar Conta Gratuita
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
