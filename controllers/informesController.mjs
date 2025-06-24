import { getInformesArbitrales } from "../services/informesService.mjs";

export const getInformesArbitralesController = async (req, res) => {
  try {
    const informes = await getInformesArbitrales();

    if (!informes || informes.length === 0) {
      res.status(404).json({ error: "No se encontraron informes" });
      return;
    }

    res.status(200).json(informes);
  } catch (error) {
    console.error("Error al obtener informes arbitrales:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
