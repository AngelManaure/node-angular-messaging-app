import { useUser } from "../../context/UserContext"
import { Link } from "react-router-dom";

function ResultsPage() {
    const { results, errors } = useUser();
    return (
        <section>
          {results.map((user) => (
            <article key={user.id}>
              <h4>{user.id}</h4>
              <h3>{user.username}</h3>
              <small>{user.email}</small>
              <Link to={`/user/${user.id}`}>Ver perfil</Link>
            </article>
          ))}
        </section>
      )
}

export default ResultsPage