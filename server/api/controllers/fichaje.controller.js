import { Fichajes } from "../models/Fichaje.Model.js";
import { Project } from "../models/Project.Model.js";
//import { User } from "../models/User.Model";

const createFichaje = async (req, res) => {
  try {
    const { idUsuario, dia, entrada, project } = req.body;

    const newFichaje = new Fichajes({
      idUsuario,
      dia,
      entrada,
      project,
    });

    await newFichaje.save();
    res.status(201).json(newFichaje);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addSalidaFichaje = async (req, res) => {
  try {
    const { idUsuario, dia, salida, project } = req.body;

   const fichajeExistente = await Fichajes.findOne({
  idUsuario,
  dia,
  project,
  $or: [
    { salida: null },
    { salida: { $exists: false } }
  ]
}).sort({ "entrada.hora": -1 });

    if (fichajeExistente) {
      console.log(fichajeExistente);
      
      fichajeExistente.salida = salida;
      await fichajeExistente.save();
      return res.status(200).json(fichajeExistente);
    } else {
      return res.status(404).json({ message: 'No se encontró un fichaje abierto para cerrar.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getFichajesByUser = async (req, res) => {
  try {
    const { idUsuario } = req.params;

    const fichajes = await Fichajes.find({ idUsuario }).populate(
      "project",
      "nombre"
    ); 

    res.status(200).json(fichajes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  
};

const getFichajesByUserAndDate = async (req, res) => {
  try {
    const { idUsuario, date } = req.params;
    let fichajes = await Fichajes.find({ idUsuario: idUsuario, dia: date }).populate(
      "project",
      "nombre"
    );
    res.status(200).json(fichajes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createFichaje,
  getFichajesByUser,
  getFichajesByUserAndDate,
  addSalidaFichaje,
};
