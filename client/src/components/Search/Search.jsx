import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

function Search() {
  const { handleSearchSubmit } = useUser();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    handleSearchSubmit(query);
    navigate("/results");
  };

  return (
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
  )
}

export default Search