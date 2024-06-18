import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import Search from "../Search/Search";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { requests, errors } = useUser();



  const onClick = () => {
      logout();
  };

  return (
    <>
      <header>
        {isAuthenticated === false ? (
          <div>
            <Link to={"/"}>Logo</Link>
            <Link to={"/register"}>Registrarse</Link>
            <Link to={"/login"}>Iniciar sesión</Link>
          </div>
        ) : (
            <header>
              <Link to={"/inbox"}>Chats</Link>
            <Search />
            <button onClick={onClick}>Cerrar sesión</button>
            <span>Solicitudes:{requests.length} <Link to={"/friend-request"}>ver</Link></span>
            <Link to={"/friends"}>Amigos</Link>
            </header>
        )}
      </header>
    </>
  );
}

export default Navbar;
