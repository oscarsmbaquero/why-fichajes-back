import express from 'express';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { isAuth } from '../../authentication/jwt.js';
import { upload, uploadToCloudinary } from '../../middlewares/file.middleware.js';

import { loginUser, logoutUser, getUsers } from '../controllers/user.controller.js';

 const userRoutes = express.Router();

 userRoutes.get('/',getUsers);
 userRoutes.post('/login/',loginUser);
 userRoutes.post('/logout/',logoutUser);
 


export { userRoutes };