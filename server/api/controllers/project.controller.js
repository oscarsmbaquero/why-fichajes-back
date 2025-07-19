
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



export { addProject, getProjects };