import express from "express";
import { Router } from "express";
import {
  createUserController,
  resetPasswordController,
  updateUserController,
  verifyUserController,
  insertPerfilController,
} from "../controllers/userController.mjs";

const router = Router();

router.post("/create", createUserController);
router.post("/resetPassword", resetPasswordController);
router.post("/updateUser", updateUserController);
router.post("/verificarUser", verifyUserController);
router.post("/insertarPerfil", insertPerfilController);

export default router;
