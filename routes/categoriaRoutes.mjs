import express from "express";
import { Router } from "express";
import {
  getCategoriasController,
  getCategoriaByIdController,
} from "../controllers/categoriaController.mjs";

const router = Router();

router.get("/", getCategoriasController);
router.get("/categoriaById", getCategoriaByIdController);

export default router;
