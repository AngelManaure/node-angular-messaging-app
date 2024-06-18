import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext"
import { useAuth } from "../../context/AuthContext";
import AcceptFriendShip from "../../components/Buttons/AcceptFriendShip";

function RequestPage() {
    const { myRequest, requests, errors } = useUser();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/")
      }
    }, [isAuthenticated])


    useEffect(() => {
        const loadRequest = async () => {
            try {
                await myRequest()
            } catch (error) {
                throw new Error("Error al intentar cargar las solicitudes. Por favor, intenta de nuevo")
            }
        };
        loadRequest();
    }, [])

    return (
    <section>{requests.map((request) => (
        <article key={request.id}>
            <h4>{request.sender.username}</h4>
            <small>{request.sender.email}</small>
            <Link to={`/user/${request.senderId}`}>Ver perfil</Link>
            <AcceptFriendShip requestId={request.id} />
        </article>
    ))}</section>
  )
}

export default RequestPage