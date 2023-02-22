import http from 'node:http';
import express from 'express';
import { Server as ServerIO } from 'socket.io';
import cors from 'cors';

import { socketController } from '../sockets/controller.js';

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = http.createServer(this.app);
    this.io = new ServerIO(this.server);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio publico
    this.app.use(express.static('./public'));
  }

  routes() {
    // this.app.use(this.paths.auth, authRoutes);
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('App ejecutandose en el puerto ' + this.port);
    });
  }
}
