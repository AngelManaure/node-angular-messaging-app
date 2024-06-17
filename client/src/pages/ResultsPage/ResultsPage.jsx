import ResultsCard from "../../components/Cards/Results/ResultsCard";
import { useUser } from "../../context/UserContext"

function ResultsPage() {
    const { results, errors } = useUser();
    return (
        <section>
          {results.map((user) => (
            <ResultsCard key={user.id} user={user}/>
          ))}
        </section>
      )
}

export default ResultsPage