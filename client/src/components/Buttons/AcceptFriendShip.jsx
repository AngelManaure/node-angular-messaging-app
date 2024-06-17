import { useUser } from "../../context/UserContext"

function AcceptFriendShip({ requestId }) {
    const { acceptFriendRequest } = useUser();

    const acceptRequest = async () => {
        try {
           const res = await acceptFriendRequest(requestId)
           console.log(res);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <button onClick={acceptRequest} >Aceptar</button>
  )
}

export default AcceptFriendShip