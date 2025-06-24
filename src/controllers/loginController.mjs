import { login } from "../services/loginService.mjs";

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginUser = await login(email, password);
    res.status(200).json(loginUser);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
