import { Fichajes } from "../models/Fichaje.Model.js";
import { Project } from "../models/Project.Model.js";
import mongoose from 'mongoose';
//import { User } from "../models/User.Model";

const createFichaje = async (req, res) => {
  try {
    const { idUsuario, dia, entrada, project, tarea } = req.body;

    const newFichaje = new Fichajes({
      idUsuario,
      dia,
      entrada,
      project,
      tarea,
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
      // "project._id": new mongoose.Types.ObjectId(project),
      $or: [{ salida: null }, { salida: { $exists: false } }],
    }).sort({ "entrada.hora": -1 });
     
    if (fichajeExistente) {
      fichajeExistente.salida = salida;
      await sumarHorasEnProyecto(fichajeExistente);
      await fichajeExistente.save();
      return res.status(200).json(fichajeExistente);
    } else {
      return res
        .status(404)
        .json({ message: "No se encontró un fichaje abierto para cerrar." });
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
    let fichajes = await Fichajes.find({
      idUsuario: idUsuario,
      dia: date,
    }).populate("project", "nombre");
    res.status(200).json(fichajes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const sumarHorasEnProyectoOld = async (fichaje) => {
//   try {
//     const { entrada, salida, project } = fichaje;

//     if (!entrada?.hora || !salida?.hora) {
//       throw new Error('Fichaje incompleto (sin hora de entrada o salida)');
//     }

//     // Parsear 'HH:mm:ss' a minutos
//     const [h1, m1, s1] = entrada.hora.split(':').map(Number);
//     const [h2, m2, s2] = salida.hora.split(':').map(Number);

//     const minutosEntrada = h1 * 60 + m1 + s1 / 60;
//     const minutosSalida = h2 * 60 + m2 + s2 / 60;

//     const minutosInvertidos = Math.max(0, minutosSalida - minutosEntrada);

//     // Convertir minutos a horas decimales
//     const horasInvertidas = minutosInvertidos / 60;

//     // Buscar proyecto
//     const proyecto = await Project.findById(project);
//     console.log(proyecto, 'proyectoEncontrado');

//     if (!proyecto) {
//       throw new Error('Proyecto no encontrado');
//     }

//     // Convertir horas actuales a número (por si están guardadas como string)
//     const horasActuales = parseFloat(proyecto.horas) || 0;

//     // Sumar horas invertidas
//     proyecto.horas = (horasActuales + horasInvertidas).toFixed(2); // con 2 decimales

//     console.log(proyecto);
    
//     await proyecto.save();

//     console.log(`Se sumaron ${horasInvertidas.toFixed(2)} horas al proyecto ${proyecto.nombre}. Total: ${proyecto.horas} horas.`);
//   } catch (error) {
//     console.error('Error al sumar horas en proyecto:', error);
//   }
// };

const sumarHorasEnProyecto = async (fichaje) => {
  try {
    const { entrada, salida, project, tarea } = fichaje;

    if (!entrada?.hora || !salida?.hora) {
      throw new Error('Fichaje incompleto (sin hora de entrada o salida)');
    }

    // Parsear horas
    const [h1, m1, s1] = entrada.hora.split(':').map(Number);
    const [h2, m2, s2] = salida.hora.split(':').map(Number);

    const minutosEntrada = h1 * 60 + m1 + s1 / 60;
    const minutosSalida = h2 * 60 + m2 + s2 / 60;
    const minutosInvertidos = Math.max(0, minutosSalida - minutosEntrada);
    const horasInvertidas = minutosInvertidos / 60;

    // Buscar proyecto
    const proyecto = await Project.findById(project);
    
    if (!proyecto) {
      throw new Error('Proyecto no encontrado');
    }

    // Sumar al proyecto
    const horasActuales = parseFloat(proyecto.horas) || 0;
    proyecto.horas = parseFloat((horasActuales + horasInvertidas).toFixed(2));
    
    
    // Sumar a la tarea si hay
    if (tarea && Array.isArray(proyecto.tareas)) {
      // const tareaEncontrada = proyecto.tareas.find(t => t._id.toString() === tarea.toString());
      const tareaEncontrada = proyecto.tareas.find(t => t._id.equals(tarea));
      if (tareaEncontrada) {
      console.log('tareaEncontrada', tareaEncontrada);
      
        const horasTarea = parseFloat(tareaEncontrada.horas) || 0;
        tareaEncontrada.horas = parseFloat((horasTarea + horasInvertidas).toFixed(2));
      }
    }

    await proyecto.save();
  } catch (error) {
    console.error(' Error al sumar horas en proyecto o tarea:', error);
  }
};




export {
  createFichaje,
  getFichajesByUser,
  getFichajesByUserAndDate,
  addSalidaFichaje,
};
