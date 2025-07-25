import { Activity } from "lucide-react";
import { Link } from "react-router";

const Header = () => {
  return (
    <div className=" border-b-2 border-gray-700 bg-gray-950 w-full flex justify-center">
      <div className="p-2.5 flex justify-between items-center w-[90%]">
        <h1 className="text-primary-500 text-4xl flex text-center items-center gap-2 font-extrabold">
          <Activity strokeWidth={3} className="w-8 h-8 text-primary-500  " /> DevBills
        </h1>
        <div className="flex gap-4 text-white font-bold uppercase">
          <Link
            className="bg-gray-900 px-3 py-1 rounded-[4px] cursor-pointer hover:bg-gray-700 border-2 border-gray-700"
            to={"/dashboard"}
          >
            Dashboard
          </Link>
          <Link
            className="bg-gray-900 px-3 py-1 rounded-[4px] cursor-pointer hover:bg-gray-700 border-2 border-gray-700"
            to={"/transacoes"}
          >
            Transacoes
          </Link>
        </div>
        <div>thiago</div>
      </div>
    </div>
  );
};
export default Header;
