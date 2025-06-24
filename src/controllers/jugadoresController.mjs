import {
  insertJugadores,
  getJugadores,
  getJugadoresByCategory,
  getJugadorById,
  deleteJugador,
  editarJugador,
  getJugadoresAll,
} from "../services/jugadoresService.mjs";

// Inserta un jugador
export const insertJugadoresController = async (req, res) => {
  console.log("Datos recibidos en el controller:", req.body);
  try {
    const { perfil_id, categoria_id, nombre, apellido, dni, fecha_nac } =
      req.body;

    const response = await insertJugadores({
      perfil_id: perfil_id,
      categoria_id: categoria_id,
      nombre,
      apellido,
      dni,
      fecha_nac: fecha_nac,
    });

    if (!response.success) {
      return res.status(500).json({ error: response.error });
    }
    res
      .status(201)
      .json({ message: "Jugador fichado correctamente", data: response });
  } catch (error) {
    console.error("Error al fichar el jugador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtiene todos los jugadores fichados en el torneo
export const getJugadoresAllController = async (req, res) => {
  try {
    const jugadores = await getJugadoresAll();

    res.status(200).json(jugadores || []);
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    res.status(500).json({ error: "Error interno del servidor controller" });
  }
};

// Obtiene todos los jugadores de un club
export const getJugadoresController = async (req, res) => {
  const perfil_id = req.query.perfil_id;
  try {
    const jugadores = await getJugadores(perfil_id);

    res.status(200).json(jugadores || []);
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    res.status(500).json({ error: "Error interno del servidor controller" });
  }
};

// Obtiene un jugador por su id
export const getJugadorByIdController = async (req, res) => {
  const idJugador = req.query.jugadorId;
  try {
    const jugador = await getJugadorById(idJugador);

    if (!jugador || jugador.length === 0) {
      res.status(404).json({ error: "No se encontraron jugadores" });
      return;
    }
    res.status(200).json(jugador);
  } catch (error) {
    console.error("Error al obtener jugador:", error.message);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Lista de jugadores por categoria
export const getJugadoresByCategoryController = async (req, res) => {
  const perfil_id = req.query.perfil_id;
  const categoria_id = req.query.categoria_id;
  try {
    const jugadoresByCategory = await getJugadoresByCategory(
      perfil_id,
      categoria_id
    );

    res.status(200).json(jugadoresByCategory || []);
  } catch (error) {
    console.error("Error al obtener jugadores por categoria:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Elimina un jugador
export const deleteJugadorController = async (req, res) => {
  const jugadorId = req.query.jugadorId;
  try {
    const response = await deleteJugador(jugadorId);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al eliminar el jugador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Edita un jugador
export const editarJugadorController = async (req, res) => {
  const { id, perfil_id, categoria_id, nombre, apellido, dni, fecha_nac } =
    req.body;

  const response = await editarJugador(
    {
      perfil_id: perfil_id,
      categoria_id: categoria_id,
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      fecha_nac: fecha_nac,
    },
    id
  );

  if (!response.success) {
    return res.status(500).json({ error: response.error });
  }

  res.status(201).json({
    message: "Datos del jugador actualizados correctamente",
    data: response,
  });
};
