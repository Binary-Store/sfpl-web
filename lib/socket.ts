import { io, Socket } from 'socket.io-client';
import { serverDetails } from '@/config';

let socket: Socket | null = null;

if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  
  socket = io(serverDetails.socketPath, {
    transports: ['websocket'],
    withCredentials: true,
    autoConnect: true,
    auth: {
      token: `Bearer ${token}` || "",
    },
  });
}

export default socket;