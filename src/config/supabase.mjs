import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

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

export default supabase;
