import { useState } from "react";

import './FriendsOptions.css'
import { useUser } from "../../../context/UserContext";
import { useParams, useNavigate, Link } from "react-router-dom";

function FriendsOptions() {
  const { deleteFriend } = useUser();
  const [optionActive, setOptionActive] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const deleteOneFriend = () => {
     deleteFriend(params.id)
     navigate(-1)
  }

  const activeOption = () => {
    optionActive == false ? setOptionActive(true) : setOptionActive(false);
  };

  return (
    <>
      <button
        onClick={activeOption}

      >
        ...
      </button>

        <div 
        className={optionActive == false ? `closeFriendOptions` : `openFriendOptions`}>
            <button onClick={deleteOneFriend}>Eliminar</button>
            <Link to={`/inbox/chat/${params.id}`}>Enviar mensaje</Link>
        </div>

    </>
  );
}

export default FriendsOptions;
