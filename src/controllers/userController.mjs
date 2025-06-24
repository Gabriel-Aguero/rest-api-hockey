import {
  createUser,
  recoveryPasswordService,
  updateUserService,
  verifyUserService,
  insertPerfil,
} from "../services/userService.js";

export const createUserController = async (req, res) => {
  const { email, password } = req.body;

  const response = await createUser({
    email,
    password,
  });

  if (!response.success) {
    return res.status(500).json({ error: response.error });
  }

  res.status(201).json({
    message: "Usuario creado correctamente",
    data: response.data,
  });
  console.log("Datos del usuario cread vista controller:", response.data);
};

export const resetPasswordController = async (req, res) => {
  // console.log("Datos recibidos en el controller:", req.body);
  const { email } = req.body;

  try {
    const { message, data } = await recoveryPasswordService(email);
    res.status(200).json({ message, data });
  } catch (error) {
    console.error("Error al enviar el email:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const updateUserController = async (req, res) => {
  console.log("Datos recibidos en el controller", req.body);
  const { email, password } = req.body;

  try {
    const { message, data } = await updateUserService(email, password);
    res.status(200).json({ message, data });
  } catch (error) {
    console.error("Error en la actualización de usuario:", error);
    res.status(500).json({ message: "Error en la actualización de usuario" });
  }
};

export const verifyUserController = async (req, res) => {
  console.log("Datos recibidos en el controller:", req.body);
  const { email } = req.body;

  try {
    const userExists = await verifyUserService(email);
    if (userExists) {
      return res
        .status(200)
        .json({ message: "El usuario existe", data: userExists });
    } else {
      return res
        .status(404)
        .json({ message: "El usuario no existe", data: userExists });
    }
  } catch (error) {
    console.error("Error al verificar el usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const insertPerfilController = async (req, res) => {
  // console.log("Datos del perfil en controller:", req.body);
  const { user_id, club, rol } = req.body;

  const response = await insertPerfil({
    user_id,
    club,
    rol,
  });

  if (!response.success) {
    return res.status(500).json({ error: response.error });
  }

  res.status(201).json({
    message: "Perfil creado correctamente",
    data: response.data,
  });
};
