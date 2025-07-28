import { Activity, LogOutIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { authState , signOut } = useAuth();
  const pathname = useLocation();
  const userInfo = authState.user;
  
  

  return (
    <div className=" border-b-2 border-gray-700 bg-gray-950 w-full flex justify-center">
      <div className="p-2.5 flex justify-between items-center w-full md:w-[90%]">
        <h1 className="text-primary-500 text-xl  md:text-4xl flex text-center items-center gap-0.5 md:gap-2 font-extrabold">
          <Activity strokeWidth={3} className="w-4 h-4 md:w-8 md:h-8 text-primary-500  " />
          DevBills
        </h1>
        <div className="flex justify-center items-center gap-2 text-white font-bold uppercase px-1 ">
          <NavLink
            className={`bg-primary-500/10 px-3 py-0.5 rounded-[4px] cursor-pointer hover:text-primary-500 transition-all border-2
              ${pathname.pathname === "/dashboard" ? "text-primary-500 border-primary-500" : ""}
              text-[10px] md:text-xl
              `}
            to={"/dashboard"}
          >
            Dashboard
          </NavLink>
          <NavLink
            className={`bg-primary-500/10 px-3 py-0.5 rounded-[4px] cursor-pointer hover:text-primary-500 transition-all border-2
              ${pathname.pathname === "/transacoes" ? "text-primary-500  border-primary-500" : ""}
             text-[10px]  md:text-xl`}
            to={"/transacoes"}
          >
            Transações
          </NavLink>
        </div>
        {userInfo && (
          <div className="flex items-center gap-2.5">
            <img
              style={{ backgroundImage: `url(${userInfo.photoURL})` }}
              src={`${userInfo.photoURL}`}
              alt={`${userInfo.displayName}`}
              className="w-9 h-9 bg-center bg-cover rounded-full border-2 border-primary-500 "
            />
            <div className="hidden md:flex items-center gap-2.5">
              <div className="">
                <h1 className="font-semibold">
                  Olá, <span className="text-primary-500">{userInfo.displayName}</span>
                </h1>
              </div>
              <NavLink to={"/login"}  >
                <LogOutIcon className="text-gray-600 hover:text-red-500 transition-all duration-300" />
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
