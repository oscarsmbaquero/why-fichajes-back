import express from 'express';


import { getProjects } from '../controllers/project.controller.js';

 const projectsRoutes = express.Router();

 projectsRoutes.get('/',getProjects);
 


export { projectsRoutes };