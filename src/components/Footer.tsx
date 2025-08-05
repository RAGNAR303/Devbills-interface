const Footer = () => {
  const correntYear = new Date().getFullYear();
  return (
    <div className="text-white flex text-center justify-center p-2.5 border-t border-gray-700   bg-[#0e1615] ">
      <p>
        DevBills © {correntYear} — Desenvolvido por -
        <strong>Thiago Gonçalves</strong>, com <strong> React </strong>&
        <strong>TypeScript</strong>
      </p>
    </div>
  );
};
export default Footer;
