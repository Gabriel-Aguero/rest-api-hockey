// import { getEquipos, getEquipoByZona } from "../services/equiposService.mjs";

// export const getEquiposController = async (req, res) => {
//   try {
//     const equipos = await getEquipos();

//     if (!equipos || equipos.length === 0) {
//       res.status(404).json({ error: "No se encontraron equipos" });
//       return;
//     }

//     res.status(200).json(equipos);
//   } catch (error) {
//     console.error("Error al obtener equipos:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };

// export const getEquipoByZonaController = async (req, res) => {
//   try {
//     const equipo = await getEquipoByZona(req.params.zona);
//     res.status(200).json(equipo);
//   } catch (error) {
//     console.error("Error al obtener equipo:", error);
//     res.status(500).json({ error: "Error interno del servidor" });
//   }
// };
