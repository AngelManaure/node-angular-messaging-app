import { createContext, useContext, useState } from "react";

// import { useAuth } from './AuthContext'

import {
  searchUsers,
  getUserRequest,
  userMessagesRequest,
  messagesInRequest,
  sendMessageRequest,
  userFriendsRequest,
  isUserFriendRequest,
  friendShipRequest,
  deleteFriendShipRequest,
  viewFriendRequest,
  viewMyFriendRequest,
  acceptFriendShipRequest,
  denigFriendShipRequest,
  deleteFriendRequest,
} from "../api/user";

export const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser debería estar dentro de un UserProvider");
  } else {
    return context;
  }
};

export const UserProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);
  const [results, setResults] = useState([]);
  const [messages, setMessages] = useState([])
  const [isRequested, setIsRequested] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [requests, setRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  //buscador
  const handleSearchSubmit = async (query) => {
    try {
      const response = await searchUsers(query);
      setResults(response.data);
      setErrors([]); // Limpiar errores si la búsqueda es exitosa
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al realizar la búsqueda. Por favor, intenta de nuevo.']);
    }
  };

  const userRequest = async (id) => {
    try {
      const res = await getUserRequest(id);
      setErrors([]); // Limpiar errores si la búsqueda es exitosa
      return res.data;
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al buscar al usuario. Por favor, intenta de nuevo.']);
    }
  };

  const userMessages = async () => {
    try {
        const res = await userMessagesRequest()
        setMessages(res.data)
        setErrors([]); // Limpiar errores si la búsqueda es exitosa
        return res
      } catch (error) {
        setErrors(prevErrors => [...prevErrors, 'Error al buscar los mensajes. Por favor, intenta de nuevo.']);
      }
  }

  const addFriend = async (id) => {
    try {
        await friendShipRequest(id)
        setErrors([]); // Limpiar errores si la búsqueda es exitosa
      } catch (error) {
        setErrors(prevErrors => [...prevErrors, 'Error al intentar enviar la solicitud. Por favor, intenta de nuevo.']);
      }
  }

  const removeFriendRequest = async (id, requestId) => {
    try {
        await deleteFriendShipRequest(id, requestId)
        setErrors([]); // Limpiar errores si la búsqueda es exitosa
      } catch (error) {
        setErrors(prevErrors => [...prevErrors, 'Error al cancelar la solicitud. Por favor, intenta de nuevo.']);
      }
  }

  const viewFriendsNotification = async (receiverId) => {
    try {
        const res = await viewFriendRequest(receiverId);
        if (res.data.message === 'no esta') {
            setIsRequested(false)
        } if (res.data.message === 'si esta') {
            setIsRequested(true)
        }
        setErrors([]); // Limpiar errores si la búsqueda es exitosa
      } catch (error) {
        setErrors(prevErrors => [...prevErrors, 'Error al buscar las notificaciones. Por favor, intenta de nuevo.']);
      }
  }

  const acceptFriendRequest = async (id) => {
    try {
      await acceptFriendShipRequest(id)
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
      setErrors([]); // Limpiar errores si la búsqueda es exitosa
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al acceptar la solicitud. Por favor, intenta de nuevo.']);
    }
  }

  const denigFriendrequest = async (id) => {
    try {
      await denigFriendShipRequest(id)
      setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
      setErrors([]); // Limpiar errores si la búsqueda es exitosa
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al rechazar la solicitud. Por favor, intenta de nuevo.']);
    }
  }

  const deleteFriend = async (id) => {
    try {
      await deleteFriendRequest(id)
      setErrors([]); // Limpiar errores si la búsqueda es exitosa
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al intentar eliminar a este usuario de tus amigos. Por favor, intenta de nuevo.']);
    }
  }

  const myRequest = async () => {
    try {
      const res = await viewMyFriendRequest()
      setRequests(res.data)
      setErrors([]); // Limpiar errores si la búsqueda es exitosa
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al buscar las solicitudes. Por favor, intenta de nuevo.']);
    }
  }

  const myFriends = async () => {
    try {
      const res = await userFriendsRequest()
      setUserFriends(res.data)
      setErrors([]); // Limpiar errores si la búsqueda es exitosa
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al buscar tus amistades. Por favor, intenta de nuevo.']);
    }
  }

  const isFriendSearch = async (id) => {
    try {
      const res = await isUserFriendRequest(id)
      if (res.data.message === 'No es') {
        setIsFriend(false)
      }
      if (res.data.message === 'Si es' && res) {
        setIsFriend(true)
      }
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al buscar el usuario. Por favor, intenta de nuevo.']);
    }
  }

  const messageIn = async (id) => {
    try {
      const res = await messagesInRequest(id)
      return res;
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al buscar el chat. Por favor, intenta de nuevo.']);
    }
  }

  const sendMessageTo = async (id, content) => {
    try {
      const res = await sendMessageRequest(id, content)
      return res
    } catch (error) {
      setErrors(prevErrors => [...prevErrors, 'Error al enviar el mensaje. Por favor, intenta de nuevo.']); 
    }
  }


  return (
    <userContext.Provider
      value={{
        handleSearchSubmit,
        results,
        userRequest,
        userMessages,
        messages,
        setMessages,
        viewFriendsNotification,
        addFriend,
        removeFriendRequest,
        isRequested,
        setIsRequested,
        myRequest,
        requests,
        acceptFriendRequest,
        denigFriendrequest,
        deleteFriend,
        errors,
        myFriends,
        userFriends,
        isFriendSearch,
        isFriend,
        messageIn,
        sendMessageTo,
      }}
    >
      {children}
    </userContext.Provider>
  );
};