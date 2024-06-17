import { useEffect } from "react"
import { useUser } from "../../context/UserContext"
import FriendsCard from "../../components/Cards/Friends/FriendsCard";

function FriendsPage() {
  const { myFriends, userFriends } = useUser();

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