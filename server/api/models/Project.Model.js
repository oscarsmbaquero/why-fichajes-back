import mongoose from "mongoose";
const Schema = mongoose.Schema;

const projectsSchema = new Schema({
  id: { type: String, required: false },
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  horas: { type: Number, default: 0 },
});

const Project = mongoose.model("Project", projectsSchema);

export { Project };
