import { useEffect } from "react"
import { useUser } from "../../context/UserContext"

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
      <div key={friend.id}>
        {friend.user2.username}
      <p>{friend.user2.email}</p>
      </div>
    ))}</section>
  )
}

export default FriendsPage