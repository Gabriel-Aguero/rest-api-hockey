import supabase from "../config/supabase.mjs";

export const getFixtures = async (torneoId, categoriaId) => {
  const { data, error } = await supabase
    .from("fixtures")
    .select(
      `id,      
      torneo (nombre),
      categorias (nombre),
      fecha,          
      equipo_local:perfiles!equipo_local (id, club, escudo, alias),
      equipo_visitante:perfiles!equipo_visitante (id, club, escudo, alias)
    `
    )
    .eq("torneo_id", torneoId)
    .eq("categoria_id", categoriaId);

  if (error) {
    console.error("❌ Error al obtener el fixture:", error);
    throw error;
  }

  return data;
};
