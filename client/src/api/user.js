import axios from "./axios";

export const searchUsers = (query) => axios.get('/users', {
    params: { q: query },
  });

export const getUserRequest = (id) => axios.get(`/users/${id}`)

export const updateUserRequest = (data) => axios.post("/update-user-request", data)

export const userMessagesRequest = () => axios.get(`/message/notification`);

export const messagesInRequest = (id) => axios.get(`/message-in/${id}`)

export const sendMessageRequest = (id, content) => axios.post(`/message-to/${id}`, content)

export const userFriendsRequest = () => axios.get("/friends")

export const isUserFriendRequest = (id) => axios.get(`/is-friend/${id}`)

export const viewFriendRequest = (id) => axios.get(`/friendship-requests/sent/${id}`)

export const viewMyFriendRequest = () => axios.get("/friendship-requests/received")

export const friendShipRequest = (id) => axios.post(`/friend-request/${id}`)

export const deleteFriendShipRequest = (id) => axios.delete(`/friend-request/delete/${id}`)

export const acceptFriendShipRequest = (id) => axios.post(`/friendship-requests/accept/${id}`)

export const denigFriendShipRequest = (id) => axios.delete(`/friendship-requests/${id}/reject`)

export const deleteFriendRequest = (id) => axios.delete(`/friends/delete/${id}`)