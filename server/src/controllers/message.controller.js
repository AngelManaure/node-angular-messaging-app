import prisma from "../db.js";

export const messageNotification = async (req, res) => {
    try {
        const notification = await prisma.message.findMany({
            where: {
                receiverId: req.user.id
            },
            include: {
                sender: {
                    select: {
                      id: true,
                      username: true,
                      email: true,
                    },
                }
            }
        });
        if (!notification) {
            return res.status(404).json({ message: "Error, no se encontraron notificaciones" })
        } else {
            res.status(200).json(notification)
        }
    } catch (error) {
        res.status(400).json(error);
    }
};

export const messageIn = async (req, res) => {
        const senderId = parseInt(req.params.id)
    try {
        const receivedMessages = await prisma.message.findMany({
            where: {
                senderId: senderId,
                receiverId: req.user.id
            }
        });
        const sentMessages = await prisma.message.findMany({
            where: {
                senderId: req.user.id,
                receiverId: senderId
            }
        });

        const messages = [
            ...receivedMessages.map(message => ({ ...message, type: 'recibido' })),
            ...sentMessages.map(message => ({ ...message, type: 'enviado' }))
        ];

        if (!messages.length === 0) {
            return res.status(404).json({ message: "No messages found" });
        } else {
            res.status(200).json(messages);
        }

    } catch (error) {
        res.status(400).json(error);
    }
};

export const sendMessage = async (req, res) => {
    const { content } = req.body;
    const senderId = req.user.id;
    const receiverId = parseInt(req.params.id); 
    try {
        if (!content) {
            return res.status(400).json({ message: "No es posible enviar un mensaje vacío" })
        } else {
            const messageSended = await prisma.message.create({
                data: {
                    senderId: senderId,
                    receiverId: receiverId,
                    content: content,
                }
            });
            res.status(200).json(messageSended)
        }
    } catch (error) {
        console.log(error);
        // res.status(400).json(error);
    }
};