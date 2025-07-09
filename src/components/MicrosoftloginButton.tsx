import Button from "./Button";

interface MicrosoftloginProps {
  isloading: boolean;
  onClick: () => void;
}

const MicrosoftloginButton = ({ isloading, onClick }: MicrosoftloginProps) => {
  return (
    <Button
      isLoanding={isloading}
      onClick={onClick}
      fullWidth
      className="flex items-center justify-center "
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 mr-2"
        viewBox="0 0 48 48"
        fill="none"
      >
        <title>Microsoft logo</title>
        <rect x="17" y="17" width="10" height="10" fill="#FEBA08" />
        <rect x="5" y="17" width="10" height="10" fill="#05A6F0" />
        <rect x="17" y="5" width="10" height="10" fill="#80BC06" />
        <rect x="5" y="5" width="10" height="10" fill="#F25325" />
      </svg>
      Entrar com o Microsoft
    </Button>
  );
};

export default MicrosoftloginButton;
