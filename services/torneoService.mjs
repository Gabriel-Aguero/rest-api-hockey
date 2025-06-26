import supabase from "../config/supabase.mjs";

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
