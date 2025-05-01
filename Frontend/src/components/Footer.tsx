import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t backdrop-blur py-4 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto ">
        <div className="flex items-center justify-center flex-col gap-2">
          <p className="text-gray-400">Made by Ujjwal</p>
          <FaGithub
            className="cursor-pointer"
            onClick={() =>
              window.open("https://github.com/Ujjwalb09/AuthCore", "_blank")
            }
            size={20}
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
