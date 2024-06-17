import { useEffect } from "react";
import { useUser } from "../../context/UserContext";


function Inbox() {
  const { userMessages, messages, errors } = useUser();

  useEffect(() => {
    const loadMessages = async () => {
      await userMessages()
    };
    loadMessages()
  }, [])

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>
          {message.content}
        <p>{message.sender.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Inbox;
