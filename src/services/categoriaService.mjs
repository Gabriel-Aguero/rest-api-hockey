import supabase from "../config/supabase.mjs";

export const getCategoriasService = async () => {
  const { data, error } = await supabase.from("categorias").select("*");
  if (error) {
    console.error("Error al obtener categorias:", error);
    throw error;
  }
  return data;
};

export const getCategoriaById = async (categoriaId) => {
  const { data, error } = await supabase
    .from("categorias")
    .select("*")
    .eq("id", categoriaId)
    .single();

  if (error) {
    console.error("Error al obtener categorias:", error);
    throw error;
  }
  return data;
};
