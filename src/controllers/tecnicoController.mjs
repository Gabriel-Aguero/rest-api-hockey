import {
  insertTecnico,
  getTecnicos,
  editarTecnico,
  getTecnicoById,
  getTecnicosByCategory,
} from "../services/tecnicoService.mjs";

export const insertTecnicoController = async (req, res) => {
  const { categoria_id, club, dt, ayudante } = req.body;

  const response = await insertTecnico({
    categoria_id,
    club,
    dt,
    ayudante,
  });

  if (!response.success) {
    return res.status(500).json({ error: response.error });
  }

  res
    .status(201)
    .json({ message: "Tecnico registrado correctamente", data: response });
};

export const getTecnicosController = async (req, res) => {
  try {
    const tecnicos = await getTecnicos();

    if (!tecnicos || tecnicos.length === 0) {
      res.status(404).json({ error: "No se encontraron tecnicos" });
      return;
    }

    res.status(200).json(tecnicos || []);
  } catch (error) {
    console.error("Error al obtener tecnicos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTecnicoByIdController = async (req, res) => {
  const tecnicoId = req.query.tecnicoId;

  try {
    const tecnico = await getTecnicoById(tecnicoId);
    if (!tecnico) {
      res.status(404).json({ error: "No se encontraron tecnicos" });
      return;
    }
    res.status(200).json(tecnico || []);
  } catch (error) {
    console.error("Error al obtener tecnicos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTecnicosByCategoryController = async (req, res) => {
  const categoria_id = req.query.categoria_id;
  const club = req.query.club;

  console.log("Categoria_id controller:", categoria_id);
  console.log("Club controller:", club);

  try {
    const tecnico = await getTecnicosByCategory(categoria_id, club.trim());

    if (!tecnico) {
      return res.status(200).json({ tecnicoRegistrado: false, tecnico: null });
    }

    res.status(200).json({ tecnicoRegistrado: true, tecnico });
  } catch (error) {
    console.error("Error al obtener tecnicos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const editarTecnicoController = async (req, res) => {
  // console.log("Datos recibidos en el controller:", req.body);
  const { id, categoria_id, club, dt, ayudante } = req.body;

  const response = await editarTecnico(
    { categoria_id, club, dt, ayudante },
    id
  );

  if (!response.success) {
    return res.status(500).json({ error: response.error });
  }

  res.status(201).json({
    message: "Datos del técnico actualizados correctamente",
    data: response,
  });
};
