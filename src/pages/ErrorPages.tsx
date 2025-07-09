import { Frown } from "lucide-react";

const ErrorPages = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-950">
      <Frown className="text-primary-500 font-bold " />
      <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Pagina não encontrada</h1>
      <p className="text-lg text-white mb-6">A página que você está procurando não existe.</p>
      <a href="/" className="text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
};
export default ErrorPages;
