import prisma from "../db.js";

export const getFriends = async (req, res) => {
        const userId = req.user.id;
        try {
          const friends = await prisma.friendship.findMany({
            where: {
              userId1: Number(userId),
            },
            include: {
              user2: {
                select: {
                  id: true,
                  username: true,
                  email: true,
                },
              },
            },
          });
          res.status(200).json(friends);
        } catch (error) {
            res.status(400).json(error);
        }
}

export const friendRequest = async (req, res) => {
  const senderId = req.user.id;
  const receiverId = req.params.id;
  try {
    const friendshipRequest = await prisma.friendshipRequest.create({
      data: {
        senderId: senderId,
        receiverId: Number(receiverId),
      },
    });
    res.status(200).json(friendshipRequest);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const friendRequestRecived = async (req, res) => {
  const receiverId = req.user.id;

  try {
    const receivedRequests = await prisma.friendshipRequest.findMany({
      where: {
        receiverId: receiverId,
      },
      include: {
        sender: {
          select: {
            id: true,
            username: true,
            description: true,
            email: true,
          },
        },
      },
    });

    res.status(200).json(receivedRequests);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const friendRequestSents = async (req, res) => {
    const senderId = req.user.id;
    try {
      const sentRequests = await prisma.friendshipRequest.findMany({
        where: {
          senderId: senderId,
        },
        include: {
          receiver: {
            select: {
              id: true,
              username: true,
              description: true,
              email: true,
            },
          },
        },
      })
      res.status(200).json(sentRequests);
  } catch (error) {
    res.status(400).json(error);
  }
}

export const acceptFriendRequest = async (req, res) => {
    const receiverId = req.user.id;
    const requestId = parseInt(req.params.id)

    try {
    const friendshipRequest = await prisma.friendshipRequest.findUnique({
        where: {
          id: requestId,
        },
      });
  
      if (!friendshipRequest) {
        return res.status(404).send('Solicitud de amistad no encontrada');
      }
  
      if (friendshipRequest.receiverId !== receiverId) {
        return res.status(403).send('Esta solicitud de amistad no correspone a este usuario');
      }
  
      await prisma.friendship.create({
        data: {
          userId1: friendshipRequest.senderId,
          userId2: friendshipRequest.receiverId,
        },
      });
  
      await prisma.friendship.create({
        data: {
          userId1: friendshipRequest.receiverId,
          userId2: friendshipRequest.senderId,
        },
      });
  
      await prisma.friendshipRequest.delete({
        where: {
          id: requestId,
        },
      });    
      res.status(200).send('Solicitud de amistad aceptada');
    } catch (error) {
        res.status(400).json(error);
    }
}

export const denigFriendRequest = async (req, res) => {
    const receiverId = req.user.id;
    const requestId = parseInt(req.params.id);

    try {
        const friendshipRequest = await prisma.friendshipRequest.findUnique({
          where: {
            id: requestId,
          },
        });
    
        if (!friendshipRequest) {
          return res.status(404).send('Solicitud de amistad no encontrada');
        }
    
        if (friendshipRequest.receiverId !== receiverId) {
          return res.status(403).send('Esta solicitud de amistad no corresponde a este usuario');
        }
    
        await prisma.friendshipRequest.delete({
          where: {
            id: requestId,
          },
        });
    
        res.status(200).send('Solicitud de amistad rechazada');
      } catch (error) {
        res.status(400).json(error);
      }
    
}