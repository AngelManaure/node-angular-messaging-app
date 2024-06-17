import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";

function FriendShip({ id }) {
  const { viewFriendsNotification, addFriend, removeFriendRequest, isRequested, setIsRequested, isFriend } = useUser();
  const params = useParams();



  const addFriendRequest = async () => {
    await addFriend(id);
    setIsRequested(true)
  };

  const removeRequest = async () => {
    await removeFriendRequest(id);
    setIsRequested(false)
  };

  useEffect(() => {
     viewFriendsNotification(params.id);
     console.log(isRequested);
  }, []);

  return (
    <div>
      {isFriend === false ? (
        isRequested == false ? (
          <button onClick={addFriendRequest}>Enviar solicitud de amistad</button>
        ) : (
          <button onClick={removeRequest}>Cancelar solicitud de amistad</button>
      )
      ) : (
        <button>Amigo</button>
      )}

    </div>
  );
}

export default FriendShip;
