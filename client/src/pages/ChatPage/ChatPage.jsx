import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import MessagesCard from "../../components/Cards/Messages/MessagesCard";
import SendMessageCard from "../../components/Cards/Messages/SendMessageCard";
import { useAuth } from "../../context/AuthContext";
import ErrorsCard from "../../components/Cards/Errors/ErrorsCard";

function ChatPage() {
  const { messageIn, errors } = useUser();
  const { isAuthenticated } = useAuth();
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated])

  useEffect(() => {
    const loadMessages = async () => {
      const res = await messageIn(params.id);
      setMessages(res.data);
    };
    loadMessages();
  }, [params.id]);

  return (
    <div>
      {errors && (
        <ErrorsCard errors={errors}/>
      )}
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
