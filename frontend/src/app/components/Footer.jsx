import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full text-center p-4 mt-2 ">
      <p>
        Necesitas ayuda? &nbsp;
        <Link href="/contacto" target="_blank" prefetch={true} className="text-blue-500 ">
          Contactate con nosotros
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
