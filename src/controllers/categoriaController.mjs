import {
  getCategoriasService,
  getCategoriaById,
} from "../services/categoriaService.mjs";

export const getCategoriaByIdController = async (req, res) => {
  console.log("Datos en getCategoriaByIdController:", req.query);
  const categoriaId = req.query.categoriaId;
  try {
    const categoria = await getCategoriaById(categoriaId);

    if (!categoria || categoria.length === 0) {
      res.status(404).json({ error: "No se encontraron categorias" });
      return;
    }
    res.status(200).json(categoria);
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getCategoriasController = async (req, res) => {
  try {
    const categorias = await getCategoriasService();

    if (!categorias || categorias.length === 0) {
      res.status(404).json({ error: "No se encontraron categorias" });
      return;
    }

    res.status(200).json(categorias);
  } catch (error) {
    console.error("Error al obtener categorias:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
