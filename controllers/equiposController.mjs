import { getEquipos } from "../services/equiposService.mjs";

export const getEquiposController = async (req, res) => {
  try {
    const equipos = await getEquipos();

    if (!equipos || equipos.length === 0) {
      res.status(404).json({ error: "No se encontraron equipos" });
      return;
    }

    res.status(200).json(equipos);
  } catch (error) {
    console.error("Error al obtener equipos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
