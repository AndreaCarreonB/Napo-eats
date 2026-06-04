const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// 🚏 IMPORTAR EL ENRUTADOR MAESTRO CENTRALIZADO
// Este enrutador agrupa todas tus rutas (/menu, /auth, /orders, /customers, etc.)
const appRouter = require('./routes/AppRouter'); 

const app = express();

// Configuración de CORS estricta pero abierta para tu desarrollo
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Middleware para permitir que el servidor entienda peticiones en formato JSON
app.use(express.json());

// Servidor HTTP unificado para REST + WebSockets
const server = http.createServer(app);

// Configuración de Socket.io montado sobre nuestro servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// Compartir la instancia de Socket.io en el objeto 'app' para usarla dentro de tus controladores
app.set('socketio', io);

// Evento de escucha para conexiones WebSocket
io.on('connection', (socket) => {
  console.log(`📱 Cliente conectado por WebSocket: ${socket.id}`);
  
  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado del WebSocket');
  });
});

// 🚏 CONEXIÓN DE RUTAS MAESTRAS
// Al montar appRouter sobre '/api', Express expone las URLs de manera organizada:
// 🍕 Menú dinámico:      http://localhost:4000/api/menu
// 🔐 Autenticación:      http://localhost:4000/api/auth/login
// 📦 Órdenes de compra:  http://localhost:4000/api/orders
app.use('/api', appRouter);

// 🔌 Configuración del puerto fijo 4000 para el servidor
const PORT = 4000;

server.listen(PORT, () => {
  console.log(`🍕 Servidor de NapoEats corriendo en el puerto ${PORT}`);
});