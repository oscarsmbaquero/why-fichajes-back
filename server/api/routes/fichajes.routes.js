import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { createFichaje, getFichajesByUser, getFichajesByUserAndDate, addSalidaFichaje  } from '../controllers/fichaje.controller.js';

 const fichajesRoutes = express.Router();

 fichajesRoutes.get('/:idUsuario', getFichajesByUser);
 fichajesRoutes.get('/:idUsuario/:date', getFichajesByUserAndDate);
 fichajesRoutes.post('/', createFichaje);
 fichajesRoutes.post('/salida', addSalidaFichaje);

export { fichajesRoutes };