import express from 'express';


import { addProject, getProjects, addTarea } from '../controllers/project.controller.js';

 const projectsRoutes = express.Router();

 projectsRoutes.get('/',getProjects);
 projectsRoutes.post('/',addProject);
 projectsRoutes.post('/:idProject/tareas', addTarea);




export { projectsRoutes };