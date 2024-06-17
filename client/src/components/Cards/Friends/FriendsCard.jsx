import { Link } from "react-router-dom";

function FriendsCard({ friend }) {
  return (
    <article>
    {friend.user2.username}
  <p>{friend.user2.email}</p>
  <Link to={`/inbox/chat/${friend.user2.id}`}>Enviar mensaje</Link>
  </article>
  )
}

export default FriendsCard