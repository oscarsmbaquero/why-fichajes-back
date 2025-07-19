import express from 'express';


import { addProject, getProjects } from '../controllers/project.controller.js';

 const projectsRoutes = express.Router();

 projectsRoutes.get('/',getProjects);
 projectsRoutes.post('/',addProject);



export { projectsRoutes };