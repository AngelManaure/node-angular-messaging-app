import { useUser } from "../../context/UserContext"

function AcceptFriendShip({ requestId }) {
    const { acceptFriendRequest, denigFriendrequest } = useUser();

    const acceptRequest = () => {
      acceptFriendRequest(requestId)
    }

    const denigRequest = () => {
      denigFriendrequest(requestId)

    }

  return (
    <>
    <button onClick={acceptRequest} >Aceptar</button>
    <button onClick={denigRequest}>Rechazar</button>
    </>
  )
}

export default AcceptFriendShip