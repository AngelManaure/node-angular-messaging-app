import { useEffect } from "react"
import { useUser } from "../../context/UserContext"
import { Link } from "react-router-dom";
import AcceptFriendShip from "../../components/Buttons/AcceptFriendShip";

function RequestPage() {
    const { myRequest, requests, errors } = useUser();

    useEffect(() => {
        const loadRequest = async () => {
            try {
                await myRequest()
            } catch (error) {
                console.log(error);
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