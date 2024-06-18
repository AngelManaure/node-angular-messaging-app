import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext"
import { useAuth } from "../../context/AuthContext";
import ResultsCard from "../../components/Cards/Results/ResultsCard";

function ResultsPage() {
    const { results, errors } = useUser();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/")
      }
    }, [isAuthenticated])

    return (
        <section>
          {results.map((user) => (
            <ResultsCard key={user.id} user={user}/>
          ))}
        </section>
      )
}

export default ResultsPage