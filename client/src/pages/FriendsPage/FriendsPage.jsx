import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext"
import FriendsCard from "../../components/Cards/Friends/FriendsCard";
import { useAuth } from "../../context/AuthContext";
import ErrorsCard from "../../components/Cards/Errors/ErrorsCard";

function FriendsPage() {
  const { myFriends, userFriends, errors } = useUser();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated])

  useEffect(() => {
    const loadFriends = async () => {
        await myFriends()
    };
    loadFriends();
  }, [])

  return (
    
    <section>
            {errors && (
        <ErrorsCard errors={errors}/>
      )}
      {userFriends.map((friend) => (
      <FriendsCard key={friend.id} friend={friend}/>
    ))}</section>
  )
}

export default FriendsPage