import supabase from "../config/supabase.mjs";
export const getPerfil = async () => {
  const { data, error } = await supabase.from("perfiles").select("*");

  if (error) {
    console.error("Error al obtener perfil:", error);
    throw error;
  }
  return data;
};

export const updatePerfil = async (perfil, perfilId) => {
  try {
    const { data, error } = await supabase
      .from("perfiles")
      .update({
        estado: perfil.estado,
      })
      .eq("id", perfilId);

    if (error) {
      console.error("❌ Error al actualizar perfil:", error);
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error al actualizar perfil:", error);
    return { success: false, error: error.message };
  }
};

export const getPerfilById = async (perfil_id) => {
  const { data, error } = await supabase
    .from("perfiles")
    .select("*")
    .eq("id", perfil_id)
    .single();

  if (error) {
    console.error("Error al obtener perfil:", error);
    throw error;
  }
  return data;
};

export const getEstadoClub = async () => {
  const { data, error } = await supabase.from("estado_club").select(`
    id,
    estado,
    perfil_id:perfiles!perfil_id (id, rol, club, escudo)
  `);

  if (error) {
    console.error("Error al obtener estado del club:", error);
    throw error;
  }
  return data;
};

export const upateEstadoClub = async (estado, estadoId) => {
  try {
    const { data, error } = await supabase
      .from("estado_club")
      .update({
        estado,
      })
      .eq("id", estadoId)
      .single();

    if (error) {
      console.error("❌ Error al actualizar estado del club:", error);
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error al actualizar estado del club:", error);
    return { success: false, error: error.message };
  }
};
