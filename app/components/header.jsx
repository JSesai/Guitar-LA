import { Link } from "@remix-run/react";
import Navegacion from "./navegacion";
import logo from "../../public/img/logo.svg";

function Header() {
  return (
    <header className="header">
      <div className="contenedor barra">
        <Link to="/">
          <img src={logo} alt="Logotipo" className="logo" />
        </Link>
        <Navegacion />
      </div>
    </header>
  );
}

export default Header;
