import { Activity } from "lucide-react";

const Header = () => {
  return (
    <div className="border border-b-2 border-gray-700 bg-gray-950  ">
      <div className="p-2.5">
        <h1 className="text-primary-500 text-4xl flex text-center items-center gap-2 font-extrabold">
          <Activity strokeWidth={3} className="w-8 h-8 text-primary-500  " /> DevBills
        </h1>
      </div>
    </div>
  );
};
export default Header;
