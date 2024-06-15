import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const onClick = () => {
    try {
      logout()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header>
      {isAuthenticated === false ? (
        <div>
          <Link to={"/"}>Logo</Link>
          <Link to={"/register"}>Registrarse</Link>
          <Link to={"/login"}>Iniciar sesión</Link>
        </div>
      ) : (
        <div>
            <button onClick={onClick}>Cerrar sesión</button>
        </div>
      )}
    </header>
  );
}

export default Navbar;
