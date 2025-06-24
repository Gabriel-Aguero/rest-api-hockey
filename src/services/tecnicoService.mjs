import supabase from "../config/supabase.mjs";

export const insertTecnico = async (tecnico) => {
  try {
    const { data, error } = await supabase
      .from("tecnicos")
      .insert([
        {
          categoria_id: tecnico.categoria_id,
          club: tecnico.club,
          dt: tecnico.dt,
          ayudante: tecnico.ayudante,
        },
      ])
      .select("*");
    if (error) {
      console.error("Error al guardar el tecnico:", error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error inesperado al guardar el tecnico:", error);
    return { success: false, error: err.message };
  }
};

export const getTecnicos = async () => {
  const { data, error } = await supabase.from("tecnicos").select(
    `
      *,             
      categorias ( nombre )
    `
  );
  if (error) {
    console.error("Error al obtener tecnicos:", error);
    throw error;
  }
  // console.log("Tecnicos obtenidos:", data);
  return data;
};

export const getTecnicoById = async (tecnicoId) => {
  const { data, error } = await supabase
    .from("tecnicos")
    .select(`*`)
    .eq("id", tecnicoId);

  if (error) {
    console.error("Error al obtener tecnicos:", error);
    throw error;
  }
  return data;
};

export const getTecnicosByCategory = async (categoria_id, club) => {
  console.log("Categoria_id:", categoria_id);
  console.log("Club:", club);
  const { data, error } = await supabase
    .from("tecnicos")
    .select(
      `
      *,       
      categorias ( nombre )
    `
    )
    .eq("categoria_id", categoria_id)
    .eq("club", club)
    .limit(1);

  if (error && error.code !== "PGRST116") {
    console.error("Error al obtener tecnicos:", error);
    throw error;
  }
  return data;
};

export const deleteTecnico = async (tecnicoId) => {
  const { data, error } = await supabase
    .from("tecnicos")
    .delete()
    .eq("id", tecnicoId);

  if (error) {
    console.error("Error al eliminar el tecnico:", error);
    throw error;
  }
  return data;
};

export const editarTecnico = async (tecnico, tecnicoId) => {
  // console.log("Datos en tecnicoService:", tecnico);
  try {
    const { data, error } = await supabase
      .from("tecnicos")
      .update({
        categoria_id: tecnico.categoria_id,
        club: tecnico.club,
        dt: tecnico.dt,
        ayudante: tecnico.ayudante,
      })
      .eq("id", tecnicoId)
      .single();

    if (error) {
      console.error(
        "Error al actualizar los datos del tecnico:",
        error.message
      );
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error inesperado al actualizar el tecnico:", error);
    return { success: false, error: err.message };
  }
};
