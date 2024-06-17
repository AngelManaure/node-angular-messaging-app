import { Link } from "react-router-dom";

function ResultsCard({ user }) {
  return (
    <article>
    <h4>{user.id}</h4>
    <h3>{user.username}</h3>
    <small>{user.email}</small>
    <Link to={`/user/${user.id}`}>Ver perfil</Link>
  </article>
  )
}

export default ResultsCard