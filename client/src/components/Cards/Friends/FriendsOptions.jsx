import { useState } from "react";

import './FriendsOptions.css'

function FriendsOptions() {
  const [optionActive, setOptionActive] = useState(false);

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
            <span>Eliminar</span>
            <span>Enviar mensaje</span>
        </div>

    </>
  );
}

export default FriendsOptions;
