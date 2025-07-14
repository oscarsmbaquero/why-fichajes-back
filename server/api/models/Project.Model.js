import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  id: { type: String, required: true },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
});

const Project = mongoose.model("Project", projectsSchema);

export { Project };
