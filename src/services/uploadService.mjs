import supabase from "../config/supabase.mjs";

export const saveFileUrlToSupabase = async (fileUrl, observaciones) => {
  const { data, error } = await supabase.from("informes").insert([
    {
      fileUrl: fileUrl,
      observaciones: observaciones,
    },
  ]);
  if (error) {
    console.error("Error al guardar la URL en Supabase:", error);
    throw error;
  }
  console.log("URL guardada en Supabase:", data);
  return data;
};
