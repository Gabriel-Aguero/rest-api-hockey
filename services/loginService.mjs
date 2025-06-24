import supabase from "../config/supabase.mjs";

export const login = async (email, password) => {
  // Paso 1: Autenticación
  const { data: session, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    console.error("Error de autenticación:", authError);
    return { success: false, error: authError.message };
  }

  // console.log(session);
  const userID = session.user.id;

  // Paso 2: Obtener el rol del perfil
  const { data: perfil, error: perfilError } = await supabase
    .from("perfiles")
    .select("id, user_id, club, rol, escudo, url_aptos, estado")
    .eq("user_id", userID)
    .single();

  if (perfilError) {
    console.error("Perfil no encontrado:", perfilError);
    return { success: false, error: perfilError.message };
  }

  return {
    token: session.session.access_token,
    refresh_token: session.session.refresh_token,
    user: {
      id: session.user.id,
      email: session.user.email,
      club: perfil.club,
      rol: perfil.rol,
      perfil_id: perfil.id,
      escudo: perfil.escudo,
      aptos_fisicos: perfil.url_aptos,
      estado: perfil.estado,
    },
  };
};
