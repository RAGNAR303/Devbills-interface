import type { JSX } from "react";
import Button from "../components/Button";
import {
  CreditCard,
  WalletMinimal,
  LayoutList,
  TrendingUp,
  Activity,
} from "lucide-react";

import { useNavigate } from "react-router";

interface Feature {
  icon: JSX.Element;
  title: string;
  subTitle: string;
  description: string;
}

const Home = () => {
  const navigate = useNavigate();

  const features: ReadonlyArray<Feature> = [
    {
      icon: <WalletMinimal className="w-8 h-8 text-primary-500" />,
      title: "Controle ",
      subTitle: "Financeiro",
      description:
        "Monitore suas despesas e receitas em um só lugar, com um interface intuitiva e fácil de usar.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary-500" />,
      title: "Relatórios ",
      subTitle: "Detalhados",
      description:
        "Visualize graficamente seus gastos e entenda para onde seu dinheiro está indo.",
    },
    {
      icon: <LayoutList className="w-8 h-8 text-primary-500" />,
      title: "Categorias ",
      subTitle: "Personalizadas",
      description:
        "Organize suas transações em categorias personalizadas para uma visão clara de suas finanças.",
    },

    {
      icon: <CreditCard className="w-8 h-8 text-primary-500" />,
      title: "Transações ",
      subTitle: "Ilimitadas",
      description:
        "Adicione quantas transações quiser, sem limites, para um controle total das suas finanças.",
    },
  ];

  return (
    <div className="min-h-screen">
      <div className="container-app">
        <section className="py-12  md:py-20 ">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold  items-center  text-white mb-6  ">
                Gerencie suas Finanças com o{" "}
                <span className="text-primary-500 flex  md:items-start gap-2 font-extrabold">
                  <Activity
                    strokeWidth={3}
                    className="w-8 h-8 md:w-10 md:h-10 items-center mt-3 text-primary-500  "
                  />{" "}
                  DevBills
                </span>
              </h1>
              <p className="text-lg md:text-3xl text-gray-400 mb-8">
                Uma platarforma simples e eficiente para controlar suas despesas
                e recietas. Organize suas finanças pessoais ou do seu negócio
                com facilidade.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 items-center md:items-start sm:space-y-0 sm:space-x-4">
                <Button
                  className="text-center px-6 py-3"
                  onClick={() => navigate("/login")}
                >
                  Começar Agora
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-20 bg-[#000000] rounded-xl border border-gray-700">
          <div className="container-app">
            <div className="text-center mb-12">
              <h2 className="text-3xl  md:text-4xl font-bold text-white mb-4">
                Recurso do DevBills
              </h2>
              <p className="text-lg md:text-2xl text-gray-400  max-w-2xl mx-auto">
                Nossa plataforma oferece tudo o que você precisa para manter
                suas finanças organizadas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((features) => (
                <div
                  key={features.title}
                  className="bg-[#0e1615] p-6 rounded-xl border gap-10 border-gray-700  hover:shadow-lg "
                >
                  <div className="mb-4 bg-primary-500/10 p-3 rounded-xl inline-block">
                    {features.icon}
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2">
                    {" "}
                    {features.title}
                    <span className="text-primary-500">
                      {features.subTitle}
                    </span>
                  </h3>
                  <p className="text-gray-400 ">{features.description} </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="  py-12 md:py-20">
          <div className="bg-[#000000] p-8 md:p-20 rounded-xl border gap-10 border-gray-700 mt-12  text-center ">
            <h3 className="text-white text-2xl md:text-4xl mb-2 font-bold">
              Pronto para organizar suas finanças?
            </h3>
            <p className="text-gray-400 mb-4 mt-10  md:text-2xl">
              Começe a usar o DevBills hoje mesmo e tenha um controle total
              sobre seu dinheiro. É gratuito e facíl de usar!
            </p>
            <Button
              className="mt-10 px-6 py-3 mx-auto"
              onClick={() => navigate("/login")}
            >
              Criar Conta Gratuita
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
