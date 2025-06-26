import { getFixtures } from "../services/fixtureService.mjs";

export const getFixturesController = async (req, res) => {
  const torneoId = req.query.torneoId;
  const categoriaId = req.query.categoriaId;
  try {
    const fixtures = await getFixtures(torneoId, categoriaId);
    res.status(200).json(fixtures || []);
  } catch (error) {
    console.error("❌ Error al obtener el fixture:", error);
    res.status(500).json({ error: "Error al obtener el fixture" });
  }
};
