import express from "express";
import { Router } from "express";
import { getTorneosController } from "../controllers/torneoController.mjs";

const router = Router();

router.get("/", getTorneosController);

export default router;
