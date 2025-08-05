import { Activity, LogIn, LogOutIcon, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useState } from "react";

interface Navlink {
  name: string;
  path: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { authState, signOut } = useAuth();
  const { pathname } = useLocation();
  const isAuthenticated: boolean = !!authState.user;

  const navlink: Navlink[] = [
    { name: "Dashbord", path: "/dashboard" },
    { name: "Transações", path: "/transacoes" },
  ];

  const renderAvatar = () => {
    if (!authState.user) return null;

    if (authState.user.photoURL) {
      return (
        <img
          src={authState.user?.photoURL}
          alt={`Foto do perfil do(a)${authState.user?.displayName}`}
          className="w-9 h-9 bg-center bg-cover rounded-full border-2 border-primary-500 "
        />
      );
    }
    return (
      <div className="w-9 h-9 bg-gray-700 text-primary-500 rounded-full flex items-center justify-center border-2 border-primary-500 ">
        {authState.user.displayName?.charAt(0)}
      </div>
    );
  };

  const handlerSignOut = async () => {
    setIsOpen(isOpen);
    try {
      await signOut();
      toast.success("Saída realizada com sucesso");
    } catch (error) {
      console.error("Falha ao deslogar", error);
      toast.error("Falha ao deslogar");
    } finally {
      toast.done("Voçe sera redirecinado para login");
    }
  };

  const ChangeMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className=" border-b border-gray-700 bg-[#000000] w-full flex justify-center">
        <div className="p-2.5 flex justify-between items-center w-full container-app">
          <Link
            to={"/"}
            className="text-primary-500 text-xl  md:text-4xl flex text-center items-center gap-0.5 md:gap-2 font-extrabold"
          >
            <Activity
              strokeWidth={3}
              className="w-4 h-4 md:w-8 md:h-8 text-primary-500  "
            />
            DevBills
          </Link>
          {isAuthenticated && (
            <nav className="hidden md:flex space-x-3 font-bold text-2xl transition-all duration-300">
              {navlink.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={` py-1 px-2 border rounded-sm transition-all duration-300 ${
                    pathname === link.path
                      ? "text-primary-500 bg-primary-500/20 border-primary-500/20  "
                      : "bg-[#0e1615] text-gray-400 border-gray-700 hover:text-primary-500 "
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          )}
          <div className="hidden md:flex items-center justify-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {renderAvatar()}
                  <span className="text-primary-500 font-bold">
                    {authState.user?.displayName}
                  </span>
                  <button type="button" onClick={handlerSignOut}>
                    <LogOutIcon className=" text-gray-400 hover:text-red-600 transition-all duration-300 cursor-pointer" />
                  </button>
                </div>
              </div>
            ) : (
              <button type="button">
                <Link to={"/login"}>
                  <LogIn className=" text-gray-300 hover:text-primary-500 transition-all duration-300 cursor-pointer" />
                </Link>
              </button>
            )}
          </div>
          {/* botão mobile  */}
          <div className="md:hidden flex  items-center">
            <button
              type="button"
              onClick={ChangeMenu}
              className="text-primary-500 p-2 rounded-lg hover:bg-primary-500/20 transition-all duration-200 "
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div>
          <div>
            {isAuthenticated ? (
              <div className="flex flex-col gap-3 py-3 items-center justify-center  font-bold">
                <nav className="flex  items-center space-x-2  ">
                  {navlink.map((link) => (
                    <Link
                      to={link.path}
                      key={link.path}
                      className={`block text-2xl border py-1 px-3 rounded-sm duration-300  ${
                        pathname === link.path
                          ? "text-primary-500 bg-primary-500/20  border-primary-500/10"
                          : "text-gray-400 bg-gray-800  border-gray-700"
                      } `}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex space-x-3 items-center justify-between text-primary-500">
                  <div className="flex gap-2 items-center">
                    {renderAvatar()}
                    <span>{authState.user?.displayName}</span>
                  </div>

                  <button type="button" onClick={handlerSignOut}>
                    <LogOutIcon
                      className="text-gray-400
                   hover:text-red-500 transition-colors duration-300"
                    />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <button type="button">
                  <Link
                    className="text-gray-400
                   hover:text-red-500 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                    to={"/login"}
                  >
                    Entrar
                  </Link>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
