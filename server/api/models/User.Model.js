import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  id: String,
  mail: String,
  password: String,
  idUsuario: Number,
  departamento: String,
  user: String,
  rol: String
  //prueba commit 
});

const User = mongoose.model("User", userSchema);

export { User };
