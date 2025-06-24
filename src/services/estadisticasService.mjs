import supabase from "../config/supabase.mjs";
export const getClubesInscriptos = async () => {
  const { data, error } = await supabase
    .from("clubes_inscriptos")
    .select(`count`);

  if (error) {
    console.error("Error al obtener clubes:", error);
    throw error;
  }
  // console.log("Clubes obtenidos:", data);
  return data;
};

export const getJugadoresTotales = async () => {
  const { data, error } = await supabase.from("total_jugadores").select(`*`);

  if (error) {
    console.error("Error al obtener jugadores:", error);
    throw error;
  }
  // console.log("Jugadores obtenidos:", data);
  return data;
};

export const getTecnicosTotales = async () => {
  const { data, error } = await supabase.from("total_tecnicos").select(`*`);

  if (error) {
    console.error("Error al obtener tecnicos:", error);
    throw error;
  }
  // console.log("Tecnicos obtenidos:", data);
  return data;
};

export const getEquiposMasJugadores = async () => {
  const { data, error } = await supabase
    .from("equipos_con_mas_jugadores")
    .select(`*`);

  if (error) {
    console.error("Error al obtener equipos mas jugadores:", error);
    throw error;
  }
  // console.log("Equipos obtenidos:", data);
  return data;
};

export const getCategoriasMasJugadores = async () => {
  const { data, error } = await supabase
    .from("categorias_con_mas_jugadores")
    .select(`*`);

  if (error) {
    console.error("Error al obtener equipos mas categorias:", error);
    throw error;
  }
  // console.log("Equipos obtenidos:", data);
  return data;
};

export const getJugadoresPorClubCategoria = async () => {
  const { error, data } = await supabase
    .from("jugadores_por_club_y_categoria_totales")
    .select(`*`);

  if (error) {
    console.error("Error al obtener jugadores:", error);
    throw error;
  }
  // console.log(s"Jugadores obtenidos:", data);
  return data;
};
