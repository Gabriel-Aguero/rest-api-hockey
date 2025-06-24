import {
  insertClubes,
  getClubes,
  editarClubes,
} from "../services/clubesService.mjs";

export const insertClubesController = async (req, res) => {
  const {
    perfil_id,
    nombre,
    direccion,
    telefono,
    responsable,
    ayudanteresponsable,
  } = req.body;

  const response = await insertClubes({
    perfil_id,
    nombre,
    direccion,
    telefono,
    responsable,
    ayudanteresponsable,
  });

  if (!response.success) {
    return res.status(500).json({ error: response.error });
  }

  res
    .status(201)
    .json({ message: "Club registrado correctamente", data: response });
};

export const getClubesController = async (req, res) => {
  const perfil_id = req.query.perfil_id;
  try {
    const clubes = await getClubes(perfil_id);

    if (!clubes) {
      res.status(404).json({ error: "No se encontraron clubes" });
      return;
    }

    res.status(200).json(clubes || []);
  } catch (error) {
    console.error("Error al obtener clubes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const editarClubesController = async (req, res) => {
  const { nombre, direccion, telefono, responsable, ayudanteresponsable } =
    req.body;
  const club_id = req.query.club_id;

  const response = await editarClubes(
    { nombre, direccion, telefono, responsable, ayudanteresponsable },
    club_id
  );

  if (!response.success) {
    return res.status(500).json({ error: response.error });
  }

  res.status(201).json({
    message: "Datos del club actualizados correctamente",
    data: response,
  });
};
