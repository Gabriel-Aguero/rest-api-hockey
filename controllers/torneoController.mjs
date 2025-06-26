import { getTorneos } from "../services/torneoService.mjs";

export const getTorneosController = async (req, res) => {
  try {
    const torneos = await getTorneos();
    res.status(200).json(torneos || []);
  } catch (error) {
    console.error("Error al obtener torneos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
