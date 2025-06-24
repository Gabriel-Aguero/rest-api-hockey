import supabase from "../config/supabase.mjs";

export const insertClubes = async (clubes) => {
  try {
    const { data, error } = await supabase
      .from("clubes")
      .insert([
        {
          perfil_id: clubes.perfil_id,
          nombre: clubes.nombre,
          direccion: clubes.direccion,
          telefono: clubes.telefono,
          responsable: clubes.responsable,
          ayudanteresponsable: clubes.ayudanteresponsable,
        },
      ])
      .select("*");
    if (error) {
      console.error("Error al guardar el club:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error inesperado al guardar el club:", error);
    return { success: false, error: err.message };
  }
};

export const getClubes = async (perfil_id) => {
  const { data, error } = await supabase
    .from("clubes")
    .select(
      `
      *, 
      perfiles ( club, escudo )      
    `
    )
    .eq("perfil_id", perfil_id);
  if (error) {
    console.error("Error al obtener clubes:", error);
    throw error;
  }
  // console.log("Clubes obtenidos:", data);
  return data;
};

export const editarClubes = async (clubes, club_id) => {
  try {
    const { data, error } = await supabase
      .from("clubes")
      .update({
        nombre: clubes.nombre,
        direccion: clubes.direccion,
        telefono: clubes.telefono,
        responsable: clubes.responsable,
        ayudanteresponsable: clubes.ayudanteresponsable,
      })
      .eq("id", club_id);
    if (error) {
      console.error("Error al actualizar los datos del club:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error inesperado al actualizar el club:", error);
    return { success: false, error: err.message };
  }
};
