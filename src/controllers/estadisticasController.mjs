import {
  getClubesInscriptos,
  getJugadoresTotales,
  getTecnicosTotales,
  getEquiposMasJugadores,
  getCategoriasMasJugadores,
  getJugadoresPorClubCategoria,
} from "../services/estadisticasService.mjs";

export const getClubesInscriptosController = async (req, res) => {
  try {
    const clubes = await getClubesInscriptos();

    if (!clubes) {
      return res
        .status(404)
        .json({ error: "No se encontraron clubes inscriptos" });
    }

    res.status(200).json(clubes || []);
  } catch (error) {
    console.error("Error al obtener clubes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getJugadoresTotalesController = async (req, res) => {
  try {
    const jugadores = await getJugadoresTotales();

    if (!jugadores) {
      return res
        .status(404)
        .json({ error: "No se encontraron jugadores registrados" });
    }

    res.status(200).json(jugadores || []);
  } catch (error) {
    console.error("Error al obtener jugadores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTecnicosTotalesController = async (req, res) => {
  try {
    const tecnicos = await getTecnicosTotales();

    if (!tecnicos) {
      return res
        .status(404)
        .json({ error: "No se encontraron tecnicos registrados" });
    }

    res.status(200).json(tecnicos || []);
  } catch (error) {
    console.error("Error al obtener tecnicos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getEquiposMasJugadoresController = async (req, res) => {
  try {
    const equipos = await getEquiposMasJugadores();

    if (!equipos) {
      return res
        .status(404)
        .json({ error: "No se encontraron equipos con mas jugadores" });
    }

    res.status(200).json(equipos || []);
  } catch (error) {
    console.error("Error al obtener equipos con mas jugadores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getCategoriasMasJugadoresController = async (req, res) => {
  try {
    const categorias = await getCategoriasMasJugadores();

    if (!categorias) {
      return res
        .status(404)
        .json({ error: "No se encontraron equipos con mas jugadores" });
    }

    res.status(200).json(categorias || []);
  } catch (error) {
    console.error("Error al obtener equipos con mas jugadores:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getJugadoresPorClubCategoriaController = async (req, res) => {
  try {
    const jugadores = await getJugadoresPorClubCategoria();

    if (!jugadores) {
      return res.status(404).json({ error: "No se encontraron jugadores" });
    }

    res.status(200).json(jugadores || []);
  } catch (error) {
    console.error("Error al obtener jugadores por club y categoria:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
