import mongoose from "mongoose";
const Schema = mongoose.Schema;

const fichajeSchema = new Schema(
  {
  idUsuario: { type: Number, required: false },
  dia: { type: String, required: false },
  entrada: {
    hora: { type: String, required: false },
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  salida: {
    hora: { type: String, required: false },
    lat: { type: Number, required: false },
    lng: { type: Number, required: false },
  },
  // project: { type: String, required: false },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
   tarea: { type: String, required: false },
  // tarea: { type: mongoose.Schema.Types.ObjectId, ref: 'Tarea', required: false }
},
{
    timestamps: true,
  }
);

const Fichajes = mongoose.model("Fichajes", fichajeSchema);

export { Fichajes };