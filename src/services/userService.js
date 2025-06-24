import supabase from "../config/supabase.mjs";

export const createUser = async (user) => {
  const { data, error } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }
  // console.log("Usuario creado:", data);
  return { success: true, data };
};

export const getUserById = async () => {
  let userId = "";
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error al obtener usuario:", error);
    throw error;
  }

  if (data) {
    userId = data.id;
  }

  // console.log("Usuario obtenido:", data);
  return data;
};

export const recoveryPasswordService = async (email) => {
  console.log("Datos recibidos en el servicio:", email);

  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error("Error al enviar el email:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error inesperado:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUserService = async (email, password) => {
  // console.log("Datos recibidos en el servicio:", email, password);

  try {
    const { data, error } = await supabase.auth.updateUser({
      email,
      password,
    });

    if (error) {
      console.error("Error al actualizar usuario:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error inesperado:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const verifyUserService = async (email) => {
  console.log("Datos recibidos en el servicio:", email);

  try {
    const {
      data: { users },
      error,
    } = await supabase.auth.admin.listUsers();

    console.log("Datos de la consulta:", users);

    if (error) {
      console.error("Error al verificar el usuario:", error);
      return { success: false, error: error.message };
    }

    const userExists = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    return !!userExists; // retorna true si el usuario existe, false en caso contrario
  } catch (error) {
    console.error("Error inesperado:", error);
    return { success: false, error: err.message };
  }
};

// Crear un perfil para el usuario
export const insertPerfil = async (perfil) => {
  // console.log("Datos en perfilService:", perfil);
  const { data, error } = await supabase
    .from("perfiles")
    .insert([
      {
        user_id: perfil.user_id,
        club: perfil.club,
        rol: perfil.rol,
      },
    ])
    .select("*");
  if (error) {
    console.error("Error al guardar el perfil:", error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data };
};
