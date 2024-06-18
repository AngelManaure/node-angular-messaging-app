import { useParams } from "react-router-dom";
import { useUser } from "../../../context/UserContext"
import { useForm } from "react-hook-form";

function SendMessageCard({ setMessages }) {
    const params = useParams();
    const { sendMessageTo } = useUser();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm()

      const onSubmit = handleSubmit(async (content) => {
        // const { content } = data; // Desestructurar el contenido del mensaje
        try {
            const res = await sendMessageTo(params.id, content);
            const newMessage = res.data;
            setMessages(prevMessages => [...prevMessages, { ...newMessage, type: 'enviado' }]);
            reset(); // Resetear el formulario después de enviar el mensaje
        } catch (error) {
            throw new Error("Error al intentar enviar el mensaje. Por favor, intenta de nuevo")
        }
    });

  return (
    <form onSubmit={onSubmit}>
    <textarea 
        id="content"
        {...register("content", { required: true })} 
    ></textarea>
    {errors.content && <span>El contenido es obligatorio</span>}
    <button type="submit">Enviar</button>
</form>
  )
}

export default SendMessageCard