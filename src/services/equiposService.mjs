// import supabase from "../config/supabase.mjs";

// export const getEquipos = async () => {
//   const { data, error } = await supabase.from("equipos").select("*");
//   if (error) {
//     console.error("Error al obtener equipos:", error);
//     throw error;
//   }

//   return data;
// };

// export const getEquipoByZona = async (zona) => {
//   const { data, error } = await supabase
//     .from("equipos")
//     .select("*")
//     .eq("zona", zona);
//   if (error) {
//     console.error("Error al obtener equipos:", error);
//     throw error;
//   }
//   console.log("Equipos obtenidos:", data);
//   return data;
// };
