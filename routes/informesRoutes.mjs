import express from "express";
import { Router } from "express";
import { getInformesArbitralesController } from "../controllers/informesController.mjs";

const router = Router();

router.get("/", getInformesArbitralesController);

export default router;
