import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext"
import { useAuth } from "../../context/AuthContext";
import ResultsCard from "../../components/Cards/Results/ResultsCard";
import ErrorsCard from "../../components/Cards/Errors/ErrorsCard"

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
                {errors && (
        <ErrorsCard errors={errors}/>
      )}
          {results.map((user) => (
            <ResultsCard key={user.id} user={user}/>
          ))}
        </section>
      )
}

export default ResultsPage