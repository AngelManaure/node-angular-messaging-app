import { Link } from "react-router-dom";

function ChatCard({ message }) {
  return (
    <article>
  <p>{message.sender.username}</p>
  <Link to={`/inbox/chat/${message.sender.id}`}>Abrir chat</Link>
  </article>
  )
}

export default ChatCard