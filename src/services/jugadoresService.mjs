import supabase from "../config/supabase.mjs";

// Inserta un jugador
export const insertJugadores = async (jugadores) => {
  console.log("Datos en fichajeService:", jugadores);
  const { perfil_id, categoria_id, nombre, apellido, dni, fecha_nac } =
    jugadores;
  try {
    const { data, error } = await supabase
      .from("jugadores")
      .insert([
        {
          perfil_id: perfil_id, // Relacionamos el jugador con la tabla perfil
          categoria_id: jugadores.categoria_id,
          nombre: jugadores.nombre,
          apellido: jugadores.apellido,
          dni: jugadores.dni,
          fecha_nac: jugadores.fecha_nac,
        },
      ])
      .select("*");
    if (error) {
      console.error("Error al fichar el jugador:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error al fichar el jugador:", error.message);
    throw new Error("No se pudo guardar el jugador");
  }
};

// Obtiene todos los jugadores fichados en el torneo
export const getJugadoresAll = async () => {
  const { data, error } = await supabase.from("jugadores").select(`*`);

  if (error) {
    console.error("❌ Error al obtener jugadores:", error);
    throw error;
  }
  // console.log("✅ Jugadores obtenidos:", data);
  return data;
};

// Lista de jugadores por club
export const getJugadores = async (perfil_id) => {
  const { data, error } = await supabase
    .from("jugadores")
    .select(
      `
      *, 
      perfiles ( club ),
      categorias ( nombre )
    `
    )
    .eq("perfil_id", perfil_id);

  if (error) {
    console.error("❌ Error al obtener jugadores:", error);
    throw error;
  }
  // console.log("✅ Jugadores obtenidos:", data);
  return data;
};

// Obtiene un jugador por su id
export const getJugadorById = async (jugadorId) => {
  const { data, error } = await supabase
    .from("jugadores")
    .select(
      `
      *, 
      perfiles ( club )        
    `
    )
    .eq("id", jugadorId)
    .single();

  if (error) {
    console.error("Error al obtener jugadores:", error);
    throw error;
  }
  return data;
};

// Lista de jugadores por categoria
export const getJugadoresByCategory = async (perfil_id, categoria_id) => {
  const { data, error } = await supabase
    .from("jugadores")
    .select(
      `
      *, 
      perfiles ( club ),
      categorias ( nombre )
    `
    )
    .eq("perfil_id", perfil_id)
    .eq("categoria_id", categoria_id);

  if (error) {
    console.error("Error al obtener jugadores:", error);
    throw error;
  }
  return data;
};

// Elimina un jugador
export const deleteJugador = async (jugadorId) => {
  const { data, error } = await supabase
    .from("jugadores")
    .delete()
    .eq("id", jugadorId);

  if (error) {
    console.error("Error al eliminar el jugador:", error);
    throw error;
  }
  return data;
};

// Edita un jugador
export const editarJugador = async (jugador, jugadorId) => {
  try {
    const { data, error } = await supabase
      .from("jugadores")
      .update({
        perfil_id: jugador.perfil_id,
        categoria_id: jugador.categoria_id,
        nombre: jugador.nombre,
        apellido: jugador.apellido,
        dni: jugador.dni,
        fecha_nac: jugador.fecha_nac,
      })
      .eq("id", jugadorId)
      .single();

    if (error) {
      console.error(
        "Error al actualizar los datos del jugador:",
        error.message
      );
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (error) {
    console.error("Error inesperado al actualizar el jugador:", error);
    return { success: false, error: error.message };
  }
};
