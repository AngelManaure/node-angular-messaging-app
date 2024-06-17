import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import ChatCard from "../../components/Cards/Messages/ChatCard";
import { useState } from "react";


function Inbox() {
  const { userMessages, messages, errors } = useUser();
    const [uniqueChats, setUniqueChats] = useState([]);

  useEffect(() => {
    const loadMessages = async () => {
      await userMessages()
      filterUniqueChats();
    };
    loadMessages()
  }, [])

  const filterUniqueChats = () => {
    const uniqueMessages = {};
    messages.forEach((message) => {
      const userId = message.senderId === message.receiverId ? message.senderId : message.receiverId;
        if (!uniqueMessages[userId]) {
            uniqueMessages[userId] = message;
        }
    });
    setUniqueChats(Object.values(uniqueMessages));
};

  return (
    <section>
            {uniqueChats.map((message) => (
                <ChatCard key={message.id} message={message}/>
            ))}
    </section>
  );
}

export default Inbox;
