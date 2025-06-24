import {
  getPerfil,
  getPerfilById,
  getEstadoClub,
  upateEstadoClub,
  updatePerfil,
} from "../services/perfilService.mjs";
export const getPerfilController = async (req, res) => {
  try {
    const perfiles = await getPerfil();

    if (!perfiles) {
      return res.status(404).json({ error: "No se encontraron perfiles" });
    }

    res.status(200).json(perfiles || []);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updatePerfilController = async (req, res) => {
  const { id, estado } = req.body;

  try {
    const response = await updatePerfil(
      {
        estado: estado,
      },
      id
    );

    if (!response.success) {
      return res.status(500).json({ error: response.error });
    }

    res.status(201).json({
      message: "Datos del perfil actualizados correctamente",
      data: response,
    });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
export const getPerfilByIdController = async (req, res) => {
  const perfil_id = req.query.perfil_id;
  try {
    const perfil = await getPerfilById(perfil_id);

    if (!perfil) {
      return res.status(404).json({ error: "No se encontró el perfil" });
    }

    res.status(200).json(perfil || []);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const getEstadoClubController = async (req, res) => {
  try {
    const estadosClub = await getEstadoClub();

    if (!estadosClub) {
      return res
        .status(404)
        .json({ error: "No se encontraron datos en la tabla estados" });
    }

    res.status(200).json(estadosClub || []);
  } catch (error) {
    console.error("Error al obtener estado del club:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateEstadoClubController = async (req, res) => {
  // const estadoId = req.query.estadoId;
  const { id, estado } = req.body;
  try {
    const result = await upateEstadoClub(
      {
        estado,
      },
      id
    );

    if (!result.success) {
      return res.status(500).json({ error: result.error });
    }

    res.status(200).json(result.data || []);
  } catch (error) {
    console.error("Error al actualizar estado del club:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
