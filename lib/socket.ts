import { io } from 'socket.io-client';
import { serverDetails } from '@/config';

const token = localStorage.getItem('token');

const socket = io(serverDetails.socketPath, {
  transports: ['websocket'],
  withCredentials: true,
  autoConnect: true,
  auth: {
    token: `Bearer ${token}` || "",
  },
});


export default socket;