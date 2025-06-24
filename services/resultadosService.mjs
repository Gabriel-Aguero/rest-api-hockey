import supabase from "../config/supabase.mjs";

export const getZonas = async () => {
  const { data, error } = await supabase.from("zonas").select("id, nombre");
  if (error) {
    console.error("Error al obtener zonas:", error);
    throw error;
  }
  return data;
};

export const getCategoriaPorZona = async (zonaId) => {
  const { data, error } = await supabase
    .from("categoria_por_zona")
    .select(
      `           
        categorias (id, nombre )        
      `
    )
    .eq("zona_id", zonaId);
  if (error) {
    console.error("Error al obtener tecnicos:", error);
    throw error;
  }

  return data;
};

// Obtener equipos por zona y categoría
export const getEquiposPorZona = async (torneoId, zonaId) => {
  const { data, error } = await supabase
    .from("equipos_por_zona")
    .select(
      `      
      perfiles (id, club, alias) 
    `
    )
    .eq("torneo_id", torneoId)
    .eq("zona_id", zonaId);

  if (error) {
    console.error("Error al obtener equipos:", error);
    throw error;
  }
  return data;
};

// Obtener torneos
export const getTorneos = async () => {
  const { data, error } = await supabase.from("torneo").select(`id, nombre`);

  if (error) {
    console.error("❌ Error al obtener torneos:", error);
    throw error;
  }
  // console.log("✅ Torneos obtenidos:", data);
  return data;
};

export const insertarResultado = async (resultado) => {
  try {
    const { data, error } = await supabase
      .from("partidos")
      .insert([
        {
          torneo_id: resultado.torneo_id,
          zona_id: resultado.zona_id,
          categoria_id: resultado.categoria_id,
          fecha: resultado.fecha,
          equipo_local: resultado.equipo_local,
          equipo_visitante: resultado.equipo_visitante,
          goles_local: resultado.goles_local,
          goles_visitante: resultado.goles_visitante,
          estado: resultado.estado,
        },
      ])
      .select("*");
    if (error) {
      console.error("❌ Error al insertar resultado:", error);
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error al insertar resultado:", error);
    return { success: false, error: error.message };
  }
};

export const getResultados = async (torneoId, zonaId, categoriaId) => {
  const { data, error } = await supabase
    .from("partidos")
    .select(
      `id,      
      torneo (nombre),
      zonas (nombre),
      categorias (id, nombre),
      fecha,
      equipo_local:perfiles!equipo_local (id, club, escudo, alias),
      equipo_visitante:perfiles!equipo_visitante (id, club, escudo, alias),
      goles_local,
      goles_visitante,
      estado
    `
    )
    .eq("torneo_id", torneoId)
    .eq("zona_id", zonaId)
    .eq("categoria_id", categoriaId)
    // .order("fecha", { ascending: false }) // Ordenar por fecha (más reciente primero)
    .limit(100); // Limitar el número de resultados (opcional)

  if (error) {
    console.error("❌ Error al obtener resultados:", error);
    throw error;
  }

  return data;
};

// export const getTablaPosiciones = async (torneoId, zonaId, categoriaId) => {
//   const { data, error } = await supabase
//     .from("tabla_posiciones")
//     .select(
//       `
//       torneo: torneo_id (nombre),
//       zona: zona_id (nombre),
//       categoria: categoria_id (id, nombre),
//       perfil: perfil_id (id, club, escudo, alias),
//       puntos,
//       partidos_jugados,
//       partidos_ganados,
//       partidos_empatados,
//       partidos_perdidos,
//       goles_favor,
//       goles_contra,
//       diferencia_goles
//     `
//     )
//     .eq("torneo_id", torneoId)
//     .eq("zona_id", zonaId)
//     .eq("categoria_id", categoriaId)
//     .order("puntos", { ascending: false })
//     .order("diferencia_goles", { ascending: false })
//     .limit(100); // Limitar el número de resultados (opcional)

//   if (error) {
//     console.error("❌ Error al obtener resultados:", error);
//     throw error;
//   }

//   return data;
// };

export const getTablaPosiciones = async (torneoId, zonaId, categoriaId) => {
  const { data, error } = await supabase
    .from("vista_tabla_posiciones_completa")
    .select("*")
    .eq("torneo_id", torneoId)
    .eq("zona_id", zonaId)
    .eq("categoria_id", categoriaId)
    .order("puntos", { ascending: false })
    .order("partidos_jugados", { ascending: false })
    .order("diferencia_goles", { ascending: false });

  if (error) {
    console.error("❌ Error al obtener resultados:", error);
    throw error;
  }

  return data.map((item) => ({
    torneo: { nombre: item.torneo_nombre },
    zona: { nombre: item.zona_nombre },
    categoria: { id: item.categoria_id, nombre: item.categoria_nombre },
    perfil: {
      id: item.perfil_id,
      club: item.club,
      escudo: item.escudo,
      alias: item.alias,
    },
    puntos: item.puntos,
    partidos_jugados: item.partidos_jugados,
    partidos_ganados: item.partidos_ganados,
    partidos_empatados: item.partidos_empatados,
    partidos_perdidos: item.partidos_perdidos,
    goles_favor: item.goles_favor,
    goles_contra: item.goles_contra,
    diferencia_goles: item.diferencia_goles,
  }));
};

export const getResultadoById = async (resultadoId) => {
  const { data, error } = await supabase
    .from("partidos")
    .select(
      `id,      
      torneo (id,nombre),
      zonas (id,nombre),
      categorias (id, nombre),
      fecha,
      equipo_local:perfiles!equipo_local (id, club, escudo, alias),
      equipo_visitante:perfiles!equipo_visitante (id, club, escudo, alias),
      goles_local,
      goles_visitante,
      estado
    `
    )
    .eq("id", resultadoId);

  if (error) {
    console.error("❌ Error al obtener resultados:", error);
    throw error;
  }

  return data;
};

export const updateResultado = async (resultado, resultadoId) => {
  try {
    const { data, error } = await supabase
      .from("partidos")
      .update({
        torneo_id: resultado.torneo_id,
        zona_id: resultado.zona_id,
        categoria_id: resultado.categoria_id,
        fecha: resultado.fecha,
        equipo_local: resultado.equipo_local,
        equipo_visitante: resultado.equipo_visitante,
        goles_local: resultado.goles_local,
        goles_visitante: resultado.goles_visitante,
        estado: resultado.estado,
      })
      .eq("id", resultadoId);
    if (error) {
      console.error("❌ Error al actualizar resultado:", error);
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error al actualizar resultado:", error);
    return { success: false, error: error.message };
  }
};

export const deleteResultado = async (id) => {
  try {
    const { data, error } = await supabase
      .from("partidos")
      .delete()
      .eq("id", id);
    if (error) {
      console.error("❌ Error al eliminar resultado:", error);
      throw error;
    }
    return { success: true, data };
  } catch (error) {
    console.error("❌ Error al eliminar resultado:", error);
    return { success: false, error: error.message };
  }
};
