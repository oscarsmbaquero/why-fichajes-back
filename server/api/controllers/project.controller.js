
import { Project } from "../models/Project.Model.js";
//import { User } from "../models/User.Model";





const getProjects = async (req, res) => {
  try {
      const projects = await Project.find();
      return res.status(200).json(projects);
  } catch (error) {
      return next(error)        
  }
};



export {  getProjects };