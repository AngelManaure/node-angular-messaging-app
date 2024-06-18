import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext"
import { useAuth } from "../../context/AuthContext";
import FriendShip from "../../components/Buttons/FriendShip";

function PerfilPage() {
    const { isFriendSearch, userRequest, errors } = useUser();
    const { isAuthenticated } = useAuth();
    const [oneUser, setOneUser] = useState({});

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/")
      }
    }, [isAuthenticated])

    useEffect(() => {
        const loadUser = async () => {
            try {
                const res = await userRequest(params.id)
                await isFriendSearch(params.id)
                if (!res) {
                    throw new Error("Ocurrió un error al renderizar el usuario")
                } else {
                    setOneUser(res);
                }
            } catch (error) {
                return error.message;
            }
        };
        loadUser();
    }, [])

    const goBack = () => {
        navigate(-1)
    }

  return (
    <div>
        <button onClick={goBack}>Volver</button>
        <h2>{oneUser.username}</h2>
        <small>{oneUser.email}</small>
        <p>{oneUser.description}</p>
        <FriendShip id={oneUser.id}/>
    </div>
  )
}

export default PerfilPage