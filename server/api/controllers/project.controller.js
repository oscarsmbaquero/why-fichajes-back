
import { Project } from "../models/Project.Model.js";
//import { User } from "../models/User.Model";


const addProject = async (req, res) => {
  try {
      const newProject = new Project(req.body);
      await newProject.save();
      return res.status(201).json(newProject);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
      const projects = await Project.find();
      return res.status(200).json(projects);
  } catch (error) {
      return next(error)        
  }
};

const addTarea = async (req, res) => {
  const { idProject } = req.params;
  const tarea = req.body; 

  try {
    const project = await Project.findById(idProject);
    
    if (!project) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    project.tareas.push(tarea);
    await project.save();

    return res.status(200).json({ message: 'Tarea añadida correctamente', project });
  } catch (error) {
    console.error('Error al añadir la tarea:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};



export { addProject, getProjects, addTarea };