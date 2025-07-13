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
},
{
    timestamps: true,
  }
);

const Fichajes = mongoose.model("Fichajes", fichajeSchema);

export { Fichajes };