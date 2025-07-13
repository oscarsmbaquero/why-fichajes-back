import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectsSchema = new mongoose.Schema({
  id: String,
  nombre: String,
  descripcion: String,
  //prueba commit 
});

const Project = mongoose.model("Project", projectsSchema);

export { Project };
