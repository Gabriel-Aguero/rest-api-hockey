import supabase from "../config/supabase.mjs";

export const getInformesArbitrales = async () => {
  const { data, error } = await supabase.from("informes").select("*");
  if (error) {
    console.error("Error al obtener informes arbitrales:", error);
    throw error;
  }
  return data;
};
