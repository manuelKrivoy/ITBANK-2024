import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <a href="#" className="terminos">
          Términos y Condiciones
        </a>
        <div className="icon-links">
          <a href="https://www.instagram.com/itbauniversidad/" target="_blank">
            <img src="/instagram-logo.png" alt="instagram" className="icons" />
          </a>
          <a href="https://www.facebook.com/itbauniversidad/" target="_blank">
            <img src="/facebook-logo.png" alt="facebook" className="icons" />
          </a>
          <a href="https://twitter.com/ITBA" target="_blank">
            <img src="/x-logo.png" alt="twitter" className="icons" />
          </a>
          <a href="https://www.linkedin.com/school/itba/" target="_blank">
            <img src="/linkedin-logo.png" alt="linkedin" className="icons" />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
