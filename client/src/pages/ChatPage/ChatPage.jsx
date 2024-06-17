import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useParams } from "react-router-dom";
import MessagesCard from "../../components/Cards/Messages/MessagesCard";
import SendMessageCard from "../../components/Cards/Messages/SendMessageCard";

function ChatPage() {
  const { messageIn } = useUser();
  const params = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      const res = await messageIn(params.id);
      setMessages(res.data);
    };
    loadMessages();
  }, [params.id]);

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <MessagesCard key={message.id} message={message}/>
        ))}
      </ul>
      <SendMessageCard setMessages={setMessages}/>
    </div>
  );
}

export default ChatPage;
