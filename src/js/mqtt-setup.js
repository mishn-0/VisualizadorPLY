import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
let socket = null;
let isConnected = false;
const listeners = new Map();

export function setupWebSocket(onSensorUpdate) {
  if (socket) return;
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });

  socket.on('connect', () => {
    console.log('[WebSocket] Connected to server');
    isConnected = true;
  });

  socket.on('disconnect', () => {
    console.log('[WebSocket] Disconnected from server');
    isConnected = false;
  });

  socket.on('mqtt-message', (data) => {
    const { topic, message } = data;
    // Notificar a todos los listeners
    if (listeners.has(topic)) {
      listeners.get(topic).forEach(cb => cb(message));
    }
    // Callback global para lógica legacy
    if (onSensorUpdate) onSensorUpdate(topic, message);
  });
}

export function subscribeSensor(topic, callback) {
  if (!listeners.has(topic)) listeners.set(topic, new Set());
  listeners.get(topic).add(callback);
}

export function unsubscribeSensor(topic, callback) {
  if (listeners.has(topic)) listeners.get(topic).delete(callback);
} 