function MessagesCard({ message }) {
  return (
    <li
    className={message.type === 'enviado' ? 'userMessages' : 'resMessages'}
  >
    {message.content} ({message.type})
  </li>
  )
}

export default MessagesCard