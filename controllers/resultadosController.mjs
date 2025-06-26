import {
  getZonas,
  getCategoriaPorZona,
  getEquiposPorZona,
  insertarResultado,
  getResultados,
  getTablaPosiciones,
  getResultadoById,
  updateResultado,
  deleteResultado,
} from "../services/resultadosService.mjs";

export const getZonasController = async (req, res) => {
  try {
    const zonas = await getZonas();
    res.status(200).json(zonas || []);
  } catch (error) {
    console.error("Error al obtener zonas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getCategoriaPorZonaController = async (req, res) => {
  const zonaId = req.query.zonaId;
  try {
    const categorias = await getCategoriaPorZona(zonaId);
    res.status(200).json(categorias || []);
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getEquiposPorZonaController = async (req, res) => {
  const torneoId = req.query.torneoId;
  const zonaId = req.query.zonaId;
  try {
    const equipos = await getEquiposPorZona(torneoId, zonaId);
    res.status(200).json(equipos || []);
  } catch (error) {
    console.error("Error al obtener equipos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const insertarResultadoController = async (req, res) => {
  const resultado = req.body;
  try {
    const resultados = await insertarResultado(resultado);
    res.status(200).json(resultados || []);
  } catch (error) {
    console.error("Error al obtener torneos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getResultadosController = async (req, res) => {
  const torneoId = req.query.torneoId;
  const zonaId = req.query.zonaId;
  const categoriaId = req.query.categoriaId;
  // const fecha = req.query.fecha;
  try {
    const resultados = await getResultados(torneoId, zonaId, categoriaId);
    res.status(200).json(resultados || []);
  } catch (error) {
    console.error("Error al obtener torneos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getTablaPosicionesController = async (req, res) => {
  const torneoId = req.query.torneoId;
  const zonaId = req.query.zonaId;
  const categoriaId = req.query.categoriaId;
  // const fecha = req.query.fecha;
  try {
    const resultados = await getTablaPosiciones(torneoId, zonaId, categoriaId);
    res.status(200).json(resultados || []);
  } catch (error) {
    console.error("Error al obtener torneos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getResultadoByIdController = async (req, res) => {
  const id = req.query.resultadoId;
  try {
    const resultado = await getResultadoById(id);
    res.status(200).json(resultado || []);
  } catch (error) {
    console.error("Error al obtener torneos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateResultadoController = async (req, res) => {
  const resultadoId = req.query.resultadoId;
  const resultado = req.body;
  try {
    const resultados = await updateResultado(resultado, resultadoId);
    res.status(200).json(resultados || []);
  } catch (error) {
    console.error("Error al obtener torneos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const deleteResultadoController = async (req, res) => {
  const resultadoId = req.query.resultadoId;
  try {
    const resultados = await deleteResultado(resultadoId);
    res.status(200).json(resultados || []);
  } catch (error) {
    console.error("Error al obtener torneos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
