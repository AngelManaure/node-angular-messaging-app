import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { handleSearchSubmit, requests, errors } = useUser();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSearchSubmit(query);
    navigate("/results");
  };

  const onClick = () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
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
              <Link to={"/inbox"}>Mensajes</Link>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                className="searchInput"
                value={query}
                id="search=input"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar..."
              />
              <button className="searchButton">Buscar</button>
            </form>
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
