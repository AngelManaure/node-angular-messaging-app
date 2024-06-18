import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

import { useUser } from "../../context/UserContext"
import FriendsCard from "../../components/Cards/Friends/FriendsCard";
import { useAuth } from "../../context/AuthContext";

function FriendsPage() {
  const { myFriends, userFriends } = useUser();
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
    <section>{userFriends.map((friend) => (
      <FriendsCard key={friend.id} friend={friend}/>
    ))}</section>
  )
}

export default FriendsPage