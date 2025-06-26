import {    
  insertarResultado,
  getResultados,
  getTablaPosiciones,
  getResultadoById,
  updateResultado,
  deleteResultado,
} from "../services/resultadosService.mjs";

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

export const getTablaPosicionesController = async (req, res) => {
  const torneoId = req.query.torneoId;
  const categoriaId = req.query.categoriaId;
  const partido = req.query.partido;
  
  try {
    const resultados = await getTablaPosiciones(torneoId, categoriaId, partido);
    res.status(200).json(resultados || []);
  } catch (error) {
    console.error("Error al obtener la tabla de posiciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};